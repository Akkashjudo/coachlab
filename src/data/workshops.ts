/**
 * Workshop subjects. Dates are deliberately absent — CoachLab confirms
 * schedules directly, and inventing one here would be a lie on the page.
 */

export type WorkshopTopic = {
  index: string;
  title: string;
  copy: string;
  group: "Coaching" | "Nutrition" | "Physique" | "Business" | "Guest";
};

export const workshopTopics: WorkshopTopic[] = [
  {
    index: "01",
    title: "Strength & Conditioning",
    copy: "Programming for strength, power and athletic qualities.",
    group: "Coaching",
  },
  {
    index: "02",
    title: "Functional Training",
    copy: "Training movement patterns rather than isolated muscles.",
    group: "Coaching",
  },
  {
    index: "03",
    title: "Sports Nutrition",
    copy: "Fuelling, timing and recovery around training and competition.",
    group: "Nutrition",
  },
  {
    index: "04",
    title: "Corrective Exercise",
    copy: "Movement quality and joint mobility within a coach's scope of practice.",
    group: "Coaching",
  },
  {
    index: "05",
    title: "Bodybuilding & Physique Coaching",
    copy: "Structuring training and nutrition for physique development.",
    group: "Physique",
  },
  {
    index: "06",
    title: "Contest Preparation",
    copy: "How a physique athlete is prepared through a competition cycle.",
    group: "Physique",
  },
  {
    index: "07",
    title: "Special Population Training",
    copy: "Adapting programs for clients with differing needs and constraints.",
    group: "Coaching",
  },
  {
    index: "08",
    title: "Fitness Business",
    copy: "Building a sustainable practice around your coaching.",
    group: "Business",
  },
  {
    index: "09",
    title: "Personal Training Sales",
    copy: "Consulting, communicating value and converting enquiries honestly.",
    group: "Business",
  },
  {
    index: "10",
    title: "Masterclasses",
    copy: "Deep sessions on a single subject, taught end to end.",
    group: "Guest",
  },
  {
    index: "11",
    title: "Guest Workshops",
    copy: "Sessions led by invited professionals from across the industry.",
    group: "Guest",
  },
];

export const workshopGroups = [
  "Coaching",
  "Nutrition",
  "Physique",
  "Business",
  "Guest",
] as const;
