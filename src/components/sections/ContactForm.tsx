"use client";

import { useState, type FormEvent } from "react";
import { Loader2, TerminalSquare } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useI18n } from "@/lib/i18n";

type Status = "idle" | "sending" | "ok" | "error";

// ─── Web3Forms access key ────────────────────────────────────────────────────
// Get a free key at https://web3forms.com (enter your email → they send a key).
// It is safe to expose publicly. Recommended: put it in .env.local as
//   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here
// or just paste it directly into the fallback string below.
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "28f7c928-9ee4-4c4b-9a68-9453b3260c96";
// ─────────────────────────────────────────────────────────────────────────────

const fieldWrap =
  "group flex flex-col gap-1 rounded-inset border border-line bg-bg/40 px-4 py-3 transition-shadow focus-within:border-primary focus-within:shadow-[0_0_0_1px_var(--primary),0_0_24px_-8px_var(--glow-primary)]";
const prompt = "font-mono text-xs text-primary";
const input =
  "w-full bg-transparent font-mono text-sm text-text caret-[var(--primary)] outline-none placeholder:text-faint";

export function ContactForm() {
  const { ui } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // keep the terminal UI — no reload / redirect
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    // gather every named field (incl. the hidden access_key + botcheck)
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("ok");
        setForm({ name: "", email: "", subject: "", message: "" }); // clear fields
      } else {
        setStatus("error");
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="glow-frame card-surface overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="win-dots relative inline-block h-3 w-3" />
        <span className="ml-10 flex items-center gap-2 font-mono text-xs text-faint">
          <TerminalSquare size={13} /> contact.sh
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 p-5">
        {/* Web3Forms access key — paste your key above (ACCESS_KEY) */}
        <input type="hidden" name="access_key" value={ACCESS_KEY} />
        {/* nice email subject + honeypot spam trap */}
        <input type="hidden" name="from_name" value="Portfolio — contact.sh" />
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <label className={fieldWrap}>
          <span className={prompt}>{ui.contact.fields.name}</span>
          <input
            name="name"
            className={input}
            value={form.name}
            onChange={set("name")}
            required
            autoComplete="name"
            placeholder={ui.contact.placeholders.name}
          />
        </label>
        <label className={fieldWrap}>
          <span className={prompt}>{ui.contact.fields.email}</span>
          <input
            name="email"
            type="email"
            className={input}
            value={form.email}
            onChange={set("email")}
            required
            autoComplete="email"
            placeholder={ui.contact.placeholders.email}
          />
        </label>
        <label className={fieldWrap}>
          <span className={prompt}>{ui.contact.fields.subject}</span>
          <input
            name="subject"
            className={input}
            value={form.subject}
            onChange={set("subject")}
            required
            placeholder={ui.contact.placeholders.subject}
          />
        </label>
        <label className={fieldWrap}>
          <span className={prompt}>{ui.contact.fields.message}</span>
          <textarea
            name="message"
            className={`${input} min-h-[120px] resize-y`}
            value={form.message}
            onChange={set("message")}
            required
            placeholder={ui.contact.placeholders.message}
          />
        </label>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <MagneticButton
            variant="solid"
            ariaLabel="Send message"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <Loader2 size={15} className="animate-spin" /> {ui.contact.sending}
              </>
            ) : (
              ui.contact.send
            )}
          </MagneticButton>

          {/* inline terminal status line */}
          {status === "ok" ? (
            <span className="font-mono text-xs text-green-400">
              {ui.contact.statusOk}
            </span>
          ) : status === "error" ? (
            <span className="font-mono text-xs text-red-400">{ui.contact.errorPrefix} {error}</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
