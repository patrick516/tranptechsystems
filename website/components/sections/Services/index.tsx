// components/sections/Services/index.tsx
import { services } from "./services.data";
import ServiceCard from "./ServiceCard";
import Reveal from "@/components/shared/Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-gray-50">
      <div className="container-max section-padding">
        <Reveal direction="left" className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
            What We Do
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Custom digital solutions that drive growth
          </h2>
          <p className="mt-4 text-gray-600">
            From concept to deployment, we build systems designed around how
            your business actually works.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              direction="up"
              delay={i * 0.08}
              className={
                services.length % 2 === 1 && i === services.length - 1
                  ? "sm:col-span-2 sm:mx-auto sm:w-1/2"
                  : undefined
              }
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
