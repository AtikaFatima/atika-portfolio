"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { EASE } from "@/lib/motion";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const moments = [
  {
    src: "/story/atika-professional.jpeg",
    alt: "Atika Fatima in professional attire",
    title: "From care to systems",
    body: "A clinical foundation shaped how I approach health data: context first, accuracy always, and the person behind the record never out of view.",
    position: "object-center",
    frame: "aspect-[5/4]",
    secondarySrc: "/story/atika-icu-presentation.jpeg",
    secondaryAlt: "Atika Fatima presenting her ICU patient deterioration research poster",
  },
  {
    src: "/story/atika-community-care.jpeg",
    alt: "Atika Fatima participating in community oral health outreach",
    title: "Community care",
    body: "Oral-health outreach reinforced that prevention, trust, and clear communication belong at the center of every health system.",
    position: "object-center",
    frame: "aspect-[15/22]",
    secondarySrc: null,
    secondaryAlt: null,
  },
];

export default function PhotoStory() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="relative w-full px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Beyond the datasets" title="Care, in practice" />
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/70">
          My work begins with the person behind the record, combining a clinical foundation with health informatics, research, and community service.
        </p>

        <div className="mt-14 grid items-start gap-6 md:grid-cols-2">
          {moments.map((moment, i) => (
            <motion.article
              key={moment.src}
              initial={reduce ? false : { opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 shadow-[0_24px_65px_-30px_rgba(20,17,14,0.4)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className={`relative overflow-hidden bg-cream-deep/45 ${moment.frame}`}>
                <Image
                  src={`${BASE_PATH}${moment.src}`}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover ${moment.position} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-7 md:p-8">
                <h3 className="font-display text-xl uppercase tracking-tight text-ink md:text-2xl">{moment.title}</h3>
                <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink/70">{moment.body}</p>
              </div>
              {moment.secondarySrc ? (
                <div className="relative aspect-[3/2] overflow-hidden border-t border-white/50 bg-cream-deep/45">
                  <Image
                    src={`${BASE_PATH}${moment.secondarySrc}`}
                    alt={moment.secondaryAlt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
