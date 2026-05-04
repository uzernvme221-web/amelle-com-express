import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gift, RectangleVertical, Store, Printer, Globe, Video, Megaphone, CalendarDays,
  Users, Briefcase, Award, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import FAQSection from "@/components/FAQSection";
import AmelleHero from "@/components/AmelleHero";
import serviceGoodies from "@/assets/goodies.png";
import serviceRollups from "@/assets/kakemonos.png";
import serviceSignage from "@/assets/service-signage.jpg";
import servicePrinting from "@/assets/impressions.png";
import serviceWeb from "@/assets/service-web.jpg";
import serviceVideo from "@/assets/service-video.jpg";
import serviceAds from "@/assets/service-ads.jpg";
import serviceEvents from "@/assets/service-events.jpg";
import avatarWoman1 from "@/assets/avatar-woman-1.jpg";
import avatarMan1 from "@/assets/avatar-man-1.jpg";
import avatarWoman2 from "@/assets/avatar-woman-2.jpg";
import clientSonatel from "@/assets/clients/sonatel.png";
import clientOrange from "@/assets/clients/orange.svg";
import clientCheds from "@/assets/clients/cheds.png";
import clientArmee from "@/assets/clients/armee.png";
import clientJet from "@/assets/clients/jet.png";
import clientMarine from "@/assets/clients/marine.jpeg";
import clientInnerWheel from "@/assets/clients/inner-wheel.png";
import clientShell from "@/assets/clients/shell.png";
import clientWesternUnion from "@/assets/clients/western-union.png";
import clientCosec from "@/assets/clients/cosec.png";
import clientDgid from "@/assets/clients/dgid.jpg";
import clientMinistereFamille from "@/assets/clients/ministere-famille.png";
import clientLaposte from "@/assets/clients/laposte.png";
import clientLasa from "@/assets/clients/lasa.svg";
import clientUemoa from "@/assets/clients/uemoa.png";
import clientArsm from "@/assets/clients/arsm.png";
import clientLonase from "@/assets/clients/lonase.webp";
import clientSenelec from "@/assets/clients/senelec.png";

const services = [
  { icon: Gift, title: "Goodies & Objets Publicitaires", desc: "Stylos, mugs, casquettes, clés USB, tote bags personnalisés.", image: serviceGoodies },
  { icon: RectangleVertical, title: "Kakémonos & Roll-ups", desc: "Supports visuels pour vos événements et points de vente.", image: serviceRollups },
  { icon: Store, title: "Enseignes & Façades", desc: "Signalétique extérieure et intérieure, enseignes lumineuses.", image: serviceSignage },
  { icon: Printer, title: "Impression & Printing", desc: "Flyers, brochures, cartes de visite, affiches grand format.", image: servicePrinting },
  { icon: Globe, title: "Création de Sites Web", desc: "Sites vitrine, e-commerce, applications web sur mesure.", image: serviceWeb },
  { icon: Video, title: "Vidéos & Motion Design", desc: "Spots publicitaires, animations, contenus pour réseaux sociaux.", image: serviceVideo },
  { icon: Megaphone, title: "Publicité & Campagnes", desc: "Stratégie de marque, campagnes digitales et traditionnelles.", image: serviceAds },
  { icon: CalendarDays, title: "Organisation d'Événements", desc: "Événements corporate, lancements de produits, conférences.", image: serviceEvents },
];

const stats = [
  { icon: Clock, value: 20, suffix: "+", label: "Années d'expérience" },
  { icon: Users, value: 200, suffix: "+", label: "Clients satisfaits" },
  { icon: Briefcase, value: 500, suffix: "+", label: "Projets livrés" },
];

const testimonials = [
  { name: "Fatou Diallo", company: "TechSen Solutions", quote: "Amelle Com a transformé notre image de marque. Un travail remarquable et un professionnalisme exemplaire.", avatar: avatarWoman1 },
  { name: "Moussa Ndiaye", company: "Dakar Logistics", quote: "De la conception à la livraison, l'équipe a su répondre à toutes nos attentes avec créativité et rigueur.", avatar: avatarMan1 },
  { name: "Aminata Sow", company: "SenBeauty", quote: "Notre site web et nos supports de communication sont exceptionnels. Je recommande vivement Amelle Com.", avatar: avatarWoman2 },
];

const featuredProjects = [
  { title: "Branding TechSen", tag: "Identité Visuelle", image: serviceAds },
  { title: "Site Web SenBeauty", tag: "Web Design", image: serviceWeb },
  { title: "Événement Dakar Summit", tag: "Événement", image: serviceEvents },
];

const marqueeItems = ["Impression", "Signalétique", "Goodies", "Web Design", "Vidéo", "Événements", "Branding", "Roll-ups", "Motion Design", "Campagnes"];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-secondary">{count}{suffix}</div>;
}

function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className ?? ""} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      />
    </div>
  );
}

const Index = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <CinematicHero />

      {/* Marquee */}
      <div className="bg-secondary py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-secondary-foreground font-heading font-semibold text-lg">
              {item} ·
            </span>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Nos Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une gamme complète de solutions pour propulser votre communication.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <LazyImage src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary flex items-center justify-center mb-3 transition-all duration-300">
                    <service.icon className="text-primary group-hover:text-primary-foreground transition-colors" size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base mb-1.5">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
            Pourquoi <span className="text-secondary">Amelle Com</span> ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="mx-auto mb-3 text-secondary" size={32} />
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Devis CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-foreground mb-4">
            Un projet en tête ? Demandez votre devis
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
            Parlez-nous de votre besoin et recevez une proposition personnalisée sous 24h.
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-semibold">
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>
      </section>

      {/* Client Logos - Carousel */}
      <section className="py-16 bg-muted overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h3 className="text-center text-muted-foreground font-heading font-semibold">Ils nous font confiance</h3>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-muted to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-muted to-transparent z-10" />
          <div className="flex w-max animate-marquee gap-16 items-center">
            {(() => {
              const list = [
                { src: clientSonatel, alt: "Sonatel" },
                { src: clientOrange, alt: "Orange" },
                { src: clientCheds, alt: "CHEDS" },
                { src: clientArmee, alt: "État-Major Général des Armées Sénégalaises" },
                { src: clientJet, alt: "Jet Contractors" },
                { src: clientMarine, alt: "Marine Nationale Sénégalaise" },
                { src: clientCosec, alt: "COSEC" },
                { src: clientDgid, alt: "Direction Générale des Impôts et des Domaines" },
                { src: clientMinistereFamille, alt: "Ministère de la Famille, de l'Action Sociale et des Solidarités" },
                { src: clientLaposte, alt: "La Poste Sénégal" },
                { src: clientLasa, alt: "LASA" },
                { src: clientUemoa, alt: "UEMOA" },
                { src: clientArsm, alt: "ARSM - Agence pour la Réinsertion Sociale des Militaires" },
                { src: clientLonase, alt: "LONASE - Loterie Nationale Sénégalaise" },
                { src: clientSenelec, alt: "Senelec" },
                { src: clientInnerWheel, alt: "Inner Wheel" },
                { src: clientShell, alt: "Shell" },
                { src: clientWesternUnion, alt: "Western Union" },
              ];
              return [...list, ...list].map((c, i) => (
                <img
                  key={`${c.alt}-${i}`}
                  src={c.src}
                  alt={`Logo ${c.alt}`}
                  loading="lazy"
                  className="h-14 md:h-16 w-auto object-contain shrink-0 hover:scale-110 transition-transform"
                />
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
            Ce que disent nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-sm border border-border"
              >
                <p className="text-muted-foreground italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-heading font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Prêt à booster votre communication ?
            </h2>
            <p className="text-primary-foreground/70 mb-8">
              Contactez-nous dès maintenant pour discuter de votre projet.
            </p>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left" onSubmit={(e) => { e.preventDefault(); }}>
              <Input placeholder="Votre nom" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
              <Input type="email" placeholder="Votre email" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
              <Textarea placeholder="Votre message..." className="sm:col-span-2 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" rows={3} />
              <Button type="submit" className="sm:col-span-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold">
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
