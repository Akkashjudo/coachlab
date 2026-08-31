/**
 * Single source of truth for brand, contact and batch information.
 * Nothing in this file may be duplicated inside components.
 */

export const siteConfig = {
  name: "CoachLab",
  fullName: "CoachLab Institute of Fitness Education & Science",
  legalName: "CoachLab Institute of Fitness Education & Science",
  tagline: "Institute of Fitness Education & Science",
  motto: "Educate. Empower. Elevate.",
  secondaryMotto: "Building competent coaches. Transforming lives.",
  positioning:
    "Professional fitness education for the next generation of coaches.",
  description:
    "Professional fitness education, personal trainer courses, nutrition coaching education and fitness workshops at CoachLab Institute of Fitness Education & Science in Chennai.",

  /* ---- contact ---- */
  phoneDisplay: "8778853235",
  phoneIntl: "+918778853235",
  phoneHref: "tel:+918778853235",
  email: "coachlab.institute@gmail.com",
  emailHref: "mailto:coachlab.institute@gmail.com",
  whatsapp: "https://wa.me/918778853235",

  /* ---- location ---- */
  location: {
    area: "Iyappanthangal",
    locality: "Porur",
    city: "Chennai",
    region: "Tamil Nadu",
    country: "IN",
    short: "Iyappanthangal, Porur, Chennai",
    lines: ["Iyappanthangal", "Porur", "Chennai"],
  },

  founder: {
    name: "Aditya V.",
    roles: ["Founder", "Head Lecturer", "Course Creator"],
    roleLine: "Founder · Head Lecturer · Course Creator",
    bio: "Aditya V. leads CoachLab's educational direction, course development and classroom instruction with a focus on making fitness education understandable, practical and applicable to real-world coaching.",
    image: "/images/founder/aditya-v.jpg",
  },

  cta: {
    primary: "Enquire About Courses",
    secondary: "Talk to CoachLab",
    nav: "Enquire Now",
  },
} as const;

/**
 * Set NEXT_PUBLIC_SITE_URL once the domain is live — canonical URLs,
 * sitemap entries and Open Graph tags all read from here.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/* ------------------------------------------------------------------ */
/*  Current batch — expect this to change every intake.                */
/* ------------------------------------------------------------------ */

export const currentBatch = {
  courseSlug: "certified-personal-trainer",
  course: "Certified Personal Trainer",
  startDate: "13 September",
  duration: "10 Weeks",
  schedule: "Sundays",
  theorySessions: 4,
  practicalSessions: 6,
  /** Flip to false between intakes to hide the batch panel site-wide. */
  isOpen: true,
} as const;

export const batchFacts = [
  { label: "Starts", value: currentBatch.startDate },
  { label: "Duration", value: currentBatch.duration },
  { label: "Schedule", value: currentBatch.schedule },
  {
    label: "Structure",
    value: `${currentBatch.theorySessions} Theory · ${currentBatch.practicalSessions} Practical`,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Workshops", href: "/workshops" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/*  Marquee strip                                                      */
/* ------------------------------------------------------------------ */

export const valueStrip = [
  "Exercise Science",
  "Personal Training",
  "Practical Coaching",
  "Biomechanics",
  "Nutrition",
  "Fitness Education",
  "Career Development",
  "Professional Coaching",
] as const;

/* ------------------------------------------------------------------ */
/*  The CoachLab coaching framework — the site's signature motif       */
/* ------------------------------------------------------------------ */

export const coachingFramework = [
  {
    index: "01",
    title: "Knowledge",
    note: "How the body is built and how it produces energy.",
  },
  {
    index: "02",
    title: "Movement",
    note: "How joints, levers and muscles create motion.",
  },
  {
    index: "03",
    title: "Assessment",
    note: "How to screen, test and read a client accurately.",
  },
  {
    index: "04",
    title: "Programming",
    note: "How to turn findings into a structured plan.",
  },
  {
    index: "05",
    title: "Coaching",
    note: "How to cue, correct and communicate on the floor.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Learning experience steps                                          */
/* ------------------------------------------------------------------ */

export const learningJourney = [
  { step: "Learn", copy: "Understand the science." },
  { step: "Practice", copy: "Develop coaching skills." },
  { step: "Apply", copy: "Use what you learn." },
  { step: "Coach", copy: "Build confidence through experience." },
  { step: "Evolve", copy: "Continue professional development." },
] as const;

/* ------------------------------------------------------------------ */
/*  Why CoachLab — five pillars                                        */
/* ------------------------------------------------------------------ */

export const pillars = [
  {
    index: "01",
    icon: "award",
    title: "Expert Faculty",
    copy: "Learn from experienced fitness professionals and coaches.",
  },
  {
    index: "02",
    icon: "dumbbell",
    title: "Practical Focus",
    copy: "Hands-on learning designed to build real-world coaching ability.",
  },
  {
    index: "03",
    icon: "compass",
    title: "Career Support",
    copy: "Guidance and mentorship as students develop their careers.",
  },
  {
    index: "04",
    icon: "book",
    title: "Industry-Relevant Education",
    copy: "Curriculum focused on the practical knowledge required in today's fitness industry.",
  },
  {
    index: "05",
    icon: "trending",
    title: "Lifelong Learning",
    copy: "Continue developing through advanced programs, workshops and professional education.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Who CoachLab is for                                                */
/* ------------------------------------------------------------------ */

export const audiences = [
  {
    index: "01",
    title: "Aspiring Personal Trainers",
    copy: "People who want to build professional foundations before entering the industry.",
  },
  {
    index: "02",
    title: "Fitness Enthusiasts",
    copy: "Individuals who want structured education beyond social-media fitness information.",
  },
  {
    index: "03",
    title: "Existing Coaches",
    copy: "Professionals looking to upgrade specific skills through advanced programs.",
  },
  {
    index: "04",
    title: "Career Switchers",
    copy: "People considering fitness coaching as a professional career path.",
  },
] as const;
