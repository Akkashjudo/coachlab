import { siteConfig } from "@/data/site";

const WA_BASE = "https://wa.me/918778853235";

export type EnquiryPayload = {
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
  background?: string;
  message?: string;
};

/**
 * The enquiry form has no backend yet, so it composes a readable WhatsApp
 * message instead. Only fields the visitor actually filled in are included.
 */
export function buildEnquiryMessage(data: EnquiryPayload): string {
  const lines: string[] = [
    "Hello CoachLab,",
    "",
    "I'm interested in learning more about your courses.",
    "",
  ];

  const field = (label: string, value?: string) => {
    const v = value?.trim();
    if (v) lines.push(`${label}: ${v}`);
  };

  field("Name", data.name);
  field("Course", data.course);
  field("Phone", data.phone);
  field("Email", data.email);
  field("Current background", data.background);

  if (data.message?.trim()) {
    lines.push("", `Message: ${data.message.trim()}`);
  }

  lines.push("", "Please share the upcoming batch details.");
  return lines.join("\n");
}

/** WhatsApp deep link carrying a pre-written message. */
export function whatsappUrl(text?: string): string {
  if (!text) return WA_BASE;
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

/** Short, contextual openers used by the CTA buttons around the site. */
export function whatsappEnquiry(context?: string): string {
  const body = context
    ? `Hello ${siteConfig.name}, I'd like to know more about the ${context}. Please share the upcoming batch details.`
    : `Hello ${siteConfig.name}, I'd like to know more about your courses. Please share the upcoming batch details.`;
  return whatsappUrl(body);
}
