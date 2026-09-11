import type { Job } from "@/types/job";

export const jobs: Job[] = [
  {
    id: "frontend-developer",
    slug: "frontend-developer",
    title: "Frontend Developer",
    description:
      "Build polished, accessible interfaces that make complex business workflows simple to use.",
    responsibilities: [
      "Build responsive interfaces with React and Next.js.",
      "Collaborate with design and product teams to refine user experiences.",
      "Write maintainable, tested, and accessible frontend code.",
    ],
    requirements: [
      "Solid experience with React, TypeScript, and modern CSS.",
      "Understanding of responsive design and web accessibility.",
      "Comfort working with Git and collaborative development workflows.",
    ],
    qualifications: [
      "1+ years of professional frontend development experience.",
      "A strong portfolio or examples of shipped web projects.",
    ],
    location: "Butwal, Nepal",
    applicationDeadline: "October 15, 2026",
    href: "/career/frontend-developer",
  },
  {
    id: "backend-developer",
    slug: "backend-developer",
    title: "Backend Developer",
    description:
      "Design reliable APIs and services that support the next generation of our business products.",
    responsibilities: [
      "Design and maintain reliable APIs and backend services.",
      "Work with frontend developers to shape practical product solutions.",
      "Improve application performance, security, and observability.",
    ],
    requirements: [
      "Experience with server-side development and relational databases.",
      "Knowledge of API design, authentication, and data validation.",
      "A thoughtful approach to testing and production reliability.",
    ],
    qualifications: [
      "1+ years of professional backend development experience.",
      "Experience shipping and supporting web applications.",
    ],
    location: "Butwal, Nepal",
    applicationDeadline: "October 22, 2026",
    href: "/career/backend-developer",
  },
  {
    id: "product-designer",
    slug: "product-designer",
    title: "Product Designer",
    description:
      "Turn customer needs into thoughtful product experiences through research, systems, and iteration.",
    responsibilities: [
      "Translate customer and business needs into clear product experiences.",
      "Create flows, wireframes, and polished interface designs.",
      "Partner with engineering and product teams throughout delivery.",
    ],
    requirements: [
      "Strong understanding of user-centered design principles.",
      "Experience with Figma or a similar design tool.",
      "Ability to explain design decisions clearly and constructively.",
    ],
    qualifications: [
      "1+ years of product or digital design experience.",
      "A portfolio showing strong product thinking and visual craft.",
    ],
    location: "Remote",
    applicationDeadline: "November 5, 2026",
    href: "/career/product-designer",
  },
];
