import React from 'react';
import { Link } from 'react-router-dom';
import { useLang, t } from '@/lib/LanguageContext';
import { room06 } from '@/lib/translations';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { ArrowRight } from 'lucide-react';

export default function Room06Legacy() {
  const { lang } = useLang();
  const r = t(room06, lang);
  const [ref, inView] = useInView(0.3);

  return (
    <section id="room-5" ref={ref} className="relative min-h-[80vh] flex items-center bg-archive-black overflow-hidden">
      <div className="absolute top-8 left-6 lg:left-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold/30">06</span>
      </div>

      {/* Fading object into vault */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none hidden lg:block">
        <div className="h-full bg-gradient-to-l from-background/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.03 } : {}}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-gold">
            <rect x="40" y="40" width="120" height="120" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="55" y="55" width="90" height="90" rx="1" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <rect x="70" y="70" width="60" height="60" fill="currentColor" opacity="0.3" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-24">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum leading-tight tracking-wide">
              {r.title}
            </h2>
            <p className="mt-8 text-sm text-dust/70 leading-relaxed font-light">
              {r.text}
            </p>

            <div className="mt-8 h-px w-24 bg-gold/20" />

            <Link
              to="/assessment"
              className="group inline-flex items-center gap-3 mt-10 px-7 py-3 border border-gold/50 text-gold text-[11px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-500"
            >
              {r.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}