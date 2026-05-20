import React, { useState } from 'react';
import { useLang, t } from '@/lib/LanguageContext';
import { room01 } from '@/lib/translations';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';

const labelPositions = [
  { top: '15%', left: '20%' },
  { top: '25%', right: '18%' },
  { top: '50%', left: '12%' },
  { top: '60%', right: '15%' },
  { top: '75%', left: '25%' },
  { top: '82%', right: '22%' },
];

export default function Room01Object() {
  const { lang } = useLang();
  const r = t(room01, lang);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [ref, inView] = useInView(0.3);

  return (
    <section id="room-0" ref={ref} className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Room number */}
      <div className="absolute top-8 left-6 lg:left-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold/30">01</span>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum leading-tight tracking-wide">
              {r.title}
            </h2>
            <p className="mt-6 text-sm text-dust/70 leading-relaxed max-w-md font-light">
              {r.text}
            </p>
            <div className="mt-8 h-px w-16 bg-gold/30" />
          </motion.div>

          {/* Object with metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative aspect-[3/4] max-w-md mx-auto w-full"
          >
            {/* Object silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 300 400" className="w-full h-full max-w-[250px] text-gold/[0.08]">
                <ellipse cx="150" cy="160" rx="70" ry="100" fill="currentColor" />
                <rect x="110" y="260" width="80" height="12" rx="2" fill="currentColor" />
                <rect x="125" y="272" width="50" height="60" rx="1" fill="currentColor" />
              </svg>
            </div>

            {/* Metadata hotspot labels */}
            {r.labels.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                className="absolute"
                style={labelPositions[i]}
                onMouseEnter={() => setHoveredLabel(i)}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <div className={`flex items-center gap-2 cursor-pointer transition-all duration-500 ${
                  hoveredLabel === i ? 'opacity-100' : 'opacity-50'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full border transition-colors duration-300 ${
                    hoveredLabel === i ? 'border-gold bg-gold' : 'border-gold/40'
                  }`} />
                  <span className={`font-mono text-[10px] tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${
                    hoveredLabel === i ? 'text-gold' : 'text-dust/60'
                  }`}>
                    {label}
                  </span>
                  {hoveredLabel === i && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 24 }}
                      className="h-px bg-gold/40"
                    />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Thin border frame */}
            <div className="absolute inset-4 border border-gold/[0.06]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}