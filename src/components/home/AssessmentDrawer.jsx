import React, { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const collectionTypes = {
  en: ['Museum collection', 'Gallery inventory', 'Private collection', 'Estate collection', 'Auction preparation', 'Foundation archive'],
  fr: ['Collection muséale', 'Inventaire de galerie', 'Collection privée', 'Collection successorale', 'Préparation de vente', 'Archive de fondation'],
};

const concerns = {
  en: ['Digitization', 'Insurance documentation', '3D capture', 'Inventory organization', 'Secure archive', 'Inheritance planning', 'Exhibition records'],
  fr: ['Numérisation', 'Documentation assurance', 'Capture 3D', 'Organisation inventaire', 'Archive sécurisée', 'Planification successorale', 'Dossiers d\'exposition'],
};

const texts = {
  en: {
    title: 'Collection assessment',
    sub: 'Begin with the essentials. We will follow up with appropriate next steps.',
    type: 'Collection type',
    count: 'Approximate objects',
    location: 'Location',
    concern: 'Main concern',
    email: 'Email',
    message: 'Additional notes',
    cta: 'Submit assessment request',
    success: 'Thank you. The LumenVault team will review your request and respond with a discreet next step.',
    confidential: 'Information submitted is treated as confidential intake material.',
  },
  fr: {
    title: 'Évaluation de collection',
    sub: 'Commencez par l\'essentiel. Nous reviendrons avec les étapes les plus adaptées.',
    type: 'Type de collection',
    count: 'Nombre approximatif d\'objets',
    location: 'Localisation',
    concern: 'Besoin principal',
    email: 'Email',
    message: 'Notes complémentaires',
    cta: 'Envoyer la demande d\'évaluation',
    success: 'Merci. L\'équipe LumenVault analysera votre demande et reviendra vers vous avec une prochaine étape discrète.',
    confidential: 'Les informations transmises sont traitées comme éléments confidentiels.',
  },
};

const objectCounts = ['1–10', '10–50', '50–250', '250+'];

export default function AssessmentDrawer() {
  const { lang } = useLang();
  const tx = texts[lang];
  const types = collectionTypes[lang];
  const cnrns = concerns[lang];
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView(0.2);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="bg-background border-t border-border/20 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Archival drawer label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 border border-gold/40" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/60">
              {tx.title}
            </span>
            <div className="flex-1 h-px bg-border/20" />
          </div>

          <p className="text-sm text-dust/60 mb-10 font-light">
            {tx.sub}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gold/20 p-8 text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-gold/60 mx-auto mb-4" />
              <p className="font-serif text-lg text-vellum/80">{tx.success}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">
                    {tx.type}
                  </label>
                  <Select>
                    <SelectTrigger className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11">
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">
                    {tx.count}
                  </label>
                  <Select>
                    <SelectTrigger className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11">
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      {objectCounts.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">
                    {tx.location}
                  </label>
                  <Input className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">
                    {tx.concern}
                  </label>
                  <Select>
                    <SelectTrigger className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11">
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      {cnrns.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">
                  {tx.email}
                </label>
                <Input type="email" className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11" />
              </div>

              <div>
                <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">
                  {tx.message}
                </label>
                <Textarea className="bg-secondary/30 border-border/20 text-vellum/80 text-sm min-h-[80px]" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <p className="font-mono text-[9px] text-dust/30 max-w-xs">
                  {tx.confidential}
                </p>
                <button
                  type="submit"
                  className="group flex items-center gap-3 px-7 py-3 border border-gold/50 text-gold text-[11px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-500 shrink-0"
                >
                  {tx.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}