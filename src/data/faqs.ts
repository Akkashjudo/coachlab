import { currentBatch, siteConfig } from "./site";

export type Faq = { q: string; a: string };

/**
 * Where a detail has not been confirmed, the answer says so rather than
 * guessing. "Contact CoachLab for current details." is the deliberate
 * fallback — do not replace it with an assumption.
 */
export const faqs: Faq[] = [
  {
    q: "What is CoachLab?",
    a: `${siteConfig.fullName} is a fitness education institute in ${siteConfig.location.short}. It runs certification programs, exam preparation and professional workshops for people building a career in fitness coaching. It is an education institute, not a gym.`,
  },
  {
    q: "Which course should I start with?",
    a: "If you are new to the industry, the Certified Personal Trainer program is the foundation — it covers exercise science, assessment, programming and practical coaching. If you already hold a certification, the Advanced CPT, the Group Fitness Instructor program or a specialist workshop may suit you better. Talk to CoachLab and we can point you to the right pathway.",
  },
  {
    q: "Is the CPT suitable for beginners?",
    a: "Yes. The program is built from first principles and assumes no prior qualification. It begins with anatomy, physiology and biomechanics before moving into assessment, programming and floor coaching.",
  },
  {
    q: "How long is the CPT program?",
    a: `The current batch runs ${currentBatch.duration.toLowerCase()}, on ${currentBatch.schedule}, starting ${currentBatch.startDate}. Batch structure can change between intakes — contact CoachLab for the details of the intake you are considering.`,
  },
  {
    q: "Are practical classes included?",
    a: `Yes. The CPT is deliberately split between classroom theory and floor practice — the current batch runs ${currentBatch.theorySessions} theory sessions and ${currentBatch.practicalSessions} practical sessions. The practical sessions cover warm-up and mobility, core training, and the push, pull, hinge, squat and lunge patterns.`,
  },
  {
    q: "Where are the classes conducted?",
    a: `Classes are conducted in ${siteConfig.location.short}. Contact CoachLab for the exact venue and directions for your batch.`,
  },
  {
    q: "Do you provide online classes?",
    a: "Availability may vary by batch. Contact CoachLab for current details on the format of the intake you are interested in.",
  },
  {
    q: "How can I enrol?",
    a: `Send an enquiry through the contact form, message CoachLab on WhatsApp, or call ${siteConfig.phoneDisplay}. We will confirm the current batch details and take you through the enrolment steps.`,
  },
  {
    q: "How do I know when the next batch begins?",
    a: "Upcoming batch dates are shared directly. Message CoachLab on WhatsApp and we will let you know when the next intake opens.",
  },
  {
    q: "Are workshops available separately?",
    a: "Yes. CoachLab Professional Workshops run as standalone continuing-education sessions and do not require enrolment in a certification program. Schedules vary — contact CoachLab for upcoming workshop dates.",
  },
];
