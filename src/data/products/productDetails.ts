import { ProductDetails } from "@/types/productDetails";

export const productDetails: ProductDetails[] = [
  {
    productId: "1",
    slug: "leafclutch-pos",
    name: "LeafClutch POS",
    description:
      "A modern point-of-sale platform that simplifies sales, inventory, and daily operations for growing businesses.",
    image: "/products/leafclutch-pos.png",
    imageAlt: "LeafClutch POS product dashboard",
    stats: [
      { id: "businesses", value: "500+", label: "Businesses", description: "Growing with the platform" },
      { id: "transactions", value: "10K+", label: "Transactions", description: "Processed every month" },
      { id: "time-saved", value: "40%", label: "Time Saved", description: "On daily operations" },
      { id: "satisfaction", value: "99%", label: "Satisfaction", description: "From active customers" },
    ],
    features: [
      { id: "sales", title: "Smart Sales Management", description: "Process orders quickly with a clear, intuitive checkout experience.", icon: "ShoppingCart" },
      { id: "inventory", title: "Inventory Tracking", description: "Know what is in stock and make better purchasing decisions.", icon: "Package" },
      { id: "pricing", title: "Product & Pricing", description: "Manage products, variants, and pricing from one place.", icon: "Tags" },
      { id: "reports", title: "Sales Reports", description: "Turn daily sales data into useful business insights.", icon: "BarChart3" },
      { id: "users", title: "Multi-user Access", description: "Give every team member the right access for their role.", icon: "Users" },
      { id: "operations", title: "Easy Daily Operations", description: "Keep routine work simple, consistent, and efficient.", icon: "Zap" },
    ],
  },
  {
    productId: "2",
    slug: "leafclutch-crm",
    name: "LeafClutch CRM",
    description:
      "A focused CRM for managing customers, leads, sales conversations, and relationships from one powerful workspace.",
    image: "/products/leafclutch-crm.png",
    imageAlt: "LeafClutch CRM product dashboard",
    stats: [
      { id: "customers", value: "2K+", label: "Customers", description: "Organized in one workspace" },
      { id: "follow-ups", value: "35%", label: "More Follow-ups", description: "Completed on time" },
      { id: "teams", value: "120+", label: "Teams", description: "Collaborating every day" },
      { id: "retention", value: "28%", label: "Higher Retention", description: "With better relationships" },
    ],
    features: [
      { id: "customer-management", title: "Customer Management", description: "Keep complete customer profiles and interaction history close at hand.", icon: "Users" },
      { id: "leads", title: "Lead Tracking", description: "Capture prospects and keep every opportunity moving forward.", icon: "UserPlus" },
      { id: "pipeline", title: "Sales Pipeline", description: "See deal progress clearly from first contact to close.", icon: "Kanban" },
      { id: "follow-up", title: "Follow-up Management", description: "Stay on top of important conversations and next steps.", icon: "CalendarCheck" },
      { id: "insights", title: "Customer Insights", description: "Use practical reports to understand customers and performance.", icon: "ChartNoAxesCombined" },
      { id: "collaboration", title: "Team Collaboration", description: "Give teams a shared view of accounts, notes, and activity.", icon: "MessagesSquare" },
    ],
  },
  {
    productId: "3",
    slug: "leafclutch-hr",
    name: "LeafClutch HR",
    description:
      "An intuitive HR solution that brings employee records, attendance, leave, and workforce operations together.",
    image: "/products/leafclutch-hr.png",
    imageAlt: "LeafClutch HR product dashboard",
    stats: [
      { id: "employees", value: "1K+", label: "Employees", description: "Managed with confidence" },
      { id: "attendance", value: "30%", label: "Less Admin", description: "Work for HR teams" },
      { id: "accuracy", value: "98%", label: "Accuracy", description: "Across attendance records" },
      { id: "active-businesses", value: "150+", label: "Businesses", description: "Running smoother HR" },
    ],
    features: [
      { id: "employees", title: "Employee Management", description: "Maintain accurate employee information in one secure place.", icon: "ContactRound" },
      { id: "attendance", title: "Attendance Tracking", description: "Make attendance visible and reduce manual record keeping.", icon: "Clock3" },
      { id: "leave", title: "Leave Management", description: "Review, approve, and track leave requests with ease.", icon: "CalendarDays" },
      { id: "records", title: "Employee Records", description: "Keep essential documents and employment details organized.", icon: "FolderKanban" },
      { id: "reports", title: "HR Reports", description: "Get the information needed for better workforce decisions.", icon: "FileChartColumn" },
      { id: "workforce", title: "Workforce Insights", description: "Understand team trends and plan ahead with confidence.", icon: "Lightbulb" },
    ],
  },
];

export function getProductDetails(slug: string) {
  return productDetails.find((product) => product.slug === slug);
}
