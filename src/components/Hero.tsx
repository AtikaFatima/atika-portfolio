"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import PortraitMedia from "./PortraitMedia";
import { EASE, INTRO_HANDOFF } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const headlinePlayed = useRef(false);
  const [portraitActive, setPortraitActive] = useState(false);
  const reduce = useReducedMotion();
  const introDelay = reduce ? 0 : INTRO_HANDOFF;

  useEffect(() => {
    const heading = h1Ref.current;
    if (!heading) return;
    gsap.registerPlugin(SplitText);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(heading, {
        type: "lines,chars",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          if (headlinePlayed.current) {
            gsap.set(self.chars, { yPercent: 0 });
            return;
          }
          headlinePlayed.current = true;
          gsap.from(self.chars, { yPercent: 115, duration: 0.9, ease: "expo.out", stagger: 0.025, delay: INTRO_HANDOFF + 0.35 });
        },
      });
      return () => split.revert();
    });
    return () => mm.revert();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const quoteY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewTarget = useTransform(velocity, [-1500, 1500], [4, -4], { clamp: true });
  const skewX = useSpring(skewTarget, { stiffness: 300, damping: 40 });

  return (
    <section ref={sectionRef} id="top" className="relative isolate w-full overflow-hidden pt-24 lg:pt-28">
      <motion.div style={{ opacity: heroOpacity }} className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="relative flex min-h-[80vh] items-center justify-center lg:min-h-[84vh]">
          <motion.div style={{ y: quoteY }} className="pointer-events-none absolute inset-x-[2%] top-[1%] z-30 flex justify-center lg:inset-x-[5%] lg:top-[1%]">
            <motion.p
              aria-hidden={!portraitActive}
              initial={false}
              animate={portraitActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.94 }}
              transition={{ duration: reduce ? 0 : 0.65, ease: EASE }}
              className="max-w-[1200px] text-center font-serif text-[clamp(28px,4.8vw,76px)] italic leading-[1.02] tracking-[-0.025em] text-ink"
            >
              Every data point reflects a life, and every life carries a story worth protecting.
            </motion.p>
          </motion.div>

          <div className="grid w-full items-center lg:grid-cols-[minmax(200px,1fr)_minmax(0,700px)_minmax(200px,1fr)] lg:gap-10 xl:gap-14">
            <div aria-hidden="true" className="hidden lg:block" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: introDelay + 0.1, ease: EASE }}
              style={{ y: portraitY }}
              className="relative z-10 mt-28 aspect-[1.05/1] w-[min(88vw,700px)] justify-self-center lg:mt-32 lg:w-full"
            >
              <motion.div
                className="relative h-full w-full cursor-pointer outline-none focus-visible:rounded-[2rem] focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
                tabIndex={0}
                role="button"
                aria-label="Reveal Atika's perspective on healthcare data"
                aria-expanded={portraitActive}
                animate={{ y: portraitActive ? 60 : 0, scale: portraitActive ? 0.985 : 1 }}
                transition={{ duration: reduce ? 0 : 0.65, ease: EASE }}
                onPointerEnter={(event) => { if (event.pointerType !== "touch") setPortraitActive(true); }}
                onPointerLeave={(event) => { if (event.pointerType !== "touch") setPortraitActive(false); }}
                onPointerUp={(event) => { if (event.pointerType === "touch") setPortraitActive((active) => !active); }}
                onFocus={() => setPortraitActive(true)}
                onBlur={() => setPortraitActive(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setPortraitActive((active) => !active);
                  }
                }}
              >
                <PortraitMedia progress={scrollYProgress} />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: introDelay + 0.95, ease: EASE }} className="relative z-20 hidden min-w-0 self-center pl-2 lg:block xl:pl-4">
              <p className="max-w-[320px] rounded-2xl border border-white/45 bg-white/40 px-4 py-3 text-left text-[13px] leading-relaxed text-ink/85 shadow-[0_10px_28px_-10px_rgba(20,17,14,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/12 dark:bg-white/[0.05]">
                <span className="block pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/45">here&apos;s what I do</span>
                I work at the intersection of healthcare, data, and technology, combining my clinical background with expertise in health informatics, clinical research, and healthcare analytics. I have hands-on skills in SQL, Python, and EHR systems, along with experience using Excel, MATLAB, machine learning, and data visualization to analyze clinical data, improve data quality and workflows, and support better healthcare decisions. I also bring experience in HIPAA compliance, clinical data management, predictive modeling, and healthcare operations, allowing me to turn complex healthcare information into meaningful and actionable insights.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="headline-row relative z-30 mt-10 flex flex-col gap-4 pb-10 lg:mt-16 lg:gap-6 lg:pb-16">
          <motion.div style={{ skewX: reduce ? 0 : skewX }}>
            <h1 ref={h1Ref} className="headline-name max-w-[1400px] font-display leading-[0.9] tracking-[-0.035em] text-ink">
              Hi, I’m Atika Fatima
            </h1>
          </motion.div>
          <motion.h2 initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: introDelay + 0.75, ease: EASE }} className="headline-role max-w-[1100px] font-display leading-[1.05] tracking-tight text-ink">
            Health Informatics professional transforming healthcare data into meaningful insights
          </motion.h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: introDelay + 0.7, ease: EASE }} className="relative z-30 flex flex-col gap-5 pb-12 lg:hidden">
          <p className="max-w-xl text-[14px] leading-relaxed text-ink/80">Health informatics professional with experience in EHR systems, health information management, regulatory compliance, healthcare operations, and clinical research. Skilled in Excel and SQL, with a clinical background that keeps the person behind every record in focus.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
