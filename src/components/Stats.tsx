"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

type Stat = {
  /** Target numeric value used for the count-up. */
  to: number;
  /** Optional suffix appended to the rendered number ("+", "K", etc.). */
  suffix?: string;
  /** Optional prefix ("$", etc.). */
  prefix?: string;
  label: string;
};

const stats: Stat[] = [
  { to: 4, suffix: ".0", label: "Graduate GPA\nat George Mason" },
  { to: 1700, suffix: "+", label: "Patient records\nanalyzed" },
  { to: 91, suffix: "%", label: "Precision in ICU\ndeterioration model" },
  { to: 30, suffix: "%", label: "Patient wait-time\nreduction" },
];

export default function Stats() {
  return (
    <section className="relative w-full px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 border-t border-ink/15 px-1 pt-16 sm:px-2 md:gap-x-12 lg:grid-cols-4 lg:px-4 xl:gap-x-16">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, stat.to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, stat.to, delay, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="min-w-0 px-1 flex flex-col gap-3 sm:px-2"
    >
      <span className="flex items-baseline whitespace-nowrap font-display text-[clamp(44px,5.2vw,88px)] leading-none tracking-[-0.04em] text-ink">
        {stat.prefix ? <span>{stat.prefix}</span> : null}
        <motion.span>{rounded}</motion.span>
        {stat.suffix ? (
          <span className={stat.suffix === ".0" ? "" : "ml-[0.04em] text-[0.72em]"}>
            {stat.suffix}
          </span>
        ) : null}
      </span>
      <span className="whitespace-pre-line text-[13px] uppercase tracking-[0.15em] text-ink/55">
        {stat.label}
      </span>
    </motion.div>
  );
}
