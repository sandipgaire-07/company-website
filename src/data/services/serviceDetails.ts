import { ServiceDetails } from "@/types/service";

export const serviceDetails: ServiceDetails[] = [
  {
    id: "1",
    title: "Web Development",
    slug: "web-development",
    description: "Build fast, responsive, and modern websites designed to deliver great user experiences and measurable business results.",
    animationUrl: "https://lottie.host/your-web-animation.lottie",
    color: "#0EA5E9",
    features: [
      { id: "responsive", title: "Responsive Design", description: "Seamless experiences across mobile, tablet, and desktop devices.", icon: "MonitorSmartphone", sortOrder: 1 },
      { id: "performance", title: "High Performance", description: "Optimized websites focused on speed and excellent user experience.", icon: "Gauge", sortOrder: 2 },
      { id: "seo", title: "SEO Friendly", description: "A strong technical foundation for search visibility and organic growth.", icon: "SearchCheck", sortOrder: 3 },
      { id: "scalable", title: "Scalable Architecture", description: "Clean, maintainable solutions that can grow with your business.", icon: "Layers3", sortOrder: 4 },
    ],
  },
  {
    id: "2",
    title: "App Development",
    slug: "app-development",
    description: "Create intuitive and reliable mobile applications that connect your business with customers wherever they are.",
    animationUrl: "https://lottie.host/your-app-animation.lottie",
    color: "#3B82F6",
    features: [
      { id: "cross-platform", title: "Cross-Platform Apps", description: "Consistent experiences across modern mobile platforms.", icon: "Smartphone", sortOrder: 1 },
      { id: "ux", title: "Intuitive User Experience", description: "Simple, engaging interfaces designed around real user needs.", icon: "Sparkles", sortOrder: 2 },
      { id: "performance", title: "Optimized Performance", description: "Fast and reliable applications built for smooth everyday usage.", icon: "Zap", sortOrder: 3 },
    ],
  },
  {
    id: "3",
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Create compelling visual experiences that strengthen your brand identity and communicate your message effectively.",
    animationUrl: "https://lottie.host/your-design-animation.lottie",
    color: "#A855F7",
    features: [
      { id: "branding", title: "Brand Identity", description: "Consistent visual identities that make your business recognizable.", icon: "Palette", sortOrder: 1 },
      { id: "creative", title: "Creative Design", description: "Visual concepts designed to capture attention and communicate clearly.", icon: "Lightbulb", sortOrder: 2 },
      { id: "marketing", title: "Marketing Assets", description: "Professional graphics for campaigns, social media, and marketing materials.", icon: "Megaphone", sortOrder: 3 },
    ],
  },
  {
    id: "4",
    title: "Software Development",
    slug: "software-development",
    description: "Develop custom software solutions tailored to your business processes, workflows, and long-term goals.",
    animationUrl: "https://lottie.host/your-software-animation.lottie",
    color: "#10B981",
    features: [
      { id: "custom", title: "Custom Solutions", description: "Software designed specifically around your business requirements.", icon: "Blocks", sortOrder: 1 },
      { id: "integration", title: "System Integration", description: "Connect software with the tools and systems your business already uses.", icon: "Workflow", sortOrder: 2 },
      { id: "scalable", title: "Scalable Systems", description: "Architecture designed for future growth and changing requirements.", icon: "Scaling", sortOrder: 3 },
    ],
  },
  {
    id: "5",
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Grow your online presence through focused digital strategies that reach the right audience and drive meaningful results.",
    animationUrl: "https://lottie.host/your-marketing-animation.lottie",
    color: "#F59E0B",
    features: [
      { id: "strategy", title: "Digital Strategy", description: "Data-driven strategies designed around your goals and audience.", icon: "Target", sortOrder: 1 },
      { id: "social", title: "Social Media", description: "Build stronger engagement and visibility across social platforms.", icon: "Share2", sortOrder: 2 },
      { id: "analytics", title: "Performance Analytics", description: "Track campaigns and improve performance with meaningful insights.", icon: "ChartNoAxesCombined", sortOrder: 3 },
    ],
  },
  {
    id: "6",
    title: "IT Consultancy",
    slug: "it-consultancy",
    description: "Get expert technology guidance to make better decisions, improve operations, and build a stronger digital foundation.",
    animationUrl: "https://lottie.host/your-consultancy-animation.lottie",
    color: "#14B8A6",
    features: [
      { id: "strategy", title: "Technology Strategy", description: "Practical technology strategies aligned with business objectives.", icon: "Compass", sortOrder: 1 },
      { id: "optimization", title: "IT Optimization", description: "Improve efficiency, reliability, and productivity across your systems.", icon: "Settings2", sortOrder: 2 },
      { id: "security", title: "Technology Guidance", description: "Expert guidance for selecting and implementing the right solutions.", icon: "ShieldCheck", sortOrder: 3 },
    ],
  },
];

export function getServiceDetails(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
