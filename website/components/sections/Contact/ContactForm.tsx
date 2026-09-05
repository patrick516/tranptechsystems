// components/sections/Contact/ContactForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leadService";
import SelectDropdown from "@/components/shared/SelectDropdown";

const SERVICE_OPTIONS = [
  {
    value: "Custom Web & Software Solutions",
    label: "Custom Web & Software Solutions",
  },
  {
    value: "API Development & Integration",
    label: "API Development & Integration",
  },
  {
    value: "Database Design & Management",
    label: "Database Design & Management",
  },
  {
    value: "Cloud Ready & Scalable Systems",
    label: "Cloud Ready & Scalable Systems",
  },
  { value: "Other", label: "Other" },
];

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await submitLead(form);
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceInterest: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-brand-800">Message sent!</h3>
        <p className="mt-2 text-sm text-brand-700">
          Thanks for reaching out — we'll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-brand-700 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone (optional)</label>
          <input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Company (optional)</label>
          <input
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>What are you interested in?</label>
        <SelectDropdown
          value={form.serviceInterest}
          onChange={(v) => handleChange("serviceInterest", v)}
          options={SERVICE_OPTIONS}
          placeholder="Select a service"
        />
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell us a bit about your project..."
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
