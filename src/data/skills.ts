// Categorized tech stack for the About skills grid and the home tools strip.
// No proficiency percentages (see docs/DESIGN_CONCEPT.md §4.2) — skills are
// demonstrated through projects. Icons are iconify slugs (astro-icon).

export type Skill = { name: string; icon: string };
export type SkillCategory = { title: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: "simple-icons:react" },
      { name: "Vue.js", icon: "simple-icons:vuedotjs" },
      { name: "Nuxt", icon: "simple-icons:nuxt" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "JavaScript", icon: "simple-icons:javascript" },
      { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "simple-icons:nodedotjs" },
      { name: "Express", icon: "simple-icons:express" },
      { name: "REST APIs", icon: "lucide:webhook" },
      { name: "GraphQL", icon: "simple-icons:graphql" },
      { name: "JWT Auth", icon: "simple-icons:jsonwebtokens" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "MongoDB", icon: "simple-icons:mongodb" },
      { name: "Supabase", icon: "simple-icons:supabase" },
      { name: "Redis", icon: "simple-icons:redis" },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "AWS", icon: "simple-icons:amazonwebservices" },
      { name: "Docker", icon: "simple-icons:docker" },
      { name: "Git", icon: "simple-icons:git" },
      { name: "Vite", icon: "simple-icons:vite" },
    ],
  },
];

// Curated subset for the home page tools strip (docs/DESIGN_CONCEPT.md §3.4).
export const featuredTools: Skill[] = [
  { name: "React", icon: "simple-icons:react" },
  { name: "TypeScript", icon: "simple-icons:typescript" },
  { name: "Vue.js", icon: "simple-icons:vuedotjs" },
  { name: "Node.js", icon: "simple-icons:nodedotjs" },
  { name: "PostgreSQL", icon: "simple-icons:postgresql" },
  { name: "MongoDB", icon: "simple-icons:mongodb" },
  { name: "AWS", icon: "simple-icons:amazonwebservices" },
  { name: "Docker", icon: "simple-icons:docker" },
];
