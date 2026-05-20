import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cases = {
  en: [
    { name: 'Maison Ardent Collection', type: 'Private collection', tags: ['Private collection', 'Insurance'], context: 'A multi-generational family collection of paintings, design objects and inherited works requiring secure inventory.', risk: 'Incomplete records across multiple locations. No unified inventory for estate planning.', intervention: 'High-resolution imaging, metadata records, condition notes and private vault access.', deliverables: 'Structured digital inventory with 240+ object records, secure vault deployment.', outcome: 'Complete collection visibility for estate planning and insurance coordination.' },
    { name: 'Galerie Noirell', type: 'Gallery', tags: ['Gallery', '3D'], context: 'A contemporary gallery preparing digital records for exhibition loans and collector previews.', risk: 'Inconsistent documentation across exhibition cycles. No standardized object files.', intervention: 'Object imaging, private viewing links and exportable artwork dossiers.', deliverables: 'Digital dossier per artwork, secure viewing links, exhibition-ready exports.', outcome: 'Streamlined loan documentation and professional presentation materials.' },
    { name: 'The Halden Museum Archive', type: 'Museum', tags: ['Museum', 'Manuscript'], context: 'A regional museum digitizing a mixed collection of manuscripts, objects and fragile documents.', risk: 'Deteriorating paper-based records. Fragile materials requiring careful handling.', intervention: 'Capture protocol, metadata schema and structured archive delivery.', deliverables: '1,200+ digitized records with full metadata, organized archive structure.', outcome: 'Preserved access to fragile materials without physical handling.' },
    { name: 'Verrier & Co. Auctions', type: 'Auction house', tags: ['Auction', 'Insurance'], context: 'An auction house creating consistent digital documentation for pre-sale review.', risk: 'Inconsistent imagery and documentation quality across sale lots.', intervention: 'Imaging, object records and controlled sharing packs.', deliverables: 'Standardized documentation packs per lot, secure client access links.', outcome: 'Professional pre-sale materials and streamlined condition reporting.' },
    { name: 'Collection Saint-Aubin', type: 'Estate', tags: ['Estate', 'Insurance'], context: 'A private estate clarifying inventory for inheritance planning and insurance.', risk: 'Undocumented objects, unclear provenance chains, no digital records.', intervention: 'Collection assessment, documentation priority map and secure vault.', deliverables: 'Priority assessment report, phased capture plan, vault access.', outcome: 'Clear inventory foundation for legal and insurance coordination.' },
    { name: 'Northwick Sculpture Trust', type: 'Foundation', tags: ['Sculpture', '3D'], context: 'A sculpture foundation commissioning 3D capture and condition reference for selected works.', risk: 'Physical deterioration without baseline records. No 3D documentation.', intervention: '3D scanning, surface detail mapping and conservation reference files.', deliverables: '18 high-resolution 3D models with condition overlay data.', outcome: 'Conservation baseline and digital access for research purposes.' },
  ],
  fr: [
    { name: 'Maison Ardent Collection', type: 'Collection privée', tags: ['Collection privée', 'Assurance'], context: 'Une collection familiale multigénérationnelle de peintures, objets de design et œuvres héritées nécessitant un inventaire sécurisé.', risk: 'Dossiers incomplets répartis sur plusieurs lieux. Aucun inventaire unifié pour la planification successorale.', intervention: 'Imagerie haute résolution, dossiers de métadonnées, notes d\'état et accès au coffre privé.', deliverables: 'Inventaire numérique structuré de 240+ fiches d\'objets, déploiement du coffre sécurisé.', outcome: 'Visibilité complète de la collection pour la planification successorale et la coordination assurantielle.' },
    { name: 'Galerie Noirell', type: 'Galerie', tags: ['Galerie', '3D'], context: 'Une galerie contemporaine préparant des dossiers numériques pour les prêts d\'exposition et les présentations aux collectionneurs.', risk: 'Documentation incohérente entre les cycles d\'exposition. Pas de fiches d\'objets standardisées.', intervention: 'Imagerie d\'objets, liens de visualisation privés et dossiers d\'œuvres exportables.', deliverables: 'Dossier numérique par œuvre, liens de visualisation sécurisés, exports prêts pour exposition.', outcome: 'Documentation de prêt rationalisée et matériaux de présentation professionnels.' },
    { name: 'The Halden Museum Archive', type: 'Musée', tags: ['Musée', 'Manuscrit'], context: 'Un musée régional numérisant une collection mixte de manuscrits, objets et documents fragiles.', risk: 'Dossiers papier en détérioration. Matériaux fragiles nécessitant une manipulation soignée.', intervention: 'Protocole de capture, schéma de métadonnées et livraison d\'archive structurée.', deliverables: '1 200+ dossiers numérisés avec métadonnées complètes, structure d\'archive organisée.', outcome: 'Accès préservé aux matériaux fragiles sans manipulation physique.' },
    { name: 'Verrier & Co. Auctions', type: 'Maison de vente', tags: ['Vente aux enchères', 'Assurance'], context: 'Une maison de vente créant une documentation numérique cohérente pour la revue avant-vente.', risk: 'Qualité d\'imagerie et de documentation incohérente entre les lots de vente.', intervention: 'Imagerie, fiches d\'objets et packs de partage contrôlé.', deliverables: 'Packs de documentation standardisés par lot, liens d\'accès client sécurisés.', outcome: 'Matériaux avant-vente professionnels et constats d\'état rationalisés.' },
    { name: 'Collection Saint-Aubin', type: 'Succession', tags: ['Succession', 'Assurance'], context: 'Une succession privée clarifiant son inventaire pour la planification patrimoniale et l\'assurance.', risk: 'Objets non documentés, chaînes de provenance floues, aucun dossier numérique.', intervention: 'Évaluation de collection, cartographie de priorités documentaires et coffre sécurisé.', deliverables: 'Rapport d\'évaluation prioritaire, plan de capture phasé, accès au coffre.', outcome: 'Base d\'inventaire claire pour la coordination juridique et assurantielle.' },
    { name: 'Northwick Sculpture Trust', type: 'Fondation', tags: ['Sculpture', '3D'], context: 'Une fondation de sculpture commandant des captures 3D et des références d\'état pour des œuvres sélectionnées.', risk: 'Détérioration physique sans référence de base. Aucune documentation 3D.', intervention: 'Scan 3D, cartographie de détail de surface et fichiers de référence conservation.', deliverables: '18 modèles 3D haute résolution avec données d\'état superposées.', outcome: 'Référence de conservation et accès numérique à des fins de recherche.' },
  ],
};

const filterTags = {
  en: ['All', 'Museum', 'Gallery', 'Private collection', 'Auction', 'Estate', 'Sculpture', 'Manuscript', '3D', 'Insurance'],
  fr: ['Tous', 'Musée', 'Galerie', 'Collection privée', 'Vente aux enchères', 'Succession', 'Sculpture', 'Manuscrit', '3D', 'Assurance'],
};

const texts = {
  en: { title: 'Collection scenarios', context: 'Context', risk: 'Risk', intervention: 'Intervention', deliverables: 'Deliverables', outcome: 'Outcome', cta: 'Discuss a similar project' },
  fr: { title: 'Scénarios de collection', context: 'Contexte', risk: 'Risque', intervention: 'Intervention', deliverables: 'Livrables', outcome: 'Résultat', cta: 'Discuter d\'un projet similaire' },
};

export default function Collections() {
  const { lang } = useLang();
  const tx = texts[lang];
  const cs = cases[lang];
  const tags = filterTags[lang];
  const [filter, setFilter] = useState(tags[0]);
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === tags[0] ? cs : cs.filter(c => c.tags.includes(filter));

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide mb-12">{tx.title}</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => { setFilter(tag); setExpanded(null); }}
              className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border transition-all duration-300 ${
                filter === tag ? 'border-gold/50 text-gold bg-gold/5' : 'border-border/20 text-dust/40 hover:border-border/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Archive shelf */}
        <div className="space-y-px">
          <AnimatePresence>
            {filtered.map((c, i) => (
              <motion.div
                key={c.name}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-border/10 bg-secondary/10"
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] text-dust/30 w-4">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="font-serif text-base text-vellum/80 group-hover:text-vellum transition-colors">{c.name}</span>
                      <span className="ml-3 font-mono text-[9px] text-dust/40">{c.type}</span>
                    </div>
                  </div>
                  <span className={`text-dust/30 transition-transform duration-300 text-lg ${expanded === i ? 'rotate-45' : ''}`}>+</span>
                </button>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 grid md:grid-cols-2 gap-6 border-t border-border/10 pt-6 ml-8">
                        {[
                          { label: tx.context, value: c.context },
                          { label: tx.risk, value: c.risk },
                          { label: tx.intervention, value: c.intervention },
                          { label: tx.deliverables, value: c.deliverables },
                          { label: tx.outcome, value: c.outcome },
                        ].map((item, j) => (
                          <div key={j} className={j === 4 ? 'md:col-span-2' : ''}>
                            <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-1.5">{item.label}</h4>
                            <p className="text-[12px] text-dust/60 leading-relaxed font-light">{item.value}</p>
                          </div>
                        ))}
                        <div className="md:col-span-2">
                          <Link
                            to="/contact"
                            className="group inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-gold/70 hover:text-gold transition-colors"
                          >
                            {tx.cta}
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}