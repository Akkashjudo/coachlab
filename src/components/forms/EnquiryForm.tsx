"use client";

import { useId, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/TechBackdrop";
import { courseOptions } from "@/data/courses";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  phone: string;
  email: string;
  course: string;
  background: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  phone: "",
  email: "",
  course: "",
  background: "",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (digits.length < 10)
    errors.phone = "Please enter a valid phone number.";

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
    errors.email = "Please check the email address.";

  if (!values.course) errors.course = "Please choose a program.";

  return errors;
}

/**
 * There is no backend yet, so the form composes a readable WhatsApp message
 * and hands it to the visitor to send. Nothing is transmitted until they do.
 */
export function EnquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (submitted) setErrors(validate({ ...values, [key]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(`${id}-${firstKey}`)?.focus();
      return;
    }

    window.open(
      whatsappUrl(buildEnquiryMessage(values)),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="panel relative overflow-hidden p-6 sm:p-8"
    >
      <CornerFrame size={16} />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <h2 className="display-wide font-display text-[1.15rem] leading-none font-extrabold text-bone uppercase">
            Send an enquiry
          </h2>
          <span className="micro text-[0.6rem] text-dim">Via WhatsApp</span>
        </div>

        <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
          Fill this in and we&apos;ll open WhatsApp with your details already
          written out. Nothing is sent until you press send there.
        </p>

        <div className="mt-8 grid gap-5 *:min-w-0 sm:grid-cols-2">
          <Field
            id={`${id}-name`}
            label="Name"
            required
            value={values.name}
            onChange={set("name")}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id={`${id}-phone`}
            label="Phone"
            required
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={set("phone")}
            error={errors.phone}
            autoComplete="tel"
          />
          <Field
            id={`${id}-email`}
            label="Email"
            type="email"
            inputMode="email"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
            autoComplete="email"
            className="sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <Label htmlFor={`${id}-course`} required>
              Course interested in
            </Label>
            <select
              id={`${id}-course`}
              value={values.course}
              onChange={(e) => set("course")(e.target.value)}
              aria-invalid={Boolean(errors.course)}
              aria-describedby={errors.course ? `${id}-course-error` : undefined}
              className={cn(
                inputClass,
                "appearance-none truncate bg-[right_1rem_center] bg-no-repeat pr-11",
              )}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9' fill='none'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23e3ad28' stroke-width='2'/%3E%3C/svg%3E\")",
                backgroundSize: "14px 9px",
              }}
            >
              <option value="">Select a program…</option>
              {courseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError id={`${id}-course-error`} message={errors.course} />
          </div>

          <Field
            id={`${id}-background`}
            label="Current background"
            hint="Optional — e.g. student, gym-goer, working trainer"
            value={values.background}
            onChange={set("background")}
            className="sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <Label htmlFor={`${id}-message`}>Message</Label>
            <textarea
              id={`${id}-message`}
              rows={4}
              value={values.message}
              onChange={(e) => set("message")(e.target.value)}
              placeholder="Anything you'd like us to know or ask about."
              className={cn(inputClass, "min-h-[7rem] resize-y py-3")}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            icon={<MessageCircle className="size-4" strokeWidth={2} />}
          >
            Send on WhatsApp
          </Button>

          <p aria-live="polite" className="text-[0.8rem] leading-relaxed text-dim">
            {sent
              ? "WhatsApp should have opened in a new tab — press send there to reach us."
              : "We reply on WhatsApp during working hours."}
          </p>
        </div>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

const inputClass =
  // `min-w-0` is load-bearing: a <select> contributes its widest <option> to
  // min-content even at width:100%, which widened the grid track past 320px.
  "mt-2.5 block w-full min-w-0 min-h-11 rounded-[3px] border border-hairline-soft bg-ink px-4 py-3 text-[0.925rem] text-bone " +
  "placeholder:text-dim transition-colors duration-300 " +
  "hover:border-hairline focus:border-gold focus:outline-none " +
  "aria-[invalid=true]:border-red-400/70";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="micro block text-[0.6rem] text-muted">
      {children}
      {required && (
        <span aria-hidden className="ml-1 text-gold">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.775rem] text-red-300">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  type = "text",
  className,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "value" | "onChange" | "type" | "className"
>) {
  const describedBy =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={inputClass}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[0.775rem] text-dim">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
