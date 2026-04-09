import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Heart, Star } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Créativité", desc: "Des idées originales et innovantes pour chaque projet. Nous repoussons les limites de la créativité." },
  { icon: Heart, title: "Proximité", desc: "Une relation de confiance et d'écoute avec chaque client. Votre succès est notre priorité." },
  { icon: Star, title: "Excellence", desc: "Un engagement constant vers la qualité et la perfection dans chaque détail de notre travail." },
];

const team = [
  { name: "Amelle Diop", role: "Directrice Générale", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&q=80" },
  { name: "Ibrahima Fall", role: "Directeur Artistique", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&q=80" },
  { name: "Mariama Ba", role: "Responsable Communication", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&q=80" },
  { name: "Ousmane Sy", role: "Chef de Projet Digital", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80" },
];

const timeline = [
  { year: "2017", title: "Fondation", desc: "Création d'Amelle Com à Dakar avec une vision claire : transformer la communication des entreprises sénégalaises." },
  { year: "2019", title: "Expansion", desc: "Élargissement de nos services au digital et à l'événementiel. Première équipe de 10 collaborateurs." },
  { year: "2021", title: "Reconnaissance", desc: "Plus de 200 clients accompagnés. Partenariats avec des entreprises internationales." },
  { year: "2024", title: "Innovation", desc: "Lancement de notre pôle vidéo et motion design. Nouvelles technologies d'impression." },
];

const APropos = () => {
  useEffect(() => {
    document.title = "À Propos | Amelle Com";
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Qui sommes-nous ?</h1>
            <p className="text-primary-foreground/70 max-w-2xl text-lg">
              Une agence passionnée au service de votre communication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl font-heading font-bold mb-6">Notre Histoire</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fondée en 2017 à Dakar, Amelle Com est née de la volonté de proposer des solutions de communication globales, créatives et accessibles aux entreprises sénégalaises et africaines.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                De l'impression traditionnelle au marketing digital, nous avons su évoluer avec les besoins de nos clients pour devenir une agence de référence dans la sous-région. Notre force réside dans notre capacité à allier créativité locale et standards internationaux.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                  alt="Entrepreneur africain dans un bureau créatif"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-16">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-sm border border-border text-center"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-secondary" size={28} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-16">Notre Équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-heading font-bold text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-16">Notre Parcours</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="text-3xl font-heading font-bold text-secondary flex-shrink-0 w-20">{item.year}</div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;
