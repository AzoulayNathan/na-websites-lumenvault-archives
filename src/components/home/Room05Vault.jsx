import React, { useState } from 'react';
import { useLang, t } from '@/lib/LanguageContext';
import { room05 } from '@/lib/translations';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { Shield, Lock, Link2, FileText, ClipboardList, Search } from 'lucide-react';

const featureIcons = [Shield, Lock, Link2, FileText, ClipboardList, Search];

export default function Room05Vault() {
  const { lang } = useLang();
  const r = t(room05, lang);
  const [ref, inView] = useInView(0.2);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="room-4" ref={ref} className="relative min-h-screen flex items-center bg-background overflow-hidden">
      <div className="absolute top-8 left-6 lg:left-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold/30">05</span>
      </div>

      {/* Vault door geometry */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 0.04, scale: 1 } : {}}
          transition={{ duration: 2 }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500" className="text-gold">
            <circle cx="250" cy="250" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="150" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <circle cx="250" cy="250" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <line x1="250" y1="50" x2="250" y2="450" stroke="currentColor" strokeWidth="0.25" />
            <line x1="50" y1="250" x2="450" y2="250" stroke="currentColor" strokeWidth="0.25" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-24 lg:py-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum leading-tight tracking-wide">
            {r.title}
          </h2>
          <p className="mt-6 text-sm text-dust/70 leading-relaxed font-light">
            {r.text}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/10 max-w-3xl mx-auto border border-border/10">
          {r.features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-500 ${
                  hovered === i ? 'bg-secondary/50' : 'bg-background'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1}
                  className={`mb-4 transition-colors duration-500 ${
                    hovered === i ? 'text-gold' : 'text-dust/40'
                  }`}
                />
                <span className="font-mono text-[10px] tracking-[0.1em] text-dust/60">
                  {feature}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}