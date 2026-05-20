import React from 'react';
import { useLang, t } from '@/lib/LanguageContext';
import { room04 } from '@/lib/translations';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';

export default function Room04Record() {
  const { lang } = useLang();
  const r = t(room04, lang);
  const [ref, inView] = useInView(0.2);

  return (
    <section id="room-3" ref={ref} className="relative min-h-screen flex items-center bg-archive-black overflow-hidden">
      <div className="absolute top-8 left-6 lg:left-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold/30">04</span>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Dossier interface */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <div className="border border-border/20 bg-secondary/30 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-gold/40" />
                <span className="font-mono text-[9px] tracking-[0.25em] text-gold/50 uppercase">
                  {lang === 'en' ? 'Collection Record' : 'Dossier de collection'}
                </span>
              </div>

              <div className="space-y-0">
                {r.fields.map((field, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    className="flex items-center border-b border-border/10 py-2.5 group"
                  >
                    <span className="font-mono text-[8px] text-dust/30 w-8 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[11px] text-dust/60 group-hover:text-vellum/80 transition-colors duration-300 tracking-wide">
                      {field}
                    </span>
                    <div className="flex-1 mx-4 border-b border-dotted border-dust/10" />
                    <div className="w-2 h-2 rounded-full border border-dust/20 group-hover:border-gold/40 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum leading-tight tracking-wide">
              {r.title}
            </h2>
            <p className="mt-6 text-sm text-dust/70 leading-relaxed max-w-md font-light">
              {r.text}
            </p>
            <div className="mt-8 h-px w-16 bg-gold/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}