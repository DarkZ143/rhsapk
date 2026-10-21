"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { validateContact, type ContactFields, type ContactState } from "@/lib/contact";
import { autoReplyEmail, teamNotificationEmail } from "@/lib/email/templates";
import { isMailerConfigured, sendMail, teamInbox } from "@/lib/mailer";
import { site } from "@/lib/site";

// Best-effort in-memory limit per IP (resets on deploy / per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const unavailable = `We couldn't send your message right now. Please call ${site.contacts[0].phone} or message us on WhatsApp.`;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("company") ?? "") !== "") {
    return { status: "success", message: "Thank you! Your message has been sent." };
  }

  const fields: ContactFields = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors = validateContact(fields);
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent several messages recently. Please try again in a few minutes.",
    };
  }

  if (!isMailerConfigured()) {
    console.error("[contact] SMTP is not configured; set SMTP_* env vars.");
    return { status: "error", message: unavailable };
  }

  const meta = {
    reference: `RH-${randomBytes(3).toString("hex").toUpperCase()}`,
    receivedAt: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  try {
    await sendMail({ to: teamInbox(), replyTo: fields.email, ...teamNotificationEmail(fields, meta) });
  } catch (err) {
    console.error("[contact] Failed to send team email:", err);
    return { status: "error", message: unavailable };
  }

  // The enquiry is already delivered; a failed confirmation shouldn't fail the request.
  let confirmed = true;
  try {
    await sendMail({ to: fields.email, replyTo: teamInbox(), ...autoReplyEmail(fields, meta) });
  } catch (err) {
    confirmed = false;
    console.error("[contact] Failed to send auto-reply:", err);
  }

  return {
    status: "success",
    message: `Thank you! Your message has been sent (ref ${meta.reference}).${confirmed ? " We've emailed you a confirmation." : ""} Our healthcare team will connect with you soon.`,
  };
}
