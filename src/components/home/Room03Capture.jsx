import React, { useState } from 'react';
import { useLang, t } from '@/lib/LanguageContext';
import { room03 } from '@/lib/translations';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { Scan, Hand, Camera, Box, Focus, FileCheck } from 'lucide-react';

const stepIcons = [Scan, Hand, Camera, Box, Focus, FileCheck];

export default function Room03Capture() {
  const { lang } = useLang();
  const r = t(room03, lang);
  const [activeStep, setActiveStep] = useState(0);
  const [ref, inView] = useInView(0.2);

  return (
    <section id="room-2" ref={ref} className="relative min-h-screen flex items-center bg-background overflow-hidden">
      <div className="absolute top-8 left-6 lg:left-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold/30">03</span>
      </div>

      {/* Scanning beam effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-conservation/20 to-transparent origin-left"
      />

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-24 lg:py-0">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum leading-tight tracking-wide">
              {r.title}
            </h2>
            <p className="mt-6 text-sm text-dust/70 leading-relaxed max-w-lg mx-auto font-light">
              {r.text}
            </p>
          </motion.div>

          {/* Protocol steps - lab bench */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-border/20 hidden md:block" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-0">
              {r.steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                    onClick={() => setActiveStep(i)}
                    className={`relative flex flex-col items-center text-center group p-4 transition-all duration-500 ${
                      activeStep === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-sm border flex items-center justify-center mb-4 transition-all duration-500 ${
                      activeStep === i
                        ? 'border-conservation/50 bg-conservation/5'
                        : 'border-border/30 group-hover:border-border/50'
                    }`}>
                      <Icon size={18} strokeWidth={1} className={`transition-colors duration-500 ${
                        activeStep === i ? 'text-conservation' : 'text-dust/50'
                      }`} />
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.1em] leading-tight text-dust/70 max-w-[80px]">
                      {step}
                    </span>
                    <span className={`mt-2 font-mono text-[8px] transition-colors duration-300 ${
                      activeStep === i ? 'text-conservation/60' : 'text-dust/20'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}