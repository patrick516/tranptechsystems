// components/sections/Team/index.tsx
import { team } from "./team.data";
import TeamCard from "./TeamCard";
import Reveal from "@/components/shared/Reveal";

export default function Team() {
  return (
    <section className="bg-gray-50">
      <div className="container-max section-padding">
        <Reveal direction="left" className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
            Meet The Team
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The people behind TranpTech
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.name} direction="up" delay={i * 0.1}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
