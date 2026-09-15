import { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    position: "Chief Executive Officer",
    profileImage: "/testimonials/client-1.jpg",
    biography:
      "John leads the company with a focus on technology, innovation, and sustainable business growth. With over 15 years of experience in the tech industry, he drives the company's vision and strategic direction.",
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/johndoe",
      },
      {
        platform: "GitHub",
        url: "https://github.com/johndoe",
      },
    ],
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    position: "Chief Technology Officer",
    profileImage: "/testimonials/client-2.jpg",
    biography:
      "Priya oversees all technical operations and drives the engineering roadmap. She has a passion for building scalable systems and mentoring development teams.",
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/priyasharma",
      },
      {
        platform: "GitHub",
        url: "https://github.com/priyasharma",
      },
      {
        platform: "X",
        url: "https://x.com/priyasharma",
      },
    ],
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "3",
    name: "Amit Karki",
    position: "Lead Frontend Developer",
    profileImage: "/testimonials/client-3.jpg",
    biography:
      "Amit crafts pixel-perfect, accessible user interfaces using React and Next.js. He is passionate about performance optimization and modern web standards.",
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/amitkarki",
      },
    ],
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "4",
    name: "Sunita Thapa",
    position: "UI/UX Designer",
    profileImage: "/testimonials/client-1.jpg",
    biography:
      "Sunita creates intuitive and beautiful user experiences. She bridges the gap between design and development with a focus on user-centered design principles.",
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/sunitathapa",
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/sunitathapa",
      },
    ],
    sortOrder: 4,
    isActive: false,
  },
  {
    id: "5",
    name: "Bikram Adhikari",
    position: "Marketing Manager",
    profileImage: "/testimonials/client-2.jpg",
    biography:
      "Bikram drives the company's marketing strategy, brand positioning, and digital campaigns. He brings creative storytelling to every initiative.",
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/bikramadhikari",
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/bikramadhikari",
      },
      {
        platform: "X",
        url: "https://x.com/bikramadhikari",
      },
    ],
    sortOrder: 5,
    isActive: true,
  },
];
