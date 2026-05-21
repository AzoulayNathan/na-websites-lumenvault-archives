import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang, t } from '@/lib/LanguageContext';
import { hero } from '@/lib/translations';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroRoom() {
  const { lang } = useLang();
  const h = t(hero, lang);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-archive-black" />

      {/* Scanning light effect */}
      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        animate={revealed ? { y: '120%', opacity: [0, 0.6, 0.6, 0] } : {}}
        transition={{ duration: 2.8, ease: 'easeInOut' }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        style={{ boxShadow: '0 0 40px 8px hsl(var(--aged-gold) / 0.2)' }}
      />

      {/* Geometric lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute top-20 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />
        <div className="absolute bottom-32 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />
      </div>

      {/* Object silhouette */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 0.06 } : {}}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="400" height="500" viewBox="0 0 400 500" className="text-gold">
          <ellipse cx="200" cy="220" rx="80" ry="120" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="150" y="340" width="100" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="200" y1="100" x2="200" y2="350" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-mono text-[10px] tracking-[0.35em] uppercase text-gold/70 mb-8"
        >
          {h.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-vellum leading-[1.15] tracking-wide whitespace-pre-line"
        >
          {h.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="mt-8 text-sm md:text-base text-dust/80 max-w-xl mx-auto leading-relaxed font-light"
        >
          {h.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/assessment"
            className="group flex items-center gap-3 px-7 py-3 border border-gold/50 text-gold text-[11px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-500"
          >
            {h.cta1}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/vault-platform"
            className="text-[11px] tracking-[0.15em] uppercase text-dust/60 hover:text-vellum/80 transition-colors duration-500 py-3"
          >
            {h.cta2}
          </Link>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mt-16 font-mono text-[9px] tracking-[0.2em] text-dust/30"
        >
          {h.micro}
        </motion.p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}