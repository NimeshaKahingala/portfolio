// Single source of truth for site-wide identity, nav, and socials.
// Expanded in Phase 2 (skills, timeline, certifications). Content defaults
// here follow docs/IMPLEMENTATION_PLAN.md §0 pending Nimesha's confirmation.

export const site = {
  name: "Nimesha Kahingala",
  monogram: "NK",
  role: "Full Stack Developer",
  location: "Colombo, Sri Lanka",
  email: "nimesha.isholi94@gmail.com",
  url: "https://nimesha.dev",
  tagline:
    "I build fast, reliable web applications end to end — from the database schema to the last pixel of the interface.",
  description:
    "Full Stack Developer in Colombo, Sri Lanka, building fast, reliable web applications with React, Vue, Node.js and the cloud.",
  experienceYears: "5+", // pending confirmation
  available: true,
  resumeUrl: "/resume.pdf",
  degree: "BSc in Information Systems",
  university: "University of Colombo School of Computing",
  bio: [
    "I'm Nimesha, a Full Stack Developer who builds complete web solutions — from frontend interfaces to backend architecture. I hold a Meta Front-End Developer Professional Certificate and spend most of my time building scalable web applications with React, Vue, Node.js, and the cloud.",
    "My work has spanned teams and clients across the United States, Singapore, and Sri Lanka, which has given me a global perspective on solving web development problems. I care about accessible interfaces, clean code, and shipping things that hold up in production.",
  ],
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Work", href: "/portfolio/" },
  { label: "About", href: "/about/" },
  { label: "Writing", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export type Social = { label: string; href: string; icon: string };

// Facebook dropped per plan; GitHub added (was missing from the live site).
export const socials: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nimesha-kahingala/", icon: "simple-icons:linkedin" },
  { label: "Medium", href: "https://medium.com/@NimeshaKahingala", icon: "simple-icons:medium" },
  { label: "GitHub", href: "https://github.com/nimeshakahingala", icon: "simple-icons:github" },
  { label: "Email", href: "mailto:nimesha.isholi94@gmail.com", icon: "lucide:mail" },
];
