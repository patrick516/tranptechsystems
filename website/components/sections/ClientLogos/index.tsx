// components/sections/ClientLogos/index.tsx
import { clients } from "./clients.data";
import Reveal from "@/components/shared/Reveal";

export default function ClientLogos() {
  // Duplicate the list so the marquee loops seamlessly at -50%
  const loop = [...clients, ...clients];

  return (
    <section className="border-y border-gray-100 bg-white py-12">
      <div className="container-max">
        <Reveal direction="fade">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
            Trusted by businesses we've built for
          </p>
        </Reveal>

        <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-4 group-hover:[animation-play-state:paused]">
            {loop.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex h-24 w-44 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white px-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-16 max-w-full object-contain transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
