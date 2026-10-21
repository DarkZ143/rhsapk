// Shared by the contact form (client) and the sendContactMessage action (server).

export type ContactFields = { name: string; phone: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; errors?: ContactErrors };

export const contactLimits = { name: 100, phone: 20, email: 200, message: 3000 } as const;

export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  const name = f.name.trim();
  const message = f.message.trim();
  if (name.length < 2 || name.length > contactLimits.name) e.name = "Please enter your full name.";
  if (!/^\+?[\d\s-]{10,16}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (f.email.length > contactLimits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Please enter a valid email address.";
  if (message.length < 10) e.message = "Please describe your inquiry (at least 10 characters).";
  else if (message.length > contactLimits.message)
    e.message = `Please keep your message under ${contactLimits.message} characters.`;
  return e;
}
