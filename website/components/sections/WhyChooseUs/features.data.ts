// components/sections/WhyChooseUs/features.data.ts
import { Cpu, TrendingUp, Users, LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: Feature[] = [
  {
    title: "Modern Technologies",
    description: "Latest tools. Maximum results.",
    icon: Cpu,
  },
  {
    title: "Scalable & Future-Ready",
    description: "Built to grow with your business.",
    icon: TrendingUp,
  },
  {
    title: "Built Around Your Business",
    description: "Solutions that actually fit you.",
    icon: Users,
  },
];
