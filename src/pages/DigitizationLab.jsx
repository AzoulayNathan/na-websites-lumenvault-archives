import React, { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { PackageOpen, Lightbulb, ScanSearch, Box, FileCheck2, Upload } from 'lucide-react';

const steps = {
  en: [
    { icon: PackageOpen, title: 'Intake', text: 'Every object begins with a handling and documentation plan.' },
    { icon: Lightbulb, title: 'Controlled Imaging', text: 'Calibrated lighting, resolution standards, scale reference and color control for archival-grade capture.' },
    { icon: ScanSearch, title: 'Detail Capture', text: 'Surface details, inscriptions, signatures, damage marks and material texture documented at high resolution.' },
    { icon: Box, title: '3D Capture', text: 'Object geometry through rotational capture, structured light scanning and model processing.' },
    { icon: FileCheck2, title: 'File Validation', text: 'Naming conventions, format standards, backup verification and technical review before delivery.' },
    { icon: Upload, title: 'Delivery', text: 'Vault upload, structured reports and download packages delivered to authorized recipients.' },
  ],
  fr: [
    { icon: PackageOpen, title: 'Réception', text: 'Chaque objet commence par un plan de manipulation et de documentation.' },
    { icon: Lightbulb, title: 'Imagerie contrôlée', text: 'Éclairage calibré, normes de résolution, référence d\'échelle et contrôle couleur pour une capture de niveau archivistique.' },
    { icon: ScanSearch, title: 'Capture de détails', text: 'Détails de surface, inscriptions, signatures, marques de dommages et textures de matériaux documentés en haute résolution.' },
    { icon: Box, title: 'Capture 3D', text: 'Géométrie de l\'objet par capture rotationnelle, scan par lumière structurée et traitement du modèle.' },
    { icon: FileCheck2, title: 'Validation des fichiers', text: 'Conventions de nommage, normes de format, vérification de sauvegarde et revue technique avant livraison.' },
    { icon: Upload, title: 'Livraison', text: 'Dépôt en coffre, rapports structurés et packs de téléchargement transmis aux destinataires autorisés.' },
  ],
};

const objectTypes = {
  en: ['Painting', 'Sculpture', 'Manuscript', 'Ceramic', 'Jewelry', 'Design object'],
  fr: ['Peinture', 'Sculpture', 'Manuscrit', 'Céramique', 'Bijou', 'Objet de design'],
};

const protocols = {
  en: [
    'Multi-angle controlled lighting · Flat-bed or wall-mount positioning · Color calibration target · Raking light for surface texture',
    'Turntable rotational capture · Structured light scanning · Multi-angle geometry · Surface texture mapping',
    'Flat-bed with glass stabilization · Transmitted and reflected light · Page-edge and binding documentation · Inscription detail capture',
    'Directional light with soft diffusion · Surface glaze documentation · Interior and base imaging · Scale reference markers',
    'Macro-focus under controlled environment · Reflective surface handling · Multiple magnification levels · Stone and setting detail',
    'Multi-angle studio capture · Material and finish documentation · Scale and proportion references · Detail of joints and mechanisms',
  ],
  fr: [
    'Éclairage contrôlé multi-angle · Positionnement à plat ou mural · Mire de calibration couleur · Lumière rasante pour texture de surface',
    'Capture rotationnelle sur plateau · Scan par lumière structurée · Géométrie multi-angle · Cartographie de texture de surface',
    'Support à plat avec stabilisation verre · Lumière transmise et réfléchie · Documentation tranche et reliure · Capture détaillée des inscriptions',
    'Éclairage directionnel à diffusion douce · Documentation des glaçures · Imagerie intérieure et de la base · Marqueurs de référence d\'échelle',
    'Macro-focus en environnement contrôlé · Gestion des surfaces réfléchissantes · Niveaux de grossissement multiples · Détail des pierres et sertissages',
    'Capture studio multi-angle · Documentation des matériaux et finitions · Références d\'échelle et proportion · Détail des joints et mécanismes',
  ],
};

const labels = {
  en: { title: 'The Digitization Lab', sub: 'Behind the record, there is a protocol. Each object type requires specific handling, lighting and capture methods.', protocol: 'Capture Protocol Viewer', select: 'Select object type', recommended: 'Recommended protocol' },
  fr: { title: 'Le laboratoire de numérisation', sub: 'Derrière le dossier, il y a un protocole. Chaque type d\'objet exige une manipulation, un éclairage et des méthodes de capture spécifiques.', protocol: 'Protocole de capture', select: 'Type d\'objet', recommended: 'Protocole recommandé' },
};

export default function DigitizationLab() {
  const { lang } = useLang();
  const lb = labels[lang];
  const stps = steps[lang];
  const objTypes = objectTypes[lang];
  const protos = protocols[lang];
  const [selectedObj, setSelectedObj] = useState(0);
  const [ref, inView] = useInView(0.1);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide max-w-2xl leading-tight mb-4">
          {lb.title}
        </h1>
        <p className="text-sm text-dust/60 max-w-xl mb-20 font-light leading-relaxed">{lb.sub}</p>

        {/* Lab bench timeline */}
        <div ref={ref} className="relative mb-24">
          {/* Horizontal line */}
          <div className="absolute top-14 left-0 right-0 h-px bg-border/20 hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 border border-border/30 flex items-center justify-center mb-4 bg-background relative z-10 group-hover:border-conservation/40 transition-colors duration-500">
                    <Icon size={18} strokeWidth={1} className="text-dust/50 group-hover:text-conservation transition-colors duration-500" />
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.15em] text-gold/40 mb-2">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-sm text-vellum/80 mb-2">{step.title}</h3>
                  <p className="text-[11px] text-dust/50 leading-relaxed font-light">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Capture Protocol Viewer */}
        <div className="border border-border/15 max-w-3xl mx-auto">
          <div className="p-5 border-b border-border/10 flex items-center gap-3">
            <div className="w-2 h-2 bg-conservation/40" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-conservation/60">{lb.protocol}</span>
          </div>

          <div className="p-6 lg:p-8">
            <p className="font-mono text-[9px] tracking-[0.15em] text-dust/40 uppercase mb-4">{lb.select}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {objTypes.map((type, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedObj(i)}
                  className={`px-4 py-2 text-[11px] tracking-wide border transition-all duration-300 ${
                    selectedObj === i
                      ? 'border-conservation/50 text-conservation bg-conservation/5'
                      : 'border-border/20 text-dust/50 hover:border-border/40'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div>
              <p className="font-mono text-[9px] tracking-[0.15em] text-dust/40 uppercase mb-3">{lb.recommended}</p>
              <motion.p
                key={selectedObj}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-dust/60 leading-relaxed font-light"
              >
                {protos[selectedObj]}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}