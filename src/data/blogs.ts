import type { BlogPost } from "@/types/blog";

export const blogs: BlogPost[] = [
  {
    id: "1",
    slug: "building-better-digital-workflows",
    title: "Building Better Digital Workflows for Growing Businesses",
    category: "Business Technology",
    excerpt:
      "The right digital workflow can remove friction from everyday operations and give teams more time to focus on meaningful work.",
    content: [
      "Growing businesses often rely on a collection of tools that solve individual problems but do not always work well together. Over time, this creates duplicated work, disconnected information, and avoidable delays.",
      "A thoughtful digital workflow starts with understanding how work actually moves through a team. From there, businesses can simplify handoffs, centralize important information, and automate repetitive steps without making the experience harder for people.",
      "The most successful improvements are practical and measurable. Teams should be able to see where a process is improving and continue refining it as the business evolves.",
    ],
    image: "/file.svg",
    author: "LeafClutch Team",
    publishedAt: "September 5, 2026",
  },
  {
    id: "2",
    slug: "why-data-driven-products-win",
    title: "Why Data-Driven Products Win Customer Trust",
    category: "Product Strategy",
    excerpt:
      "Useful data is more than a reporting tool. It helps teams make clearer decisions and create products that respond to real customer needs.",
    content: [
      "Data-driven product development does not mean replacing judgment with dashboards. It means combining customer insight with reliable signals so teams can make decisions with greater confidence.",
      "Good product data answers practical questions: where users experience friction, which workflows create value, and what needs attention next. Clear measurement helps teams prioritize improvements instead of guessing.",
      "When data is connected to a clear customer outcome, it becomes a foundation for trust. Users receive more relevant experiences, while teams can explain why a change was made and what it achieved.",
    ],
    image: "/file.svg",
    author: "Aarav Sharma",
    publishedAt: "August 22, 2026",
  },
  {
    id: "3",
    slug: "designing-software-people-enjoy-using",
    title: "Designing Software People Enjoy Using",
    category: "Design & UX",
    excerpt:
      "Simple, accessible interfaces help people complete important tasks with less effort and more confidence.",
    content: [
      "Great software design begins by respecting the person using it. Interfaces should make the next step clear, communicate useful feedback, and stay out of the way when the work is already familiar.",
      "Consistency is a powerful part of a good experience. Shared patterns, readable content, and accessible controls help users build confidence as they move through a product.",
      "Design is also an ongoing practice. Listening to users, reviewing behavior, and improving small moments over time can create a product that feels noticeably easier to use.",
    ],
    image: "/file.svg",
    author: "Maya Thapa",
    publishedAt: "August 10, 2026",
  },
];

export function getBlogPost(slug: string) {
  return blogs.find((post) => post.slug === slug);
}
