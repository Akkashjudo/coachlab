/**
 * Every course on the site is rendered from this file.
 * Adding a course here automatically adds it to /courses, the homepage grid,
 * the sitemap, the enquiry-form dropdown and its own /courses/[slug] page.
 *
 * Rule: never state a fee, a certifying authority, a batch size, an
 * eligibility bar or a placement outcome here. If a detail is not confirmed,
 * leave the field out — the UI falls back to "Contact CoachLab for
 * current details."
 */

export type CourseCategory =
  | "personal-training"
  | "group-fitness"
  | "nutrition"
  | "exam-prep"
  | "professional-development";

export type CurriculumModule = {
  index: string;
  title: string;
  /** Sub-topics covered inside the module. */
  points?: string[];
  note?: string;
};

export type Course = {
  slug: string;
  index: string;
  title: string;
  /** Abbreviation shown on cards and badges — omit when there isn't one. */
  shortName?: string;
  /** Short label for the card's "Explore …" affordance. Falls back to
   *  shortName, then to a generic word — a full course title wraps badly. */
  ctaLabel?: string;
  category: CourseCategory;
  categoryLabel: string;
  icon: "certificate" | "trending" | "users" | "apple" | "clipboard" | "presentation";
  /** One-line positioning used on cards. */
  summary: string;
  /** Two-to-three sentence overview used on the course page. */
  overview: string[];
  /** Learning areas — shown as tags on the card. */
  topics: string[];
  forWhom: string[];
  outcomes: string[];
  curriculum: {
    theory?: CurriculumModule[];
    practical?: CurriculumModule[];
    modules?: CurriculumModule[];
  };
  /**
   * Optional narrative arc for the homepage's sticky scroll section. Each
   * stage must restate curriculum that already exists above — it is a framing
   * of the syllabus, never additional claims about it.
   */
  story?: { index: string; title: string; copy: string; tags?: string[] }[];
  /**
   * Search metadata. Written per course rather than generated from a
   * template: every course page previously ended on the same sentence
   * ("Taught at CoachLab Institute of Fitness Education & Science in
   * Iyappanthangal, Porur, Chennai."), and Google discards near-duplicate
   * descriptions across a set of pages — which is why it was composing its
   * own snippet from the page body instead.
   *
   * Titles are absolute: the root layout appends "| CoachLab" via a template,
   * and these already carry the brand.
   */
  seo: { title: string; description: string };
  /** Confirmed schedule facts only. Anything unknown is simply absent. */
  format?: { label: string; value: string }[];
  faqs?: { q: string; a: string }[];
  featured?: boolean;
};

export const categoryFilters = [
  { id: "all", label: "All Programs" },
  { id: "personal-training", label: "Personal Training" },
  { id: "group-fitness", label: "Group Fitness" },
  { id: "nutrition", label: "Nutrition" },
  { id: "exam-prep", label: "Exam Preparation" },
  { id: "professional-development", label: "Professional Development" },
] as const;

export const courses: Course[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "certified-personal-trainer",
    seo: {
      title:
        "Certified Personal Trainer Course in Chennai (CPT) | CoachLab",
      description:
        "Certified Personal Trainer course in Chennai. Anatomy, physiology, biomechanics and movement assessment, then coaching on the training floor.",
    },
    index: "01",
    title: "Certified Personal Trainer",
    shortName: "CPT",
    category: "personal-training",
    categoryLabel: "Personal Training",
    icon: "certificate",
    featured: true,
    summary:
      "Build a strong foundation in exercise science, assessment, programming and practical personal training.",
    overview: [
      "The Certified Personal Trainer program is CoachLab's foundation course. It is built for people entering the fitness industry who want to understand the body before they attempt to train it.",
      "The program is split deliberately between classroom theory and floor practice. You study anatomy, physiology, biomechanics and assessment in the theory sessions, then spend the practical sessions coaching the movement patterns those principles govern.",
      "By the end you should be able to screen a client, read their movement, design a sensible program and coach it with clear, confident instruction.",
    ],
    topics: [
      "Exercise Science",
      "Anatomy & Physiology",
      "Movement Assessments",
      "Program Design",
      "Practical Coaching",
    ],
    forWhom: [
      "Aspiring personal trainers preparing to enter the industry",
      "Fitness enthusiasts who want structured, science-based education",
      "Career switchers exploring coaching as a profession",
      "Gym floor staff who want a formal foundation in training principles",
    ],
    outcomes: [
      "Explain how the muscular, skeletal, cardiovascular and respiratory systems respond to training",
      "Identify joint actions, planes of motion and kinetic chains in any exercise",
      "Run a health screening and a postural and fitness assessment",
      "Design a structured program around the fundamental movement patterns",
      "Coach push, pull, hinge, squat and lunge patterns with clear cueing",
      "Select appropriate warm-up, mobility and self-myofascial release work",
    ],
    curriculum: {
      theory: [
        {
          index: "01",
          title: "Human Anatomy & Physiology",
          points: [
            "Bones",
            "Muscles",
            "Joints",
            "Cardiovascular System",
            "Respiratory System",
            "Energy Systems",
          ],
        },
        {
          index: "02",
          title: "Biomechanics",
          points: [
            "Joint Actions",
            "Planes of Motion",
            "Muscle Contraction",
            "Kinetic Chains",
            "Newton's Laws of Motion",
          ],
        },
        {
          index: "03",
          title: "Fitness & Posture Assessments",
          points: ["Health Screening", "Postural Assessment", "Fitness Testing"],
        },
      ],
      practical: [
        { index: "01", title: "Warm Up, Mobility & Self Myofascial Release" },
        {
          index: "02",
          title: "Corrective Exercise & Joint Mobility",
          note: "Taught within the scope of a fitness professional. CoachLab does not provide medical rehabilitation.",
        },
        { index: "03", title: "Core Training" },
        { index: "04", title: "Push Pattern Module" },
        { index: "05", title: "Pull Pattern Module" },
        { index: "06", title: "Hinge Pattern Module" },
        { index: "07", title: "Squat Pattern Module" },
        { index: "08", title: "Lunge Pattern Module" },
        { index: "09", title: "Arms & Accessories Module" },
      ],
    },
    story: [
      {
        index: "01",
        title: "Foundation",
        copy: "The program opens where coaching actually begins — understanding the body you are about to train, before you write a single program for it.",
      },
      {
        index: "02",
        title: "Theory",
        copy: "Anatomy and physiology in the classroom: the structures that move, and the systems that fuel them.",
        tags: ["Bones", "Muscles", "Joints", "Cardiovascular", "Respiratory", "Energy Systems"],
      },
      {
        index: "03",
        title: "Movement",
        copy: "Biomechanics — how levers, joints and contractions turn into the movement you are watching on the floor.",
        tags: ["Joint Actions", "Planes of Motion", "Kinetic Chains", "Newton's Laws"],
      },
      {
        index: "04",
        title: "Assessment",
        copy: "How to screen a client, read their posture and test their fitness, so a program answers what you found rather than what you assumed.",
        tags: ["Health Screening", "Postural Assessment", "Fitness Testing"],
      },
      {
        index: "05",
        title: "Programming",
        copy: "Turning assessment findings into a structured plan built around the fundamental movement patterns.",
        tags: ["Program Design", "Movement Patterns"],
      },
      {
        index: "06",
        title: "Practical Coaching",
        copy: "Six practical sessions on the floor: warm-up and mobility, core, and coaching the push, pull, hinge, squat and lunge patterns with clear cueing.",
        tags: ["Push", "Pull", "Hinge", "Squat", "Lunge", "Core"],
      },
    ],
    faqs: [
      {
        q: "Is the CPT suitable for complete beginners?",
        a: "Yes. The program starts from first principles — bones, muscles, joints and energy systems — before moving into assessment and programming. No prior qualification is assumed.",
      },
      {
        q: "How is the program split between theory and practical?",
        a: "The current batch runs 4 theory sessions and 6 practical sessions across 10 weeks. Theory covers anatomy, physiology, biomechanics and assessment; the practical sessions cover coaching the movement patterns.",
      },
      {
        q: "Do I need to be training already to join?",
        a: "It helps to have some familiarity with a gym, but it is not a requirement. Contact CoachLab to talk through your background before you enrol.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: "advanced-certified-personal-trainer",
    seo: {
      title:
        "Advanced Personal Trainer Course in Chennai | CoachLab",
      description:
        "Advanced coaching course in Chennai for working trainers — programming, biomechanics, strength and conditioning and corrective exercise.",
    },
    index: "02",
    title: "Advanced Certified Personal Trainer",
    shortName: "Advanced CPT",
    category: "personal-training",
    categoryLabel: "Personal Training",
    icon: "trending",
    summary:
      "Develop advanced coaching capabilities through programming, biomechanics, corrective exercise and performance-based training.",
    overview: [
      "The Advanced Certified Personal Trainer program is for coaches who already have a working foundation and want to deepen it.",
      "It moves past general programming into biomechanics, strength and conditioning, corrective exercise and training considerations for special populations — supported throughout by case studies rather than templates.",
      "The emphasis is on coaching judgement: why a program is built the way it is, and what to change when a client does not respond as expected.",
    ],
    topics: [
      "Advanced Programming",
      "Biomechanics",
      "Strength & Conditioning",
      "Corrective Exercise",
      "Special Populations",
      "Advanced Assessments",
      "Case Studies",
      "Coaching",
    ],
    forWhom: [
      "Working personal trainers who want to upgrade specific skills",
      "CPT graduates ready for a deeper level of programming",
      "Coaches who want to work with more varied client profiles",
    ],
    outcomes: [
      "Build progressive programs around a client's assessment findings",
      "Apply biomechanical reasoning to exercise selection and regression",
      "Structure strength and conditioning blocks with clear intent",
      "Adapt training for special populations within a coach's scope of practice",
      "Work through case studies and defend your programming decisions",
    ],
    curriculum: {
      modules: [
        { index: "01", title: "Advanced Programming" },
        { index: "02", title: "Biomechanics" },
        { index: "03", title: "Strength & Conditioning" },
        {
          index: "04",
          title: "Corrective Exercise",
          note: "Taught within the scope of a fitness professional.",
        },
        { index: "05", title: "Special Populations" },
        { index: "06", title: "Advanced Assessments" },
        { index: "07", title: "Case Studies" },
        { index: "08", title: "Coaching" },
      ],
    },
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: "group-fitness-instructor",
    seo: {
      title:
        "Group Fitness Instructor Course in Chennai (GFI) | CoachLab",
      description:
        "Group Fitness Instructor course in Chennai. Programme a class, cue a mixed-ability room, and run functional, HIIT and circuit formats safely.",
    },
    index: "03",
    title: "Certified Group Fitness Instructor",
    shortName: "GFI",
    category: "group-fitness",
    categoryLabel: "Group Fitness",
    icon: "users",
    summary:
      "Learn how to safely design, lead and manage effective group fitness sessions.",
    overview: [
      "Coaching a room is a different skill to coaching one person. The Certified Group Fitness Instructor program is built around that difference.",
      "It covers class design, functional and interval formats, and the coaching, cueing and floor management that keep a mixed-ability group safe and engaged.",
    ],
    topics: [
      "Group Exercise Instruction",
      "Functional Training",
      "HIIT & Circuit Training",
      "Class Programming",
      "Coaching & Cueing",
      "Group Management",
    ],
    forWhom: [
      "Trainers who want to move into group formats",
      "Studio and gym staff leading classes",
      "Coaches who want stronger cueing and floor presence",
    ],
    outcomes: [
      "Programme a class with a coherent structure and intensity curve",
      "Cue clearly to a mixed-ability room",
      "Run functional, HIIT and circuit formats safely",
      "Manage space, equipment and participant flow",
      "Scale exercises up and down without stopping the session",
    ],
    curriculum: {
      modules: [
        { index: "01", title: "Group Exercise Instruction" },
        { index: "02", title: "Functional Training" },
        { index: "03", title: "HIIT & Circuit Training" },
        { index: "04", title: "Class Programming" },
        { index: "05", title: "Coaching & Cueing" },
        { index: "06", title: "Group Management" },
      ],
    },
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: "fitness-nutrition-coach",
    seo: {
      title:
        "Fitness Nutrition Coach Course in Chennai (CFNC) | CoachLab",
      description:
        "Fitness nutrition course in Chennai. Macronutrients, micronutrients, BMR and TDEE, applied to fat loss, muscle gain and client coaching.",
    },
    index: "04",
    title: "Certified Fitness Nutrition Coach",
    shortName: "CFNC",
    category: "nutrition",
    categoryLabel: "Nutrition",
    icon: "apple",
    summary:
      "Learn foundational nutrition principles and how to apply them within the scope of fitness coaching.",
    overview: [
      "Nutrition is where most coaching conversations end up, and where most coaches are least prepared.",
      "This program covers the fundamentals — macronutrients, micronutrients, energy balance, and the arithmetic behind BMR and TDEE — then applies them to fat loss, muscle gain and everyday client coaching.",
      "It is taught as nutrition coaching within a fitness professional's scope of practice, not as clinical dietetics.",
    ],
    topics: [
      "Nutrition Fundamentals",
      "Macronutrients",
      "Micronutrients",
      "BMR / TDEE",
      "Fat-Loss Nutrition",
      "Muscle-Gain Nutrition",
      "Sports Nutrition Basics",
      "Client Nutrition Coaching",
    ],
    forWhom: [
      "Personal trainers who field nutrition questions daily",
      "Coaches who want a defensible framework instead of fad advice",
      "Fitness enthusiasts who want to understand their own nutrition properly",
    ],
    outcomes: [
      "Explain the role of each macronutrient and key micronutrients",
      "Calculate and interpret BMR and TDEE",
      "Structure nutrition for fat-loss and muscle-gain goals",
      "Understand the basics of sports nutrition around training",
      "Coach nutrition habits within a fitness professional's scope of practice",
    ],
    curriculum: {
      modules: [
        { index: "01", title: "Nutrition Fundamentals" },
        { index: "02", title: "Macronutrients" },
        { index: "03", title: "Micronutrients" },
        { index: "04", title: "BMR & TDEE" },
        { index: "05", title: "Fat-Loss Nutrition" },
        { index: "06", title: "Muscle-Gain Nutrition" },
        { index: "07", title: "Sports Nutrition Basics" },
        {
          index: "08",
          title: "Client Nutrition Coaching",
          note: "Delivered as fitness nutrition coaching, not clinical dietetics.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: "ace-exam-prep",
    seo: {
      title:
        "ACE Personal Trainer Exam Preparation in Chennai | CoachLab",
      description:
        "Preparation for the ACE Personal Trainer exam in Chennai — chapter-wise study, revision, practice questions and mock exams.",
    },
    index: "05",
    title: "ACE Personal Trainer Exam Preparatory Program",
    ctaLabel: "ACE Prep",
    category: "exam-prep",
    categoryLabel: "Exam Preparation",
    icon: "clipboard",
    summary:
      "Structured preparation designed to help aspiring professionals understand and prepare for the ACE Personal Trainer examination.",
    overview: [
      "A preparation program, run chapter by chapter, for candidates working towards the ACE Personal Trainer examination.",
      "Sessions combine curriculum guidance and exam-oriented revision with practice questions, mock exams and practical application of the material.",
      "CoachLab is an independent education provider. This program prepares candidates for the examination; it is not the examination itself and does not issue the ACE credential.",
    ],
    topics: [
      "ACE Curriculum Guidance",
      "Chapter-Wise Preparation",
      "Exam-Oriented Revision",
      "Practice Questions",
      "Mock Exams",
      "Practical Application",
    ],
    forWhom: [
      "Candidates preparing for the ACE Personal Trainer examination",
      "Self-study candidates who want structure and accountability",
      "Trainers returning to formal study after a gap",
    ],
    outcomes: [
      "Work through the curriculum chapter by chapter with guidance",
      "Revise with an exam-oriented focus rather than open-ended reading",
      "Practise with question sets and mock examinations",
      "Connect examination content back to practical coaching",
    ],
    curriculum: {
      modules: [
        { index: "01", title: "ACE Curriculum Guidance" },
        { index: "02", title: "Chapter-Wise Preparation" },
        { index: "03", title: "Exam-Oriented Revision" },
        { index: "04", title: "Practice Questions" },
        { index: "05", title: "Mock Exams" },
        { index: "06", title: "Practical Application" },
      ],
    },
    faqs: [
      {
        q: "Does this program award the ACE certification?",
        a: "No. CoachLab is an independent education provider running a preparatory program. The examination and the credential are administered by ACE. Contact CoachLab for current details on how the preparation is structured.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: "professional-workshops",
    seo: {
      title:
        "Professional Fitness Workshops in Chennai | CoachLab",
      description:
        "Continuing-education workshops for coaches in Chennai — strength and conditioning, functional training, sports nutrition and corrective exercise.",
    },
    index: "06",
    title: "CoachLab Professional Workshops",
    ctaLabel: "Workshops",
    category: "professional-development",
    categoryLabel: "Professional Development",
    icon: "presentation",
    summary:
      "Focused continuing-education workshops designed for fitness professionals who want to expand their coaching knowledge.",
    overview: [
      "Workshops are short, single-subject sessions for coaches who are already working and want to go deeper on one thing at a time.",
      "Topics rotate across strength and conditioning, functional training, sports nutrition, corrective exercise, physique coaching, business and sales, alongside masterclasses and guest sessions.",
    ],
    topics: [
      "Strength & Conditioning",
      "Functional Training",
      "Sports Nutrition",
      "Corrective Exercise",
      "Bodybuilding & Physique Coaching",
      "Contest Preparation",
      "Special Population Training",
      "Fitness Business",
      "Personal Training Sales",
      "Masterclasses",
      "Guest Workshops",
    ],
    forWhom: [
      "Certified coaches continuing their professional development",
      "Trainers specialising in a particular area of practice",
      "Studio owners and gym staff building team capability",
    ],
    outcomes: [
      "Go deep on a single subject without committing to a full program",
      "Add a specialisation to an existing qualification",
      "Learn directly from working professionals in a focused format",
    ],
    curriculum: {
      modules: [
        { index: "01", title: "Strength & Conditioning" },
        { index: "02", title: "Functional Training" },
        { index: "03", title: "Sports Nutrition" },
        { index: "04", title: "Corrective Exercise" },
        { index: "05", title: "Bodybuilding & Physique Coaching" },
        { index: "06", title: "Contest Preparation" },
        { index: "07", title: "Special Population Training" },
        { index: "08", title: "Fitness Business" },
        { index: "09", title: "Personal Training Sales" },
        { index: "10", title: "Masterclasses" },
        { index: "11", title: "Guest Workshops" },
      ],
    },
    faqs: [
      {
        q: "Can workshops be attended separately from a certification?",
        a: "Workshops are run as standalone continuing-education sessions. Availability varies by schedule — contact CoachLab for upcoming workshop dates.",
      },
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const featuredCourse = courses.find((c) => c.featured) ?? courses[0];

/** Options for the enquiry-form dropdown. */
export const courseOptions = [
  ...courses.map((c) => c.title),
  "Not Sure Yet",
];
