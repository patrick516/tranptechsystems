// components/sections/WhyChooseUs/features.data.ts
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export const features: Feature[] = [
  {
    title: "Modern Technologies",
    description: "Latest tools. Maximum results.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7z",
  },
  {
    title: "Scalable & Future-Ready",
    description: "Built to grow with your business.",
    icon: "M3 17l6-6 4 4 8-8M21 7v6M21 7h-6",
  },
  {
    title: "Built Around Your Business",
    description: "Solutions that actually fit you.",
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  },
];
