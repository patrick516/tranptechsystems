// components/sections/Benefits/benefits.data.ts
export interface Benefit {
  title: string;
  icon: string;
}

export const benefits: Benefit[] = [
  { title: "Faster Performance", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  {
    title: "Stronger Security",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    title: "Smarter Growth",
    icon: "M23 6l-9.5 9.5-5-5L1 18M23 6h-6M23 6v6",
  },
  {
    title: "Better Experience",
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  },
];
