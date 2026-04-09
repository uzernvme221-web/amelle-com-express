import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gift, RectangleVertical, Store, Printer, Globe, Video, Megaphone, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Gift,
    title: "Goodies & Objets Publicitaires",
    desc: "Marquez les esprits avec des objets personnalisés à l'image de votre entreprise. Nous proposons une large gamme de goodies de qualité pour vos événements, campagnes et cadeaux d'entreprise.",
    deliverables: ["Stylos et carnets personnalisés", "Mugs et thermos brandés", "Casquettes et textiles", "Clés USB et gadgets tech", "Tote bags et accessoires"],
    id: "goodies",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80",
  },
  {
    icon: RectangleVertical,
    title: "Kakémonos & Roll-ups",
    desc: "Des supports visuels impactants pour vos salons, événements et points de vente. Impressions haute qualité sur des structures robustes et facilement transportables.",
    deliverables: ["Roll-ups standard et premium", "Kakémonos sur mesure", "X-banners et L-banners", "Structures d'exposition", "Bâches et banderoles"],
    id: "kakemonos",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    icon: Store,
    title: "Enseignes & Façades",
    desc: "Donnez de la visibilité à votre commerce avec une signalétique professionnelle. Nous concevons et installons des enseignes qui reflètent votre identité de marque.",
    deliverables: ["Enseignes lumineuses LED", "Lettres découpées en relief", "Panneaux publicitaires", "Habillage de façade complète", "Totems et pylônes"],
    id: "enseignes",
    image: "https://images.unsplash.com/photo-1528698827591-e625c338dea7?w=800&q=80",
  },
  {
    icon: Printer,
    title: "Impression & Printing",
    desc: "Des impressions de qualité professionnelle pour tous vos supports de communication. Du petit au grand format, nous maîtrisons toutes les techniques d'impression.",
    deliverables: ["Flyers et dépliants", "Brochures et catalogues", "Cartes de visite premium", "Affiches et posters grand format", "Packaging personnalisé"],
    id: "impression",
    image: "https://images.unsplash.com/photo-1588412079929-790b9f593d8e?w=800&q=80",
  },
  {
    icon: Globe,
    title: "Création de Sites Web",
    desc: "Des sites web modernes, performants et optimisés pour convertir vos visiteurs en clients. Nous créons des expériences digitales uniques et adaptées à vos objectifs.",
    deliverables: ["Sites vitrine responsive", "Boutiques e-commerce", "Applications web sur mesure", "Référencement SEO", "Maintenance et hébergement"],
    id: "web",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  },
  {
    icon: Video,
    title: "Vidéos Publicitaires & Motion Design",
    desc: "Racontez votre histoire en images et en mouvement. Nos vidéos captent l'attention et transmettent votre message avec impact et émotion.",
    deliverables: ["Spots publicitaires", "Vidéos corporate", "Animations motion design", "Contenus réseaux sociaux", "Montage et post-production"],
    id: "video",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80",
  },
  {
    icon: Megaphone,
    title: "Publicité & Campagnes d'entreprise",
    desc: "Stratégies publicitaires sur mesure pour maximiser votre visibilité et votre retour sur investissement. Campagnes digitales et traditionnelles.",
    deliverables: ["Stratégie de marque", "Campagnes réseaux sociaux", "Google Ads et Meta Ads", "Affichage urbain", "Relations presse"],
    id: "publicite",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    icon: CalendarDays,
    title: "Organisation d'Événements",
    desc: "De la conception à la réalisation, nous organisons des événements mémorables qui reflètent vos valeurs et marquent les esprits de vos invités.",
    deliverables: ["Événements corporate", "Lancements de produits", "Conférences et séminaires", "Team building", "Décoration et scénographie"],
    id: "evenements",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  },
];

const Services = () => {
  useEffect(() => {
    document.title = "Nos Services | Amelle Com";
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Ce que nous faisons</h1>
            <p className="text-primary-foreground/70 max-w-2xl text-lg">
              De l'impression à l'événementiel, en passant par le digital et la signalétique, Amelle Com vous accompagne dans tous vos projets de communication.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="flex gap-12">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-2">
              <h3 className="font-heading font-bold text-sm text-muted-foreground mb-4 uppercase tracking-wider">Navigation</h3>
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm py-2 px-3 rounded-lg hover:bg-muted transition-colors text-foreground/80 hover:text-secondary"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Service sections */}
          <div className="flex-1 space-y-24">
            {services.map((service, i) => (
              <motion.section
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-center scroll-mt-28`}
              >
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="text-primary" size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.deliverables.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold">
                    <Link to="/contact">Demander un devis</Link>
                  </Button>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
