import type { ContactFields } from "../contact";
import { apk, site, whatsappLink } from "../site";
import { button, c, escapeHtml, eyebrow, font, renderEmail } from "./layout";

export type EnquiryMeta = { reference: string; receivedAt: string };

/** Turns an Indian 10-digit number into a wa.me-compatible one. */
function waNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

/* ------------------------------------------------------------------ */
/* Team notification: delivered to CONTACT_TO_EMAIL                    */
/* ------------------------------------------------------------------ */

export function teamNotificationEmail(f: ContactFields, meta: EnquiryMeta) {
  const name = escapeHtml(f.name);
  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", `<a href="tel:${escapeHtml(f.phone.replace(/\s/g, ""))}" style="color:${c.forest};text-decoration:none;">${escapeHtml(f.phone)}</a>`],
    ["Email", `<a href="mailto:${escapeHtml(f.email)}" style="color:${c.forest};text-decoration:none;">${escapeHtml(f.email)}</a>`],
    ["Reference", meta.reference],
    ["Received", escapeHtml(meta.receivedAt)],
  ];

  const body = `
    <tr><td class="px" style="padding:36px 36px 8px;">
      <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${c.goldSoft};font-family:${font};font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${c.goldInk};">&#9679;&nbsp; New enquiry</span>
      <h1 style="margin:16px 0 8px;font-family:${font};font-size:30px;line-height:38px;font-weight:800;letter-spacing:-0.02em;color:${c.forest};">${name} wants to connect</h1>
      <p style="margin:0;font-family:${font};font-size:15px;line-height:24px;color:${c.muted};">A new message just came in through the website contact form.</p>
    </td></tr>

    <tr><td class="px" style="padding:24px 36px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.porcelain};border:1px solid ${c.line};border-radius:14px;">
        ${rows
          .map(
            ([k, v], i) => `
          <tr>
            <td width="110" style="padding:13px 18px;${i ? `border-top:1px solid ${c.line};` : ""}font-family:${font};font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${c.outline};">${k}</td>
            <td style="padding:13px 18px;${i ? `border-top:1px solid ${c.line};` : ""}font-family:${font};font-size:15px;line-height:22px;font-weight:600;color:${c.forest};word-break:break-word;">${v}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </td></tr>

    <tr><td class="px" style="padding:24px 36px 0;">
      ${eyebrow("Their message")}
      <div style="padding:18px 20px;background:${c.mintSoft};border-left:4px solid ${c.mint};border-radius:12px;font-family:${font};font-size:15px;line-height:25px;color:${c.ink};white-space:pre-wrap;word-break:break-word;">${escapeHtml(f.message)}</div>
    </td></tr>

    <tr><td class="px" style="padding:28px 36px 36px;">
      ${eyebrow("Respond", c.outline)}
      <table role="presentation" class="stack" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="padding:0 10px 0 0;">${button(`mailto:${f.email}?subject=${encodeURIComponent(`Re: Your enquiry (${meta.reference})`)}`, "Reply by email", "forest")}</td>
        <td style="padding:0 10px 0 0;">${button(`https://wa.me/${waNumber(f.phone)}`, "WhatsApp", "mint")}</td>
        <td style="padding:0;">${button(`tel:${f.phone.replace(/\s/g, "")}`, "Call now", "outline")}</td>
      </tr></table>
      <p style="margin:18px 0 0;font-family:${font};font-size:13px;line-height:20px;color:${c.outline};">Tip: replying to this email goes straight to ${name}. An automatic confirmation has already been sent to them.</p>
    </td></tr>`;

  return {
    subject: `New enquiry from ${f.name} · ${meta.reference}`,
    html: renderEmail({ preheader: `${f.name} (${f.phone}) sent a message via the website.`, body }),
    text: [
      `New website enquiry (${meta.reference})`,
      `Received: ${meta.receivedAt}`,
      "",
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Email: ${f.email}`,
      "",
      f.message,
    ].join("\n"),
  };
}

/* ------------------------------------------------------------------ */
/* Auto-reply: delivered to the visitor                                */
/* ------------------------------------------------------------------ */

/**
 * Deliberately does not echo the visitor's message back, so the form
 * can't be used to send arbitrary text to arbitrary inboxes.
 */
export function autoReplyEmail(f: ContactFields, meta: EnquiryMeta) {
  const firstName = escapeHtml(f.name.split(/\s+/)[0].slice(0, 30));

  const steps: [string, string, string][] = [
    ["1", "We review your query", "A member of our healthcare team reads your message carefully."],
    ["2", "We connect with you", "We'll reach out by phone or email as soon as possible."],
    ["3", "You get the right care", "We guide you to the services and support you need."],
  ];

  const body = `
    <tr><td class="px" style="padding:40px 36px 8px;">
      <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${c.mintSoft};font-family:${font};font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${c.mintStrong};">&#10003;&nbsp; Message received</span>
      <h1 style="margin:18px 0 10px;font-family:${font};font-size:32px;line-height:40px;font-weight:800;letter-spacing:-0.02em;color:${c.forest};">Thank you, ${firstName}!<br><span style="color:${c.mintStrong};">We'll connect with you soon.</span></h1>
      <p style="margin:0;font-family:${font};font-size:16px;line-height:26px;color:${c.muted};">We've received your message and our healthcare team is already on it. You don't need to do anything else — we'll be in touch shortly.</p>
    </td></tr>

    <tr><td class="px" style="padding:22px 36px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.goldSoft};border-radius:12px;">
        <tr><td style="padding:14px 18px;font-family:${font};font-size:13px;line-height:20px;color:${c.goldInk};">
          Your reference number: <strong style="font-size:15px;letter-spacing:0.04em;color:${c.forest};">${meta.reference}</strong>
        </td></tr>
      </table>
    </td></tr>

    <tr><td class="px" style="padding:30px 36px 0;">
      ${eyebrow("What happens next")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${steps
          .map(
            ([n, title, text]) => `
        <tr>
          <td width="48" valign="top" style="padding:0 0 18px;">
            <div style="width:36px;height:36px;border-radius:10px;background:${c.forest};color:${c.mint};font-family:${font};font-size:15px;line-height:36px;font-weight:800;text-align:center;">${n}</div>
          </td>
          <td valign="top" style="padding:0 0 18px;font-family:${font};">
            <div style="font-size:16px;line-height:22px;font-weight:700;color:${c.forest};">${title}</div>
            <div style="font-size:14px;line-height:21px;color:${c.muted};margin-top:2px;">${text}</div>
          </td>
        </tr>`,
          )
          .join("")}
      </table>
    </td></tr>

    <tr><td class="px" style="padding:6px 36px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.forest};background-image:radial-gradient(circle at 100% 0%,rgba(13,206,145,0.3) 0,rgba(13,206,145,0) 60%);border-radius:16px;">
        <tr><td style="padding:26px 26px 28px;">
          <p style="margin:0 0 6px;font-family:${font};font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${c.mint};">While you wait</p>
          <p style="margin:0 0 6px;font-family:${font};font-size:20px;line-height:28px;font-weight:700;color:#ffffff;">Your health, your plan &amp; your reports — in one app.</p>
          <p style="margin:0 0 18px;font-family:${font};font-size:14px;line-height:21px;color:${c.tealDim};">Get the RestoreHealth Android app (v${apk.version}) to track your health and book care in a tap.</p>
          ${button(apk.fileUrl, "Download the app &rarr;", "mint")}
        </td></tr>
      </table>
    </td></tr>

    <tr><td class="px" style="padding:28px 36px 36px;">
      <p style="margin:0;font-family:${font};font-size:14px;line-height:22px;color:${c.muted};">
        <strong style="color:${c.forest};">Need help urgently?</strong> Call us at
        <a href="tel:${site.contacts[0].tel}" style="color:${c.mintStrong};font-weight:700;text-decoration:none;">${site.contacts[0].phone}</a>
        or <a href="${whatsappLink(`Hi, my reference number is ${meta.reference}.`)}" style="color:${c.mintStrong};font-weight:700;text-decoration:none;">message us on WhatsApp</a>.
      </p>
      <p style="margin:22px 0 0;font-family:${font};font-size:14px;line-height:22px;color:${c.muted};">Warm regards,<br><strong style="color:${c.forest};">Team RestoreHealth</strong></p>
      <p style="margin:22px 0 0;font-family:${font};font-size:12px;line-height:18px;color:${c.outline};">You're receiving this because you contacted ${site.name} through our website. If this wasn't you, you can safely ignore this email.</p>
    </td></tr>`;

  return {
    subject: `We've received your message · ${site.name}`,
    html: renderEmail({
      preheader: `Thank you, ${f.name.split(/\s+/)[0].slice(0, 30)} — our team will connect with you soon. Ref ${meta.reference}`,
      body,
    }),
    text: [
      `Thank you, ${f.name.split(/\s+/)[0].slice(0, 30)}!`,
      "",
      "We've received your message and our healthcare team will connect with you soon.",
      `Your reference number: ${meta.reference}`,
      "",
      "What happens next:",
      "1. We review your query",
      "2. We connect with you by phone or email",
      "3. You get the right care and guidance",
      "",
      `Need help urgently? Call ${site.contacts[0].phone} or WhatsApp us: ${whatsappLink()}`,
      `Download the RestoreHealth app: ${apk.fileUrl}`,
      "",
      "Warm regards,",
      "Team RestoreHealth",
    ].join("\n"),
  };
}
