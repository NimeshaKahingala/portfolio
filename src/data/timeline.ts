// Experience + education as one continuous timeline (newest first) per
// docs/DESIGN_CONCEPT.md §3.5. Certifications live separately as text rows.

export type TimelineEntry = {
  kind: "work" | "education";
  period: string;
  role: string;
  org: string;
  summary: string;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    period: "2024 — Present",
    role: "Software Engineer (Volunteer)",
    org: "Helpful Engineering",
    summary:
      "Building full-stack features for disaster-relief platforms with Vue, Nuxt, TypeScript, and D3.js data visualizations.",
  },
  {
    kind: "work",
    period: "2020 — 2023",
    role: "Software Engineer — UI",
    org: "1Billion Technology",
    summary:
      "Led frontend development across multiple client projects, mentored junior developers, and contributed to full-stack web solutions.",
  },
  {
    kind: "work",
    period: "2019 — 2020",
    role: "UI/UX Engineer — Intern",
    org: "eBEYONDS",
    summary:
      "Developed responsive web interfaces and worked with design teams to build user-centered products.",
  },
  {
    kind: "education",
    period: "2016 — 2020",
    role: "BSc in Information Systems",
    org: "University of Colombo School of Computing",
    summary:
      "Focus on software development and database management.",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    year: "2023",
  },
];
