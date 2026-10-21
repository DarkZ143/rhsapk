"use client";

import { useActionState, useState, type FormEvent } from "react";
import { sendContactMessage } from "@/app/contact/actions";
import {
  contactLimits,
  validateContact,
  type ContactErrors,
  type ContactFields,
  type ContactState,
} from "@/lib/contact";
import { whatsappLink } from "@/lib/site";
import { Icon } from "./icon";
import { buttonStyles } from "./ui";

const empty: ContactFields = { name: "", phone: "", email: "", message: "" };
const initialState: ContactState = { status: "idle" };

function composeBody(f: ContactFields) {
  return `Name: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email}\n\n${f.message}`;
}

const inputBase =
  "h-12 w-full rounded-lg border bg-white px-4 text-body-md text-forest placeholder:text-forest/45 outline-none transition-all focus:border-2 focus:border-mint focus:px-[15px] focus:shadow-focus disabled:opacity-60";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [fields, setFields] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [handled, setHandled] = useState(state);

  // React to each new server result once (clears the form, surfaces server-side errors).
  if (state !== handled) {
    setHandled(state);
    if (state.status === "success") setFields(empty);
    if (state.status === "error" && state.errors) setErrors(state.errors);
  }

  const update = (key: keyof ContactFields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const check = () => {
    const e = validateContact(fields);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`contact-${first}`)?.focus();
    return !first;
  };

  const onSubmit = (e: FormEvent) => {
    if (!check()) e.preventDefault();
  };

  const onWhatsApp = () => {
    if (!check()) return;
    window.open(whatsappLink(composeBody(fields)), "_blank", "noopener,noreferrer");
  };

  const errorText = (key: keyof ContactFields) =>
    errors[key] && (
      <p id={`contact-${key}-error`} className="text-label-md font-medium text-danger">
        {errors[key]}
      </p>
    );

  const field = (key: keyof ContactFields, label: string, props: Record<string, string>) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={`contact-${key}`} className="text-label-lg text-forest">
        {label}
      </label>
      <input
        id={`contact-${key}`}
        name={key}
        value={fields[key]}
        onChange={update(key)}
        maxLength={contactLimits[key]}
        disabled={pending}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
        className={`${inputBase} ${errors[key] ? "border-danger" : "border-forest/16"}`}
        {...props}
      />
      {errorText(key)}
    </div>
  );

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot for bots — hidden from people and assistive tech */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] size-px opacity-0"
      />

      {field("name", "Full Name", { placeholder: "Enter your full name", autoComplete: "name" })}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("phone", "Phone Number", { placeholder: "Enter your phone number", type: "tel", autoComplete: "tel", inputMode: "tel" })}
        {field("email", "Email Address", { placeholder: "example@gmail.com", type: "email", autoComplete: "email" })}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-label-lg text-forest">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={update("message")}
          maxLength={contactLimits.message}
          disabled={pending}
          placeholder="Describe your healthcare inquiry..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputBase} h-auto resize-y py-3 focus:py-2.75 ${errors.message ? "border-danger" : "border-forest/16"}`}
        />
        {errorText("message")}
      </div>

      <div className="mt-1 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={pending} className={`${buttonStyles.vital} flex-1`}>
          {pending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-forest/30 border-t-forest" />
              Sending…
            </>
          ) : (
            <>
              <Icon name="mail" className="size-4.5" />
              Submit Message
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          disabled={pending}
          className={`${buttonStyles.outline} flex-1`}
        >
          <Icon name="message" className="size-4.5" />
          Send via WhatsApp
        </button>
      </div>

      <div role="status" aria-live="polite" className="text-body-sm">
        {state.status === "success" ? (
          <p className="flex items-start gap-2 rounded-lg bg-mint/15 p-3 text-forest">
            <Icon name="check" className="mt-0.5 size-4 shrink-0" />
            {state.message}
          </p>
        ) : state.status === "error" ? (
          <p className="flex items-start gap-2 rounded-lg bg-danger/8 p-3 text-danger">
            <Icon name="close" className="mt-0.5 size-4 shrink-0" />
            {state.message}
          </p>
        ) : (
          <p className="text-muted">
            Your message goes straight to our healthcare team by email. Prefer chat? Use WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}
