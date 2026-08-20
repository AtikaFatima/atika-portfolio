"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { EASE } from "@/lib/motion";
import Magnetic from "./Magnetic";

const RECIPIENT = "atika.fatima283@gmail.com";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle drift: the headline settles its last 40px into place as the
  // section scrolls up into view (static under reduced motion).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden px-6 pt-24 pb-12 lg:px-10 lg:pt-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-8"
        >
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-ink/55">
            Get in touch
          </span>

          {/* Each visual line rises from behind its own overflow mask. The
              wrappers trade pb/-mb so the tight leading doesn't clip the
              italic descenders of "g"/"y". */}
          <motion.h2
            style={prefersReducedMotion ? undefined : { y: headingY }}
            className="font-serif italic leading-[0.92] text-ink text-[clamp(56px,10vw,180px)]"
          >
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span
                className="inline-block"
                initial={
                  prefersReducedMotion ? false : { y: "110%", opacity: 0.001 }
                }
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                Let&apos;s Connect
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
            className="max-w-3xl font-sans text-[clamp(17px,1.7vw,24px)] leading-relaxed text-ink/70"
          >
            I&apos;m always open to new opportunities, collaborations, and professional connections. Please feel free to contact me.
          </motion.p>

          <MagneticEmail />

          <ContactForm />

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8">
            <a
              href={`${BASE_PATH}/Atika_Fatima_Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-ink/75 transition-colors hover:text-ink"
            >
              Resume
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <a
              href={`mailto:${RECIPIENT}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-ink/75 transition-colors hover:text-ink"
            >
              Email
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <a
              href="https://www.linkedin.com/in/afatima8/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-ink/75 transition-colors hover:text-ink"
            >
              LinkedIn
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <span className="font-sans text-[15px] text-ink/55">Health informatics · Healthcare data · Clinical research</span>
          </div>
        </motion.div>

        <div className="mt-24 flex flex-col gap-2 border-t border-ink/15 pt-8 text-[12px] text-ink/55 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Atika Fatima</span>
          <span className="font-serif italic">Health informatics with a clinical perspective.</span>
        </div>
      </div>
    </section>
  );
}

/** Email link riding the shared magnetic-hover wrapper. */
function MagneticEmail() {
  return (
    <Magnetic strength={0.18} strengthY={0.25} className="inline-flex w-fit">
      <a
        href={`mailto:${RECIPIENT}`}
        className="group inline-flex w-fit items-center gap-3 text-ink"
      >
        <span className="font-sans text-[clamp(20px,2.6vw,32px)] font-medium underline decoration-ink/30 decoration-[1.5px] underline-offset-[6px] transition-colors group-hover:decoration-ink">
          {RECIPIENT}
        </span>
        <ArrowUpRight
          className="size-7 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </a>
    </Magnetic>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

/** Contact form that POSTs to /api/contact (Resend-backed). Falls back to
 *  mailto: if the backend is unconfigured (no RESEND_API_KEY). */
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(
      `Portfolio inquiry${name ? ` from ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        name ? `Name: ${name}` : "",
        email ? `Reply-to: ${email}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openMailtoFallback();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-2 grid w-full max-w-2xl grid-cols-1 gap-3 rounded-3xl border border-white/40 bg-white/35 p-5 shadow-[0_20px_50px_-25px_rgba(20,17,14,0.35),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl backdrop-saturate-150 sm:grid-cols-2 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <Field
        label="Your name"
        type="text"
        value={name}
        onChange={setName}
        autoComplete="name"
        disabled={status === "sending"}
      />
      <Field
        label="Your email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
        disabled={status === "sending"}
      />
      <label className="flex flex-col gap-1.5 sm:col-span-2">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55">
          What&apos;s on your mind?
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={status === "sending"}
          rows={4}
          placeholder="Tell me about your role, research, or collaboration..."
          className="resize-none rounded-xl border border-ink/15 bg-white/70 px-3 py-2.5 font-sans text-[14px] text-ink placeholder:text-ink/40 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-ink/15 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.06] dark:text-ink dark:placeholder:text-ink/40"
        />
      </label>
      <div className="flex items-center justify-between gap-3 pt-1 sm:col-span-2">
        <span className="font-sans text-[12px] text-ink/55" aria-live="polite">
          {status === "sent"
            ? "Sent — I'll get back to you soon."
            : status === "error"
              ? errorMsg
              : status === "sending"
                ? "Sending…"
                : ""}
        </span>
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-sans text-[13px] font-medium text-cream shadow-[0_10px_25px_-10px_rgba(20,17,14,0.5)] transition-transform hover:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "sent"
            ? "Sent"
            : status === "sending"
              ? "Sending…"
              : "Send message"}
          <Send
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  required,
  disabled,
}: {
  label: string;
  type: "text" | "email";
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        className="rounded-xl border border-ink/15 bg-white/70 px-3 py-2.5 font-sans text-[14px] text-ink placeholder:text-ink/40 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-ink/15 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.06] dark:text-ink dark:placeholder:text-ink/40"
      />
    </label>
  );
}
