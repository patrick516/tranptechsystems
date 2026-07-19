// components/sections/Services/services.data.ts
export interface Service {
  title: string;
  description: string;
  icon: string; // SVG path data
}

export const services: Service[] = [
  {
    title: "Custom Web & Software Solutions",
    description:
      "Tailored to your unique business needs — built from the ground up, not templated.",
    icon: "M8 9l-3 3 3 3m8-6l3 3-3 3M13 5l-2 14",
  },
  {
    title: "API Development & Integration",
    description:
      "Seamless connections between your systems and the tools you already rely on.",
    icon: "M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83",
  },
  {
    title: "Database Design & Management",
    description:
      "Secure, structured, and built to scale as your data and business grow.",
    icon: "M4 7c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3zm0 0v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3",
  },
  {
    title: "Cloud Ready & Scalable Systems",
    description:
      "Grow without limits — architecture that scales anytime, anywhere.",
    icon: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
  },
  {
    title: "Secure, Reliable, High Performance",
    description:
      "Your data, your trust — security and reliability built in from day one.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
];
