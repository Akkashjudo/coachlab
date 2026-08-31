/**
 * Photographs from CoachLab certificate presentations.
 * These are CoachLab's own event photographs — no stock imagery is used
 * anywhere on this site. Captions stay factual and name no individuals.
 */

export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The single landscape frame is allowed to span wider in the rail. */
  wide?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/certification-02.jpg",
    alt: "CoachLab students and instructors together at a certificate presentation, photographed in front of the CoachLab backdrop.",
    width: 1100,
    height: 825,
    wide: true,
  },
  {
    src: "/images/gallery/certification-01.jpg",
    alt: "A CoachLab student receiving a framed certificate from the instruction team.",
    width: 1100,
    height: 1306,
  },
  {
    src: "/images/gallery/certification-04.jpg",
    alt: "A CoachLab student holding her certificate alongside the instruction team.",
    width: 1100,
    height: 1397,
  },
  {
    src: "/images/gallery/certification-03.jpg",
    alt: "A CoachLab graduate presented with a certificate in front of the CoachLab backdrop.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-06.jpg",
    alt: "Certificate presentation to a CoachLab student at the end of a program.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-07.jpg",
    alt: "A CoachLab student receiving a certificate with the instruction team.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-08.jpg",
    alt: "A CoachLab graduate holding a framed certificate at a certification day.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-05.jpg",
    alt: "Certificate presentation at a CoachLab certification day.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-09.jpg",
    alt: "A CoachLab student presented with a certificate by the instruction team.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-10.jpg",
    alt: "A CoachLab graduate receiving a certificate in front of the CoachLab backdrop.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-11.jpg",
    alt: "Certificate presentation to a CoachLab student at the close of a program.",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/gallery/certification-12.jpg",
    alt: "A CoachLab student holding a framed certificate with the instruction team.",
    width: 1086,
    height: 1448,
  },
];
