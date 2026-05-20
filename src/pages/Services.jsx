import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = {
  en: [
    {
      id: 'imaging',
      title: 'High-Resolution Imaging',
      overview: 'Controlled imaging for artworks, documents, objects and collection records.',
      idealClient: 'Museums, galleries, private collectors needing archival-quality documentation.',
      deliverables: ['Master image files', 'Web-ready files', 'Detail crops', 'Color reference images', 'Condition reference set'],
      timeline: '1–3 weeks depending on collection size',
      confidentiality: 'All imaging sessions follow controlled access protocols. Files are never shared beyond authorized recipients.',
    },
    {
      id: '3d',
      title: '3D Object Scanning',
      overview: 'Structured 3D capture for sculptures, artefacts, design objects and rare collectibles.',
      idealClient: 'Sculpture foundations, auction houses, conservation studios, estates with dimensional objects.',
      deliverables: ['3D model files', 'Viewer-ready assets', 'Measurement references', 'Surface detail documentation'],
      timeline: '2–4 weeks per scanning session',
      confidentiality: '3D files are stored in encrypted vault environments with permission-based access.',
    },
    {
      id: 'metadata',
      title: 'Metadata Architecture',
      overview: 'Collection records designed to be searchable, consistent and export-ready.',
      idealClient: 'Institutions restructuring legacy inventories or building new collection databases.',
      deliverables: ['Metadata schema', 'Object records', 'Controlled vocabularies', 'Import/export formats'],
      timeline: '2–6 weeks depending on collection complexity',
      confidentiality: 'Metadata structures are built within private workspaces. No external indexing.',
    },
    {
      id: 'vault',
      title: 'Secure Digital Vault',
      overview: 'A private access layer for sensitive collection records.',
      idealClient: 'Family offices, estates, private collectors requiring controlled document access.',
      deliverables: ['Private collection workspace', 'Permission structure', 'Secure sharing', 'Report exports'],
      timeline: 'Setup within 1–2 weeks; ongoing access',
      confidentiality: 'Vault access is restricted to named users with role-based permissions.',
    },
    {
      id: 'insurance',
      title: 'Insurance & Condition Documentation',
      overview: 'Documentation packs for valuation, insurance, movement and condition history.',
      idealClient: 'Insurers, advisors, estate planners, collectors preparing for valuation or transit.',
      deliverables: ['Condition reports', 'Valuation image sets', 'Movement documentation', 'Insurance-ready exports'],
      timeline: '1–3 weeks per documentation pack',
      confidentiality: 'Insurance documentation is handled as sensitive financial material.',
    },
    {
      id: 'emergency',
      title: 'Emergency Preservation Planning',
      overview: 'Rapid prioritization for vulnerable collections, estates or relocation scenarios.',
      idealClient: 'Estates in transition, collections facing environmental risk, urgent relocation needs.',
      deliverables: ['Priority assessment', 'Capture schedule', 'Emergency documentation protocol', 'Rapid vault deployment'],
      timeline: 'Assessment within 48 hours; capture project-dependent',
      confidentiality: 'Emergency projects follow highest confidentiality tier by default.',
    },
  ],
  fr: [
    {
      id: 'imaging',
      title: 'Imagerie haute résolution',
      overview: 'Imagerie contrôlée pour œuvres, documents, objets et dossiers de collection.',
      idealClient: 'Musées, galeries, collectionneurs privés nécessitant une documentation de qualité archivistique.',
      deliverables: ['Fichiers images master', 'Fichiers web', 'Recadrages détaillés', 'Images de référence couleur', 'Jeu de référence d\'état'],
      timeline: '1 à 3 semaines selon la taille de la collection',
      confidentiality: 'Toutes les sessions d\'imagerie suivent des protocoles d\'accès contrôlé. Les fichiers ne sont jamais partagés hors des destinataires autorisés.',
    },
    {
      id: '3d',
      title: 'Scan 3D d\'objets',
      overview: 'Capture 3D structurée pour sculptures, artefacts, objets de design et pièces rares.',
      idealClient: 'Fondations de sculpture, maisons de vente, ateliers de conservation, successions avec objets dimensionnels.',
      deliverables: ['Fichiers modèles 3D', 'Assets de visualisation', 'Références de mesure', 'Documentation de détail de surface'],
      timeline: '2 à 4 semaines par session de scan',
      confidentiality: 'Les fichiers 3D sont stockés dans des environnements chiffrés avec accès sur permission.',
    },
    {
      id: 'metadata',
      title: 'Architecture de métadonnées',
      overview: 'Dossiers de collection conçus pour être consultables, cohérents et exportables.',
      idealClient: 'Institutions restructurant des inventaires existants ou construisant de nouvelles bases de données.',
      deliverables: ['Schéma de métadonnées', 'Fiches d\'objets', 'Vocabulaires contrôlés', 'Formats import/export'],
      timeline: '2 à 6 semaines selon la complexité de la collection',
      confidentiality: 'Les structures de métadonnées sont construites dans des espaces de travail privés. Aucune indexation externe.',
    },
    {
      id: 'vault',
      title: 'Coffre numérique sécurisé',
      overview: 'Une couche d\'accès privée pour dossiers de collection sensibles.',
      idealClient: 'Family offices, successions, collectionneurs privés nécessitant un accès documentaire contrôlé.',
      deliverables: ['Espace de travail privé', 'Structure de permissions', 'Partage sécurisé', 'Exports de rapports'],
      timeline: 'Mise en place sous 1 à 2 semaines ; accès continu',
      confidentiality: 'L\'accès au coffre est restreint aux utilisateurs nommés avec permissions par rôle.',
    },
    {
      id: 'insurance',
      title: 'Documentation assurance & état',
      overview: 'Dossiers documentaires pour estimation, assurance, déplacement et suivi d\'état.',
      idealClient: 'Assureurs, conseillers, gestionnaires de patrimoine, collectionneurs préparant une estimation ou un transport.',
      deliverables: ['Constats d\'état', 'Jeux d\'images d\'estimation', 'Documentation de déplacement', 'Exports assurance'],
      timeline: '1 à 3 semaines par dossier documentaire',
      confidentiality: 'La documentation assurance est traitée comme matériel financier sensible.',
    },
    {
      id: 'emergency',
      title: 'Plan de préservation d\'urgence',
      overview: 'Priorisation rapide pour collections vulnérables, successions ou déplacements.',
      idealClient: 'Successions en transition, collections exposées à des risques environnementaux, besoins de relocalisation urgente.',
      deliverables: ['Évaluation prioritaire', 'Planning de capture', 'Protocole de documentation d\'urgence', 'Déploiement rapide du coffre'],
      timeline: 'Évaluation sous 48 heures ; capture selon projet',
      confidentiality: 'Les projets d\'urgence suivent par défaut le niveau de confidentialité le plus élevé.',
    },
  ],
};

const labels = {
  en: { title: 'Services for collections that require discretion and precision', index: 'Service Index', ideal: 'Ideal for', deliverables: 'Deliverables', timeline: 'Timeline', confidentiality: 'Confidentiality', cta: 'Discuss this service' },
  fr: { title: 'Services pour collections exigeant discrétion et précision', index: 'Index des services', ideal: 'Idéal pour', deliverables: 'Livrables', timeline: 'Délais', confidentiality: 'Confidentialité', cta: 'Parler de ce service' },
};

export default function Services() {
  const { lang } = useLang();
  const svc = services[lang];
  const lb = labels[lang];
  const [selected, setSelected] = useState(0);
  const active = svc[selected];

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide max-w-2xl leading-tight mb-16">
          {lb.title}
        </h1>

        <div className="grid lg:grid-cols-[280px_1fr] gap-0 lg:gap-0 border border-border/15">
          {/* Left: index */}
          <div className="border-b lg:border-b-0 lg:border-r border-border/15">
            <div className="p-4 border-b border-border/10">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/50">{lb.index}</span>
            </div>
            {svc.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-5 py-4 border-b border-border/10 flex items-center gap-3 transition-all duration-300 ${
                  selected === i ? 'bg-secondary/40' : 'hover:bg-secondary/20'
                }`}
              >
                <span className="font-mono text-[9px] text-dust/30 w-4">{String(i + 1).padStart(2, '0')}</span>
                <span className={`text-sm transition-colors duration-300 ${
                  selected === i ? 'text-vellum' : 'text-dust/60'
                }`}>
                  {s.title}
                </span>
                {selected === i && <div className="ml-auto w-4 h-px bg-gold/50" />}
              </button>
            ))}
          </div>

          {/* Right: detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 lg:p-12"
            >
              <h2 className="font-serif text-2xl lg:text-3xl text-vellum tracking-wide mb-2">{active.title}</h2>
              <p className="text-sm text-dust/70 leading-relaxed mb-8 font-light max-w-lg">{active.overview}</p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-2">{lb.ideal}</h3>
                  <p className="text-sm text-dust/60 font-light">{active.idealClient}</p>
                </div>

                <div>
                  <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-3">{lb.deliverables}</h3>
                  <ul className="space-y-1.5">
                    {active.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-dust/60">
                        <div className="w-1 h-1 bg-gold/40" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-2">{lb.timeline}</h3>
                    <p className="text-sm text-dust/60 font-light">{active.timeline}</p>
                  </div>
                  <div>
                    <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-2">{lb.confidentiality}</h3>
                    <p className="text-sm text-dust/60 font-light">{active.confidentiality}</p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 mt-4 px-6 py-2.5 border border-gold/40 text-gold text-[10px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-500"
                >
                  {lb.cta}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}