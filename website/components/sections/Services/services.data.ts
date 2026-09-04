// components/sections/Services/services.data.ts
import {
  Code2,
  Workflow,
  Database,
  Cloud,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Custom Web & Software Solutions",
    description:
      "Tailored to your unique business needs — built from the ground up, not templated.",
    icon: Code2,
  },
  {
    title: "API Development & Integration",
    description:
      "Seamless connections between your systems and the tools you already rely on.",
    icon: Workflow,
  },
  {
    title: "Database Design & Management",
    description:
      "Secure, structured, and built to scale as your data and business grow.",
    icon: Database,
  },
  {
    title: "Cloud Ready & Scalable Systems",
    description:
      "Grow without limits — architecture that scales anytime, anywhere.",
    icon: Cloud,
  },
  {
    title: "Secure, Reliable, High Performance",
    description:
      "Your data, your trust — security and reliability built in from day one.",
    icon: ShieldCheck,
  },
];
