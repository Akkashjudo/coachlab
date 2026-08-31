import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { SITE_URL } from "@/lib/site-url";


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/courses`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/workshops`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    changeFrequency: "monthly",
    priority: course.featured ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...courseRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
