import React from 'react';
import { useLang, t } from '@/lib/LanguageContext';
import { room02 } from '@/lib/translations';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';

export default function Room02Risk() {
  const { lang } = useLang();
  const r = t(room02, lang);
  const [ref, inView] = useInView(0.2);

  return (
    <section id="room-1" ref={ref} className="relative min-h-screen flex items-center bg-archive-black overflow-hidden">
      <div className="absolute top-8 left-6 lg:left-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold/30">02</span>
      </div>

      {/* Vertical divider */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/10 hidden lg:block" />

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Left: dark archival zone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="lg:pr-20"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum leading-tight tracking-wide">
              {r.title}
            </h2>
            <p className="mt-6 text-sm text-dust/60 leading-relaxed max-w-md font-light">
              {r.text}
            </p>
          </motion.div>

          {/* Right: risk sequence */}
          <div className="lg:pl-20 space-y-0">
            {r.risks.map((risk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                className="group flex items-center gap-4 py-4 border-b border-border/10 last:border-0"
              >
                <span className="font-mono text-[10px] text-burgundy/60 w-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-2 h-px bg-burgundy/30 group-hover:w-6 group-hover:bg-burgundy/60 transition-all duration-500" />
                <span className="font-serif text-lg md:text-xl text-vellum/70 group-hover:text-vellum transition-colors duration-500 tracking-wide">
                  {risk}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}