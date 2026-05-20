import React, { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Image, Box, GitBranch, FileText, Shield } from 'lucide-react';

const tabs = {
  en: [
    { key: 'record', label: 'Record', icon: FileText },
    { key: 'images', label: 'Images', icon: Image },
    { key: '3d', label: '3D', icon: Box },
    { key: 'provenance', label: 'Provenance', icon: GitBranch },
    { key: 'condition', label: 'Condition', icon: Eye },
    { key: 'access', label: 'Access', icon: Shield },
  ],
  fr: [
    { key: 'record', label: 'Dossier', icon: FileText },
    { key: 'images', label: 'Images', icon: Image },
    { key: '3d', label: '3D', icon: Box },
    { key: 'provenance', label: 'Provenance', icon: GitBranch },
    { key: 'condition', label: 'État', icon: Eye },
    { key: 'access', label: 'Accès', icon: Shield },
  ],
};

const tabContent = {
  en: {
    record: { title: 'Object Record', fields: ['Object ID: LV-2024-0847', 'Title: Untitled Bronze Form', 'Artist: —', 'Dimensions: 42 × 18 × 15 cm', 'Material: Patinated bronze', 'Date: c. 1962', 'Location: Private vault, Geneva'] },
    images: { title: 'Image Set', fields: ['Master files: 12 images', 'Resolution: 8192 × 5464 px', 'Color profile: Adobe RGB', 'Detail crops: 6 views', 'Condition reference: 4 images', 'Scale reference: included'] },
    '3d': { title: '3D Model', fields: ['Format: .glb, .obj, .stl', 'Polygon count: 2.4M faces', 'Texture maps: diffuse, normal', 'Scale: 1:1 metric', 'Viewer: embedded preview', 'Last scan: 2024.03.15'] },
    provenance: { title: 'Provenance Chain', fields: ['1962 — Artist studio, Paris', '1968 — Galerie Noirell, Paris', '1975 — Private collection, Zurich', '1992 — Verrier & Co. Auctions', '1992 — Current owner'] },
    condition: { title: 'Condition Notes', fields: ['Surface: minor patina variation on base', 'Structure: stable, no repairs detected', 'Base: light abrasion marks', 'Last assessment: 2024.03.15', 'Assessor: Conservation Imaging Lead', 'Next review: 2025.03'] },
    access: { title: 'Access Permissions', fields: ['Owner: full access', 'Curator: records + images', 'Conservator: condition + 3D', 'Insurer: condition + valuation', 'Advisor: read-only summary', 'Guest: restricted view'] },
  },
  fr: {
    record: { title: 'Fiche objet', fields: ['ID Objet : LV-2024-0847', 'Titre : Forme en bronze sans titre', 'Artiste : —', 'Dimensions : 42 × 18 × 15 cm', 'Matériau : Bronze patiné', 'Date : c. 1962', 'Localisation : Coffre privé, Genève'] },
    images: { title: 'Jeu d\'images', fields: ['Fichiers master : 12 images', 'Résolution : 8192 × 5464 px', 'Profil couleur : Adobe RGB', 'Recadrages détaillés : 6 vues', 'Référence d\'état : 4 images', 'Référence d\'échelle : incluse'] },
    '3d': { title: 'Modèle 3D', fields: ['Format : .glb, .obj, .stl', 'Polygones : 2,4M faces', 'Textures : diffuse, normale', 'Échelle : 1:1 métrique', 'Visualiseur : aperçu intégré', 'Dernier scan : 2024.03.15'] },
    provenance: { title: 'Chaîne de provenance', fields: ['1962 — Atelier de l\'artiste, Paris', '1968 — Galerie Noirell, Paris', '1975 — Collection privée, Zurich', '1992 — Verrier & Co. Auctions', '1992 — Propriétaire actuel'] },
    condition: { title: 'Notes d\'état', fields: ['Surface : légère variation de patine sur la base', 'Structure : stable, aucune réparation détectée', 'Base : légères traces d\'abrasion', 'Dernière évaluation : 2024.03.15', 'Évaluateur : Responsable imagerie conservation', 'Prochaine revue : 2025.03'] },
    access: { title: 'Droits d\'accès', fields: ['Propriétaire : accès complet', 'Conservateur : dossiers + images', 'Restaurateur : état + 3D', 'Assureur : état + estimation', 'Conseiller : résumé en lecture seule', 'Invité : vue restreinte'] },
  },
};

const roles = {
  en: ['Owner', 'Curator', 'Conservator', 'Insurer', 'Advisor', 'Guest'],
  fr: ['Propriétaire', 'Conservateur', 'Restaurateur', 'Assureur', 'Conseiller', 'Invité'],
};

const roleAccess = [
  [true, true, true, true, true, true],
  [true, true, false, true, true, false],
  [true, false, true, false, true, false],
  [false, false, false, false, true, false],
  [true, false, false, false, false, false],
  [true, false, false, false, false, false],
];

const texts = {
  en: {
    title: 'The Vault Platform',
    philosophy: 'Sensitive collection records need more than storage. They need context, permissions and continuity.',
    permTitle: 'Permission Architecture',
    roleLabel: 'Select role to preview access',
    cta: 'Request vault demo',
  },
  fr: {
    title: 'Le coffre numérique',
    philosophy: 'Les dossiers de collection sensibles demandent plus qu\'un stockage. Ils exigent contexte, droits d\'accès et continuité.',
    permTitle: 'Architecture des permissions',
    roleLabel: 'Sélectionnez un rôle pour prévisualiser l\'accès',
    cta: 'Demander une démonstration',
  },
};

export default function VaultPlatform() {
  const { lang } = useLang();
  const tx = texts[lang];
  const tabList = tabs[lang];
  const content = tabContent[lang];
  const [activeTab, setActiveTab] = useState('record');
  const [activeRole, setActiveRole] = useState(0);
  const [ref, inView] = useInView(0.1);

  const active = content[activeTab];
  const roleNames = roles[lang];

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide mb-4">{tx.title}</h1>
        <p className="text-sm text-dust/60 max-w-lg mb-20 font-light leading-relaxed">{tx.philosophy}</p>

        {/* Mock vault interface */}
        <div ref={ref} className="border border-border/15 max-w-4xl mx-auto mb-20">
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-border/10">
            {tabList.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3 text-[11px] tracking-wide border-b-2 transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-gold text-gold'
                      : 'border-transparent text-dust/40 hover:text-dust/60'
                  }`}
                >
                  <Icon size={14} strokeWidth={1} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 lg:p-8"
            >
              <h3 className="font-serif text-lg text-vellum/80 mb-4">{active.title}</h3>
              <div className="space-y-0">
                {active.fields.map((field, i) => (
                  <div key={i} className="flex items-center py-2 border-b border-border/10 last:border-0">
                    <span className="font-mono text-[10px] text-dust/50 tracking-wide">{field}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Role access simulator */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl text-vellum/80 mb-2">{tx.permTitle}</h2>
          <p className="font-mono text-[9px] tracking-[0.15em] text-dust/40 uppercase mb-6">{tx.roleLabel}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {roleNames.map((role, i) => (
              <button
                key={i}
                onClick={() => setActiveRole(i)}
                className={`px-4 py-2 text-[11px] tracking-wide border transition-all duration-300 ${
                  activeRole === i
                    ? 'border-gold/50 text-gold bg-gold/5'
                    : 'border-border/20 text-dust/40 hover:border-border/40'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/10 border border-border/10">
            {tabList.map((tab, i) => {
              const hasAccess = roleAccess[activeRole][i];
              const Icon = tab.icon;
              return (
                <div
                  key={tab.key}
                  className={`p-5 flex items-center gap-3 transition-all duration-500 ${
                    hasAccess ? 'bg-secondary/30' : 'bg-background opacity-30'
                  }`}
                >
                  <Icon size={16} strokeWidth={1} className={hasAccess ? 'text-gold/60' : 'text-dust/20'} />
                  <span className={`text-[11px] ${hasAccess ? 'text-vellum/70' : 'text-dust/30 line-through'}`}>
                    {tab.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
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