// Single source of truth for site-wide identity, nav, and socials.
// Expanded in Phase 2 (skills, timeline, certifications). Content defaults
// here follow docs/IMPLEMENTATION_PLAN.md §0 pending Nimesha's confirmation.

export const site = {
  name: "Nimesha Kahingala",
  monogram: "NK",
  role: "Full Stack Developer",
  location: "Colombo, Sri Lanka",
  email: "nimesha.isholi94@gmail.com",
  url: "https://nimeshakahingala.com",
  tagline:
    "I build fast, reliable web applications end to end — from the database schema to the last pixel of the interface.",
  description:
    "Full Stack Developer in Colombo, Sri Lanka, building fast, reliable web applications with React, Vue, Node.js and the cloud.",
  experienceYears: "5+", // pending confirmation
  available: true,
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
