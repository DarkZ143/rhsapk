import { site, whatsappLink } from "../site";

/** Content-ID of the inline logo attachment (see lib/mailer.ts). */
export const LOGO_CID = "logo@restorehealth";

export const c = {
  forest: "#092d28",
  forestDeep: "#001713",
  mint: "#0dce91",
  mintStrong: "#006c4a",
  mintSoft: "#e3f8f0",
  gold: "#d4a300",
  goldInk: "#7a5e00",
  goldSoft: "#fbf4dc",
  porcelain: "#f7faf7",
  surface: "#f1f4f1",
  ink: "#181c1b",
  muted: "#414846",
  outline: "#717976",
  line: "#e0e3e0",
  tealDim: "#aacec6",
};

export const font =
  "'Plus Jakarta Sans','Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

/** Bulletproof table-based button. */
export function button(href: string, label: string, variant: "mint" | "forest" | "outline" = "mint") {
  const styles = {
    mint: `background:${c.mint};color:${c.forest};border:1.5px solid ${c.mint};`,
    forest: `background:${c.forest};color:#ffffff;border:1.5px solid ${c.forest};`,
    outline: `background:#ffffff;color:${c.forest};border:1.5px solid ${c.forest};`,
  }[variant];
  return `<a href="${escapeHtml(href)}" target="_blank" style="${styles}display:inline-block;padding:13px 22px;border-radius:8px;font-family:${font};font-size:14px;font-weight:700;line-height:18px;text-decoration:none;mso-padding-alt:0;">${label}</a>`;
}

export function eyebrow(text: string, color = c.mintStrong) {
  return `<p style="margin:0 0 10px;font-family:${font};font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${color};">${text}</p>`;
}

/** Wraps template content in the branded header + footer shell. */
export function renderEmail({ preheader, body }: { preheader: string; body: string }) {
  const contacts = site.contacts
    .map(
      (ct) => `
        <td valign="top" width="50%" style="padding:0 8px 0 0;font-family:${font};font-size:13px;line-height:20px;color:${c.tealDim};">
          <a href="mailto:${ct.email}" style="color:#ffffff;text-decoration:none;">${ct.email}</a><br>
          <a href="tel:${ct.tel}" style="color:${c.tealDim};text-decoration:none;">${ct.phone}</a>
        </td>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${site.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  @media (max-width:620px){
    .card{border-radius:0!important}
    .px{padding-left:22px!important;padding-right:22px!important}
    .stack td{display:block!important;width:100%!important;padding:0 0 12px!important}
    h1{font-size:26px!important;line-height:34px!important}
  }
  a{text-decoration:none}
</style>
</head>
<body style="margin:0;padding:0;background:${c.surface};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.surface};">
<tr><td align="center" style="padding:32px 12px;">

  <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 40px -8px rgba(9,45,40,0.16);">

    <!-- Header -->
    <tr><td class="px" style="background:${c.forest};background-image:radial-gradient(circle at 100% 0%,rgba(13,206,145,0.28) 0,rgba(13,206,145,0) 55%);padding:26px 36px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle" style="padding-right:12px;"><img src="cid:${LOGO_CID}" width="42" height="52" alt="RestoreHealth" style="display:block;border:0;height:52px;width:auto;"></td>
        <td valign="middle" style="font-family:${font};">
          <div style="font-size:20px;line-height:22px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;">Restore<span style="color:${c.mint};">Health</span></div>
          <div style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:0.24em;color:${c.tealDim};text-transform:uppercase;margin-top:3px;">Services</div>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="height:4px;line-height:4px;font-size:0;background:${c.mint};background-image:linear-gradient(90deg,${c.mint},${c.gold});">&nbsp;</td></tr>

    ${body}

    <!-- Footer -->
    <tr><td class="px" style="background:${c.forestDeep};padding:28px 36px 30px;">
      <p style="margin:0 0 14px;font-family:${font};font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;">Get in touch</p>
      <table role="presentation" class="stack" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${contacts}</tr></table>
      <p style="margin:18px 0 0;font-family:${font};font-size:13px;line-height:20px;">
        <a href="${whatsappLink()}" style="color:${c.mint};font-weight:700;text-decoration:none;">Chat on WhatsApp &rarr;</a>
        <span style="color:#2c4d47;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="${site.url}" style="color:${c.mint};font-weight:700;text-decoration:none;">${site.url.replace(/^https?:\/\//, "")}</a>
      </p>
      <p style="margin:20px 0 0;padding-top:18px;border-top:1px solid rgba(255,255,255,0.1);font-family:${font};font-size:12px;line-height:18px;color:#73968f;">
        Healthcare. Connected. Simplified.<br>&copy; ${site.name}
      </p>
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}
