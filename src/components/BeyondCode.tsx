"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { EASE } from "@/lib/motion";

const credentials = [
  { icon: ShieldCheck, year: "2025 - 2029", title: "Human Subjects & Research Compliance", body: "CITI certifications covering biomedical investigators, conflicts of interest, responsible conduct of research, and social-behavioral human-subject protection." },
  { icon: Stethoscope, year: "2025 - 2027", title: "CPR/AED & First Aid", body: "American Red Cross certification for professional rescuers with first aid." },
  { icon: Award, year: "2025", title: "Academic Excellence", body: "Completed the M.S. in Health Informatics at George Mason University with a 4.0 / 4.0 GPA." },
];

const community = [
  "Dental Health Camp - Chandravathi Charitable Trust",
  "Free Dental Health Camp - Takshashila Public School",
  "School Oral Health Programmes - Kidszee and local schools",
  "Women's Dental Check-Up Camp - St. Francis College for Women",
];

export default function BeyondCode() {
  const reduce = useReducedMotion();
  return (
    <section id="beyond" className="relative w-full px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Trust & service" title="Credentials & Community" />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {credentials.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} initial={reduce ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }} className="rounded-3xl border border-white/40 bg-white/30 p-8 shadow-[0_20px_50px_-25px_rgba(20,17,14,0.35),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between"><Icon className="size-7 text-ink" strokeWidth={1.5} aria-hidden /><span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink/50">{item.year}</span></div>
                <h3 className="mt-8 font-display text-xl uppercase tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/72">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
        <motion.div initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.8, ease: EASE }} className="mt-8 rounded-3xl border border-ink/10 bg-cream-deep/45 p-7 md:p-9">
          <div className="flex items-center gap-3"><HeartHandshake className="size-7 text-ink" strokeWidth={1.5} aria-hidden /><h3 className="font-display text-xl uppercase tracking-tight text-ink">Community oral health</h3></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {community.map((item) => <p key={item} className="border-l border-ink/20 pl-4 text-[14px] leading-relaxed text-ink/70">{item}</p>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
