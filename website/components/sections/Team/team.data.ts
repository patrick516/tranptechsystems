// components/sections/Team/team.data.ts
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string; // path under /public/team/ — omit until a real photo is ready
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    name: "Patrick Kulinji",
    role: "Founder & Lead Developer",
    bio: "Patrick founded TranpTech Systems to bring the same discipline used in enterprise software to businesses that are often underserved by it. With hands-on experience building production business applications and mobile systems — from an offline-first health platform used by community health workers to enterprise dashboards and payment integrations — he leads every project end-to-end, from application code and database design through to the infrastructure that runs it.",
    linkedin: "https://www.linkedin.com/in/patrick-kulinji-9b7172359/",
  },
  {
    name: "Henry Mpokosa",
    role: "Marketing & Outreach Officer",
    bio: "Henry leads outreach and stakeholder engagement for TranpTech Systems, building relationships with the organizations and communities that TranpTech's products serve. He works closely with the development team to make sure every solution is grounded in a real understanding of the people who will actually use it.",
  },
];
