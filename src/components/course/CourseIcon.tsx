import {
  Award,
  TrendingUp,
  Users,
  Apple,
  ClipboardCheck,
  Presentation,
  BookOpen,
  Compass,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

/**
 * One consistent icon system across courses and pillars, so the set reads as
 * a family rather than as clip art borrowed from the posters.
 */
const ICONS: Record<string, LucideIcon> = {
  certificate: Award,
  trending: TrendingUp,
  users: Users,
  apple: Apple,
  clipboard: ClipboardCheck,
  presentation: Presentation,
  award: Award,
  book: BookOpen,
  compass: Compass,
  dumbbell: Dumbbell,
};

export function CourseIcon({
  name,
  className = "size-5",
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = ICONS[name] ?? Award;
  return <Icon aria-hidden className={className} strokeWidth={strokeWidth} />;
}
