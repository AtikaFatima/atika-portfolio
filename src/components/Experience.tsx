"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

const rows = [
  { years: "Feb 2026 - Present", role: "Insurance Data Intern", org: "Citrus City Family Counseling", summary: "Submitting, tracking, and reconciling insurance claims while maintaining accurate electronic health information, resolving discrepancies, and supporting reimbursement reporting.", tags: ["Claims", "Billing records", "HIPAA", "Excel reporting"] },
  { years: "May 2025 - Present", role: "Research Assistant", org: "George Mason University", summary: "Managing secure healthcare and EHR data, preparing regulatory documentation, conducting quality reviews, and supporting multidisciplinary healthcare research.", tags: ["Healthcare data", "EHR", "Quality assurance", "Compliance"] },
  { years: "Sep 2025 - Nov 2025", role: "Health AI Intern", org: "AI CoLab - Georgetown MedStar Health", summary: "Prepared and validated healthcare data for predictive analytics while documenting healthcare workflows and collaborating with clinicians, researchers, and technical teams.", tags: ["Healthcare systems", "Predictive analytics", "Clinical workflows"] },
  { years: "Jan 2023 - Dec 2023", role: "Dental Surgery Intern", org: "Panineeya Dental Hospital", summary: "Delivered patient-centered dental care, coordinated community camps, and helped improve scheduling and clinical workflows to reduce patient wait times by 30%.", tags: ["Patient care", "Treatment planning", "Clinical operations"] },
  { years: "Jul 2022 - Aug 2022", role: "Volunteer", org: "Indian Dental Association", summary: "Coordinated more than 20 speakers for a major dental show and resolved last-minute program changes to keep the event running smoothly.", tags: ["Event coordination", "20+ speakers", "Community engagement"] },
];

const education = [
  { degree: "Master of Science in Health Informatics", school: "George Mason University", detail: "December 2025 - GPA 4.0 / 4.0" },
  { degree: "Bachelor of Dental Surgery", school: "Panineeya Institute of Dental Sciences and Research Center", detail: "December 2023" },
];

const coursework = [
  "Advanced Statistics in Health Services Research",
  "Computational Tools in Health Informatics",
  "Data Mining in Health Care",
  "Health Care Databases",
  "Health Data Integration",
  "Health Data Vocabulary & Standards",
  "Radiology Informatics",
];

export default function Experience() {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="relative w-full px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Healthcare track record" title="Experience & Education" />
        <div className="relative mt-16 border-l border-ink/15 pl-8 md:pl-12">
          {rows.map((row, i) => (
            <motion.article key={`${row.years}-${row.role}`} initial={reduce ? false : { opacity: 0, x: 24, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }} className="group relative grid gap-4 border-b border-ink/10 py-9 first:pt-0 md:grid-cols-[180px_1fr] md:gap-8">
              <span className="absolute -left-[39px] top-10 size-3 rounded-full border-2 border-cream bg-ink md:-left-[55px]" />
              <span className="text-[13px] font-medium text-ink/55">{row.years}</span>
              <div>
                <h3 className="font-display text-xl uppercase tracking-tight text-ink lg:text-2xl">{row.role}</h3>
                <p className="mt-1 font-serif text-base italic text-ink/65">{row.org}</p>
                <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-ink/72">{row.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {row.tags.map((tag) => <li key={tag} className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/70">{tag}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {education.map((item, i) => (
            <motion.article key={item.degree} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} className="rounded-3xl border border-white/40 bg-white/30 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/50">Education</span>
              <h3 className="mt-3 font-display text-xl uppercase tracking-tight text-ink">{item.degree}</h3>
              <p className="mt-2 font-serif italic text-ink/70">{item.school}</p>
              <p className="mt-3 text-[13px] text-ink/55">{item.detail}</p>
            </motion.article>
          ))}
        </div>
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.7, ease: EASE }} className="mt-5 rounded-3xl border border-ink/10 bg-cream-deep/40 p-7">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/50">Selected graduate coursework</span>
          <ul className="mt-5 flex flex-wrap gap-2">
            {coursework.map((course) => <li key={course} className="rounded-full border border-ink/15 px-3 py-1.5 text-[12px] text-ink/70">{course}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
