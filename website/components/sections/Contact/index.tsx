// components/sections/Contact/index.tsx
import { getSiteSettings } from "@/lib/siteSettingsService";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Reveal from "@/components/shared/Reveal";

export default async function Contact() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <section id="contact" className="bg-gray-50">
      <div className="container-max section-padding grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Reveal direction="left">
          <ContactInfo settings={settings} />
        </Reveal>
        <Reveal
          direction="right"
          delay={0.15}
          className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
