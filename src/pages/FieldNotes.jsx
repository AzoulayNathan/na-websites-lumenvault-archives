import React, { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

const articles = {
  en: [
    { num: 'FN-001', title: 'Why a photograph is not a collection record', category: 'Documentation', time: '6 min', excerpt: 'A photograph captures appearance. A record preserves context, condition, provenance and continuity. Understanding the difference changes how collections are documented.' },
    { num: 'FN-002', title: 'What private collectors should document before a move', category: 'Collection care', time: '8 min', excerpt: 'Relocation is one of the highest-risk moments for a collection. Condition documentation before, during and after a move provides critical reference.' },
    { num: 'FN-003', title: '3D scanning and sculpture condition reference', category: 'Technology', time: '5 min', excerpt: 'Surface detail captured in 3D provides a measurable baseline for condition monitoring that flat photography cannot match.' },
    { num: 'FN-004', title: 'Metadata mistakes that weaken an archive', category: 'Metadata', time: '7 min', excerpt: 'Inconsistent naming, missing fields and uncontrolled vocabularies create long-term problems. Common patterns and how to avoid them.' },
    { num: 'FN-005', title: 'Preparing documentation for insurance review', category: 'Insurance', time: '6 min', excerpt: 'What insurers look for in collection documentation and how to structure files for efficient review and claims support.' },
    { num: 'FN-006', title: 'Digital vaults and controlled access for family collections', category: 'Vault', time: '5 min', excerpt: 'Family collections often involve multiple stakeholders. Controlled access structures protect both records and relationships.' },
  ],
  fr: [
    { num: 'FN-001', title: 'Pourquoi une photographie ne suffit pas à constituer un dossier de collection', category: 'Documentation', time: '6 min', excerpt: 'Une photographie capture l\'apparence. Un dossier préserve le contexte, l\'état, la provenance et la continuité. Comprendre la différence change la façon de documenter les collections.' },
    { num: 'FN-002', title: 'Ce qu\'un collectionneur privé devrait documenter avant un déplacement', category: 'Soin des collections', time: '8 min', excerpt: 'Un déménagement est l\'un des moments les plus risqués pour une collection. La documentation d\'état avant, pendant et après fournit une référence essentielle.' },
    { num: 'FN-003', title: 'Scan 3D et suivi d\'état des sculptures', category: 'Technologie', time: '5 min', excerpt: 'Le détail de surface capturé en 3D fournit une base mesurable pour le suivi d\'état que la photographie à plat ne peut égaler.' },
    { num: 'FN-004', title: 'Les erreurs de métadonnées qui fragilisent une archive', category: 'Métadonnées', time: '7 min', excerpt: 'Nommage incohérent, champs manquants et vocabulaires non contrôlés créent des problèmes à long terme. Schémas courants et comment les éviter.' },
    { num: 'FN-005', title: 'Préparer une documentation pour une revue d\'assurance', category: 'Assurance', time: '6 min', excerpt: 'Ce que les assureurs recherchent dans la documentation de collection et comment structurer les fichiers pour une revue efficace.' },
    { num: 'FN-006', title: 'Coffres numériques et accès contrôlé pour collections familiales', category: 'Coffre', time: '5 min', excerpt: 'Les collections familiales impliquent souvent plusieurs parties prenantes. Des structures d\'accès contrôlé protègent les dossiers et les relations.' },
  ],
};

const texts = {
  en: {
    title: 'Field notes on preservation, records and collection continuity',
    newsletter: 'Receive occasional field notes on collection documentation and digital preservation.',
    placeholder: 'Email address',
    subscribe: 'Subscribe',
  },
  fr: {
    title: 'Notes de terrain sur la préservation, les dossiers et la continuité des collections',
    newsletter: 'Recevez nos notes de terrain sur la documentation de collection et la préservation numérique.',
    placeholder: 'Adresse email',
    subscribe: 'S\'abonner',
  },
};

export default function FieldNotes() {
  const { lang } = useLang();
  const tx = texts[lang];
  const arts = articles[lang];
  const [ref, inView] = useInView(0.1);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide max-w-3xl leading-tight mb-16">{tx.title}</h1>

        <div ref={ref} className="max-w-3xl mx-auto space-y-0">
          {arts.map((art, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group py-8 border-b border-border/15 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="font-mono text-[9px] tracking-[0.2em] text-gold/40">{art.num}</span>
                <span className="font-mono text-[9px] tracking-[0.1em] text-dust/40 uppercase">{art.category}</span>
                <span className="font-mono text-[9px] text-dust/30">{art.time}</span>
              </div>
              <h2 className="font-serif text-xl text-vellum/80 group-hover:text-vellum transition-colors duration-300 mb-3 leading-snug">
                {art.title}
              </h2>
              <p className="text-sm text-dust/50 leading-relaxed font-light">{art.excerpt}</p>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="max-w-xl mx-auto mt-20 border border-border/20 p-8">
          <p className="text-sm text-dust/60 font-light mb-6">{tx.newsletter}</p>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder={tx.placeholder}
              className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-10 flex-1"
            />
            <button className="px-5 h-10 border border-gold/40 text-gold text-[10px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-300 shrink-0">
              {tx.subscribe}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}