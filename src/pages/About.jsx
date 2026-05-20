import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { ArrowRight, MapPin } from 'lucide-react';

const texts = {
  en: {
    title: 'Built for the quiet work behind important collections',
    mission: 'LumenVault Archives exists to help institutions and private stewards preserve the information that gives objects continuity.',
    philosophy: [
      'The original remains irreplaceable.',
      'Documentation protects continuity.',
      'Access must be controlled.',
      'Preservation is a long-term discipline.',
    ],
    teamTitle: 'Team roles',
    roles: ['Conservation Imaging Lead', '3D Capture Specialist', 'Metadata Architect', 'Vault Systems Manager', 'Collection Assessment Director', 'Confidential Projects Coordinator'],
    values: ['Discretion', 'Precision', 'Continuity', 'Respect', 'Clarity'],
    valuesTitle: 'Values',
    locationsTitle: 'Studio locations',
    locations: [
      { city: 'Geneva', desc: 'Headquarters and vault operations' },
      { city: 'Paris', desc: 'Conservation imaging studio' },
      { city: 'London', desc: 'Mobile scanning unit' },
    ],
    cta: 'Speak with the collection team',
  },
  fr: {
    title: 'Conçu pour le travail discret derrière les collections importantes',
    mission: 'LumenVault Archives accompagne institutions et détenteurs privés dans la préservation des informations qui assurent la continuité des objets.',
    philosophy: [
      'L\'original reste irremplaçable.',
      'La documentation protège la continuité.',
      'L\'accès doit être contrôlé.',
      'La préservation est une discipline de long terme.',
    ],
    teamTitle: 'Rôles de l\'équipe',
    roles: ['Responsable imagerie conservation', 'Spécialiste capture 3D', 'Architecte métadonnées', 'Responsable systèmes coffre', 'Directeur évaluation de collections', 'Coordinateur projets confidentiels'],
    values: ['Discrétion', 'Précision', 'Continuité', 'Respect', 'Clarté'],
    valuesTitle: 'Valeurs',
    locationsTitle: 'Studios',
    locations: [
      { city: 'Genève', desc: 'Siège et opérations coffre' },
      { city: 'Paris', desc: 'Studio d\'imagerie conservation' },
      { city: 'Londres', desc: 'Unité mobile de scan' },
    ],
    cta: 'Échanger avec l\'équipe collection',
  },
};

export default function About() {
  const { lang } = useLang();
  const tx = texts[lang];
  const [ref, inView] = useInView(0.1);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide max-w-3xl leading-tight mb-8">{tx.title}</h1>
        <p className="text-sm text-dust/70 max-w-xl mb-20 font-light leading-relaxed">{tx.mission}</p>

        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Philosophy */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-6">
              {tx.philosophy.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-l-2 border-gold/20 pl-5 py-2"
                >
                  <p className="font-serif text-lg text-vellum/70 italic">{p}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="mb-20">
            <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/50 mb-8">{tx.locationsTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {tx.locations.map((loc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <MapPin size={14} strokeWidth={1} className="text-gold/40 mt-1 shrink-0" />
                  <div>
                    <p className="font-serif text-base text-vellum/80">{loc.city}</p>
                    <p className="text-[11px] text-dust/50 mt-1">{loc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team roles */}
          <div className="mb-20">
            <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/50 mb-8">{tx.teamTitle}</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {tx.roles.map((role, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border/10">
                  <span className="font-mono text-[9px] text-dust/30">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-dust/60">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/50 mb-8">{tx.valuesTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {tx.values.map((v, i) => (
                <span key={i} className="px-4 py-2 border border-border/20 font-serif text-sm text-vellum/60">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-3 border border-gold/40 text-gold text-[11px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-500"
            >
              {tx.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}