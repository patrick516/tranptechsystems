// components/sections/Team/TeamCard.tsx
import Image from "next/image";
import { TeamMember } from "./team.data";

interface TeamCardProps {
  member: TeamMember;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={112}
          height={112}
          className="mx-auto mb-4 h-28 w-28 rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-brand-50 text-2xl font-bold text-brand-700">
          {getInitials(member.name)}
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
      <p className="mb-3 text-sm font-medium text-brand-700">{member.role}</p>
      <p className="text-sm leading-relaxed text-gray-500">{member.bio}</p>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.8c0-1.62-.03-3.7-2.26-3.7-2.26 0-2.6 1.77-2.6 3.6V23h-4V8z" />
          </svg>
          LinkedIn
        </a>
      )}
    </div>
  );
}
