"use client";
import { useState } from "react";

// Web3Forms access key. This key identifies which inbox submissions go to.
// It's exposed in the client bundle by necessity (the form submits from the
// browser), so it's not a true secret — but don't paste it into public
// repos/issues. If it ever needs rotating, do it in the Web3Forms dashboard.
const WEB3FORMS_ACCESS_KEY = "193279a0-8b73-49fc-80bc-fa86a219d7aa";

const TOPICS = [
  "Product correction or update",
  "General feedback",
  "Press or partnership",
  "Other"
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Honeypot check — bots typically fill every field, including hidden ones.
    // If this field has a value, silently "succeed" without submitting.
    if (formData.get("website")) {
      setStatus("success");
      formEl.reset();
      return;
    }

    // Web3Forms expects the access key in the payload.
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    // Optional: subject line for the email you'll receive.
    const topic = formData.get("topic") || "Contact form";
    formData.append("subject", `[Smart Pets Marketplace] ${topic}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-trust-200 bg-trust-50 p-8 text-center">
        <h3 className="text-2xl font-bold text-trust-900">Thanks — message sent.</h3>
        <p className="mt-3 text-slate-700">
          We read every message and aim to reply within a few business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-trust-500 bg-white px-5 py-3 text-sm font-semibold text-trust-600 transition hover:-translate-y-0.5 hover:border-trust-600 hover:text-trust-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 block w-full rounded-xl border border-coral-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-trust-500 focus:outline-none focus:ring-2 focus:ring-trust-200"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 block w-full rounded-xl border border-coral-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-trust-500 focus:outline-none focus:ring-2 focus:ring-trust-200"
        />
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-semibold text-slate-900">
          What's this about?
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue=""
          className="mt-2 block w-full rounded-xl border border-coral-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-trust-500 focus:outline-none focus:ring-2 focus:ring-trust-200"
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 block w-full rounded-xl border border-coral-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-trust-500 focus:outline-none focus:ring-2 focus:ring-trust-200"
        />
      </div>

      {/*
        Honeypot field — hidden from real users via inline styles and
        aria-hidden. Bots that auto-fill every field will trip this and
        their submission will be silently dropped.
      */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="website">Website (leave blank)</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Your email is only used to reply to you. We don't share it or add you to any list.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
