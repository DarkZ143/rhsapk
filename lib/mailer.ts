import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { LOGO_CID } from "./email/layout";
import { logoPngBase64 } from "./email/logo-data";
import { site } from "./site";

let transporter: Transporter | null = null;

/** Returns null when SMTP is not configured (see .env.example). */
function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporter) {
    const port = Number(SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export function isMailerConfigured() {
  return getTransporter() !== null;
}

export const teamInbox = () => process.env.CONTACT_TO_EMAIL || site.supportEmail;

/** Sends a branded email; the logo is embedded inline so it shows without remote images. */
export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const t = getTransporter();
  if (!t) throw new Error("SMTP is not configured");
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
  await t.sendMail({
    from: `"${site.name}" <${from}>`,
    ...options,
    attachments: [
      {
        filename: "restorehealth-logo.png",
        content: Buffer.from(logoPngBase64, "base64"),
        contentType: "image/png",
        cid: LOGO_CID,
      },
    ],
  });
}
