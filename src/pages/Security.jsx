import React from 'react';
import { useLang } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { Shield, Users, MapPin, Lock, Eye, Briefcase, Scale } from 'lucide-react';

const sections = {
  en: [
    { icon: Briefcase, title: 'Confidential Handling', text: 'Every project begins with a discreet intake process. Object details, ownership information and project scope are treated as confidential from first contact.' },
    { icon: Shield, title: 'Access Control', text: 'Role-based permissions ensure that each team member, advisor or external partner accesses only the records relevant to their role.' },
    { icon: MapPin, title: 'Sensitive Locations', text: 'On-site projects at private residences, storage facilities and estates follow controlled access protocols with documented chain of custody.' },
    { icon: Lock, title: 'Secure File Practices', text: 'Files are stored in encrypted environments. Sharing is controlled through permission-based links. No casual file transfer or unprotected email attachments.' },
    { icon: Eye, title: 'Collection Privacy', text: 'No collection, object or client reference is published, displayed or used in promotional material without explicit written permission.' },
    { icon: Users, title: 'Staff & Partner Protocol', text: 'Team members and external partners operate under confidentiality agreements. Access is granted on a project-by-project basis.' },
    { icon: Scale, title: 'Insurance and Legal Coordination', text: 'Documentation can be structured to support insurance reviews, legal proceedings and estate coordination through trusted advisors.' },
  ],
  fr: [
    { icon: Briefcase, title: 'Gestion confidentielle', text: 'Chaque projet débute par un processus de prise de contact discret. Les détails des objets, les informations de propriété et la portée du projet sont traités comme confidentiels dès le premier échange.' },
    { icon: Shield, title: 'Contrôle d\'accès', text: 'Des permissions par rôle garantissent que chaque membre de l\'équipe, conseiller ou partenaire externe n\'accède qu\'aux dossiers pertinents pour sa mission.' },
    { icon: MapPin, title: 'Sites sensibles', text: 'Les interventions sur site dans des résidences privées, lieux de stockage et domaines suivent des protocoles d\'accès contrôlé avec chaîne de traçabilité documentée.' },
    { icon: Lock, title: 'Pratiques de sécurité des fichiers', text: 'Les fichiers sont stockés dans des environnements chiffrés. Le partage est contrôlé par des liens sur permission. Aucun transfert informel ni pièce jointe non protégée.' },
    { icon: Eye, title: 'Confidentialité des collections', text: 'Aucune collection, objet ou référence client n\'est publié, affiché ou utilisé dans un support promotionnel sans autorisation écrite explicite.' },
    { icon: Users, title: 'Protocole équipe & partenaires', text: 'Les membres de l\'équipe et partenaires externes opèrent sous accords de confidentialité. L\'accès est accordé projet par projet.' },
    { icon: Scale, title: 'Coordination assurance et juridique', text: 'La documentation peut être structurée pour accompagner des revues d\'assurance, des procédures juridiques et la coordination successorale via des conseillers de confiance.' },
  ],
};

const texts = {
  en: {
    title: 'Discretion is part of the infrastructure',
    trust: 'We do not publish, display or reference private collections without explicit permission.',
  },
  fr: {
    title: 'La discrétion fait partie de l\'infrastructure',
    trust: 'Nous ne publions, montrons ou référençons aucune collection privée sans autorisation explicite.',
  },
};

export default function Security() {
  const { lang } = useLang();
  const tx = texts[lang];
  const secs = sections[lang];
  const [ref, inView] = useInView(0.1);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide max-w-2xl leading-tight mb-16">{tx.title}</h1>

        <div ref={ref} className="max-w-3xl mx-auto space-y-0">
          {secs.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 py-8 border-b border-border/10"
              >
                <div className="shrink-0 w-10 h-10 border border-border/20 flex items-center justify-center">
                  <Icon size={16} strokeWidth={1} className="text-gold/50" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-vellum/80 mb-2">{sec.title}</h3>
                  <p className="text-sm text-dust/60 leading-relaxed font-light">{sec.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust statement */}
        <div className="max-w-3xl mx-auto mt-16 border border-gold/20 p-8 text-center">
          <p className="font-serif text-lg text-vellum/70 italic leading-relaxed">{tx.trust}</p>
        </div>
      </div>
    </div>
  );
}