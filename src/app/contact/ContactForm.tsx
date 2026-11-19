"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Heron's contact form: big underlined fields in a grid, "Submit" across the bottom.
// Sends to /api/enquiry (server side), then goes to the thank-you page.
const field =
  "w-full border-b border-line bg-transparent px-16 py-20 text-20 font-semibold uppercase tracking-[-0.02em] text-ink placeholder:text-mute focus:outline-none focus:bg-ink/[0.03] lg:text-24";

export default function ContactForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong");
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="grid sm:grid-cols-2">
        <input name="firstName" required placeholder="First name" autoComplete="given-name" className={`${field} sm:border-r`} />
        <input name="lastName" placeholder="Last name" autoComplete="family-name" className={field} />
      </div>
      <input name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
      <input name="phone" type="tel" required placeholder="Phone number" autoComplete="tel" pattern="[0-9+ ()-]{8,}" className={field} />
      <textarea name="message" rows={3} placeholder="Message" className={`${field} resize-none`} />
      {/* honeypot: real visitors never see or fill this */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {error && <p className="mono px-16 pt-12 text-12 text-brand">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="group flex items-center justify-between px-16 py-20 text-left text-20 font-semibold text-mute uppercase transition-colors hover:text-ink disabled:opacity-60 lg:text-24"
      >
        {sending ? "Sending…" : "Submit"}
        <span className="text-16 transition-transform group-hover:translate-x-4">→</span>
      </button>
    </form>
  );
}
