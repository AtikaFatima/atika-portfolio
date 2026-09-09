"use client";

import Link from "next/link";
import { Activity, BrainCircuit, ChartNoAxesCombined, HeartPulse, ScanLine, ArrowDownToLine } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/projects";
import { EASE } from "@/lib/motion";

const ICONS = {
  "icu-deterioration": Activity,
  "antidepressant-analysis": BrainCircuit,
  "chest-xray": ScanLine,
  "heart-failure": HeartPulse,
  "heart-health": ChartNoAxesCombined,
};

export default function ProjectLaunchpad() {
  const reduce = useReducedMotion();
  return (
    <section id="work" className="relative w-full px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/55">Selected research</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl lg:text-6xl">Healthcare projects</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/65 sm:text-base">Clinical questions explored through health data, predictive modeling, explainable AI, and accessible visualization.</p>
          </div>
          <Link href="/Atika_Fatima_Resume.pdf" target="_blank" className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream">
            Download resume <ArrowDownToLine className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = ICONS[project.id as keyof typeof ICONS] ?? Activity;
            return (
              <motion.article key={project.id} initial={reduce ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduce ? undefined : { y: -8 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }} className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-cream-deep/55 p-7 shadow-[0_22px_55px_-40px_rgba(42,37,32,0.65),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]">
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100 dark:opacity-40" style={{ background: `radial-gradient(circle at 12% 5%, ${project.accent}55 0%, ${project.accent}15 35%, transparent 68%)` }} />
                <div className="relative flex items-start justify-between">
                  <span className="flex size-16 items-center justify-center rounded-2xl border border-white/40 bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                    <Icon className="size-7 text-ink" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink/50">Research project</span>
                </div>
                <div className="relative mt-auto pt-12">
                  <h3 className="font-display text-2xl uppercase tracking-tight text-ink sm:text-3xl">{project.name}</h3>
                  <p className="mt-2 font-serif text-lg italic text-ink/70">{project.tagline}</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink/70">{project.description}</p>
                  <ul className="mt-5 space-y-1.5">
                    {project.highlights.map((item) => <li key={item} className="flex items-start gap-2 text-[12px] leading-relaxed text-ink/65"><span className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ backgroundColor: project.accent }} />{item}</li>)}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-ink/10 pt-4">
                    {project.tech.map((tech) => <span key={tech} className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[10px] font-medium text-ink/65">{tech}</span>)}
                  </div>
                  {project.authors ? <p className="mt-4 text-[11px] leading-relaxed text-ink/55">{project.authors}</p> : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
