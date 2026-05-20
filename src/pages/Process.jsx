import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { ArrowRight } from 'lucide-react';

const steps = {
  en: [
    { title: 'Confidential Brief', text: 'We begin with the collection context, sensitivity level and desired outcome.', clientProvides: 'Collection overview, goals, confidentiality requirements.', delivered: 'Preliminary assessment and recommended approach.', timing: '1–2 days' },
    { title: 'Collection Assessment', text: 'Review object types, volume, location, risks and documentation gaps.', clientProvides: 'Existing inventory, site access if needed.', delivered: 'Assessment report with priority map.', timing: '1 week' },
    { title: 'Protocol Design', text: 'Define imaging, scanning, metadata and handling workflow adapted to the collection.', clientProvides: 'Object access, handling preferences.', delivered: 'Capture protocol document.', timing: '3–5 days' },
    { title: 'Capture Session', text: 'Studio, on-site or mobile scanning unit deployed according to protocol.', clientProvides: 'Object availability, site logistics.', delivered: 'Raw capture files, session log.', timing: 'Project-dependent' },
    { title: 'Record Structuring', text: 'Files, naming, metadata and object records organized into coherent architecture.', clientProvides: 'Verification of key details.', delivered: 'Structured digital records.', timing: '1–3 weeks' },
    { title: 'Vault Deployment', text: 'Access levels, private sharing and collection views configured for authorized users.', clientProvides: 'User list and permission preferences.', delivered: 'Active vault with configured access.', timing: '1 week' },
    { title: 'Review and Handover', text: 'Client review, exports, reports and optional training on vault usage.', clientProvides: 'Review feedback.', delivered: 'Final exports, documentation, access credentials.', timing: '3–5 days' },
    { title: 'Continuity Plan', text: 'Updates, new acquisitions, condition changes and future scans integrated into ongoing records.', clientProvides: 'New objects or condition updates.', delivered: 'Updated records and vault entries.', timing: 'Ongoing' },
  ],
  fr: [
    { title: 'Brief confidentiel', text: 'Nous commençons par le contexte de la collection, son niveau de sensibilité et l\'objectif recherché.', clientProvides: 'Vue d\'ensemble de la collection, objectifs, exigences de confidentialité.', delivered: 'Évaluation préliminaire et approche recommandée.', timing: '1 à 2 jours' },
    { title: 'Évaluation de collection', text: 'Examen des types d\'objets, volumes, localisations, risques et lacunes documentaires.', clientProvides: 'Inventaire existant, accès au site si nécessaire.', delivered: 'Rapport d\'évaluation avec carte de priorités.', timing: '1 semaine' },
    { title: 'Conception du protocole', text: 'Définition du workflow d\'imagerie, de scan, de métadonnées et de manipulation adapté à la collection.', clientProvides: 'Accès aux objets, préférences de manipulation.', delivered: 'Document de protocole de capture.', timing: '3 à 5 jours' },
    { title: 'Session de capture', text: 'Unité studio, sur site ou mobile déployée selon le protocole.', clientProvides: 'Disponibilité des objets, logistique du site.', delivered: 'Fichiers de capture bruts, journal de session.', timing: 'Selon projet' },
    { title: 'Structuration des dossiers', text: 'Fichiers, nommage, métadonnées et fiches d\'objets organisés en architecture cohérente.', clientProvides: 'Vérification des informations clés.', delivered: 'Dossiers numériques structurés.', timing: '1 à 3 semaines' },
    { title: 'Déploiement du coffre', text: 'Niveaux d\'accès, partage privé et vues de collection configurés pour les utilisateurs autorisés.', clientProvides: 'Liste des utilisateurs et préférences de permission.', delivered: 'Coffre actif avec accès configuré.', timing: '1 semaine' },
    { title: 'Revue et transfert', text: 'Revue client, exports, rapports et formation optionnelle à l\'utilisation du coffre.', clientProvides: 'Retours de revue.', delivered: 'Exports finaux, documentation, identifiants d\'accès.', timing: '3 à 5 jours' },
    { title: 'Plan de continuité', text: 'Mises à jour, nouvelles acquisitions, changements d\'état et futurs scans intégrés aux dossiers en cours.', clientProvides: 'Nouveaux objets ou mises à jour d\'état.', delivered: 'Dossiers et entrées de coffre mis à jour.', timing: 'Continu' },
  ],
};

const texts = {
  en: { title: 'From object intake to protected record', provides: 'Client provides', delivered: 'Delivered', timing: 'Timeline', cta: 'Plan an assessment call' },
  fr: { title: 'De la réception de l\'objet au dossier protégé', provides: 'Le client fournit', delivered: 'Livré', timing: 'Délai', cta: 'Planifier un échange d\'évaluation' },
};

export default function Process() {
  const { lang } = useLang();
  const tx = texts[lang];
  const stps = steps[lang];
  const [openStep, setOpenStep] = useState(null);
  const [ref, inView] = useInView(0.1);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide max-w-2xl leading-tight mb-16">{tx.title}</h1>

        <div ref={ref} className="max-w-3xl mx-auto">
          {stps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-b border-border/15"
            >
              <button
                onClick={() => setOpenStep(openStep === i ? null : i)}
                className="w-full flex items-center gap-4 py-5 text-left group"
              >
                <span className="font-mono text-[10px] text-gold/40 w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-lg text-vellum/80 flex-1 group-hover:text-vellum transition-colors">{step.title}</span>
                <span className="font-mono text-[10px] text-dust/30">{step.timing}</span>
                <span className={`text-dust/30 text-lg transition-transform duration-300 ${openStep === i ? 'rotate-45' : ''}`}>+</span>
              </button>

              <AnimatePresence>
                {openStep === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-10 space-y-4">
                      <p className="text-sm text-dust/60 font-light leading-relaxed">{step.text}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-1">{tx.provides}</h4>
                          <p className="text-[12px] text-dust/50 font-light">{step.clientProvides}</p>
                        </div>
                        <div>
                          <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-1">{tx.delivered}</h4>
                          <p className="text-[12px] text-dust/50 font-light">{step.delivered}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <div className="mt-12 text-center">
            <Link
              to="/assessment"
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