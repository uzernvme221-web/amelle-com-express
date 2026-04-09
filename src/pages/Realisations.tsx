import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const categories = ["Tous", "Web", "Print", "Goodies", "Événements", "Vidéo", "Signalétique"];

const projects = [
  { title: "Site E-commerce ModaSen", client: "ModaSen", category: "Web", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { title: "Brochure Corporate CBAO", client: "CBAO", category: "Print", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80" },
  { title: "Pack Goodies Tech Summit", client: "Tech Summit Dakar", category: "Goodies", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80" },
  { title: "Vidéo Institutionnelle Sonatel", client: "Sonatel", category: "Vidéo", image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80" },
  { title: "Enseigne Lumineuse Auchan", client: "Auchan Sénégal", category: "Signalétique", image: "https://images.unsplash.com/photo-1528698827591-e625c338dea7?w=800&q=80" },
  { title: "Gala Annuel BCEAO", client: "BCEAO", category: "Événements", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80" },
  { title: "Identité Visuelle StartupSen", client: "StartupSen", category: "Print", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80" },
  { title: "Landing Page PayTech", client: "PayTech", category: "Web", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80" },
  { title: "Motion Design Wave Digital", client: "Wave", category: "Vidéo", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80" },
];

const Realisations = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Nos Réalisations | Amelle Com";
  }, []);

  const filtered = activeCategory === "Tous" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Nos Réalisations</h1>
            <p className="text-primary-foreground/70 max-w-2xl text-lg">
              Découvrez une sélection de nos projets les plus emblématiques.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
                onClick={() => setLightboxIdx(i)}
              >
                <img src={project.image} alt={project.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-secondary px-4 py-2 rounded-lg">
                    Voir le projet
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent">
                  <span className="text-xs bg-secondary/80 text-secondary-foreground px-2 py-1 rounded">{project.category}</span>
                  <h3 className="font-heading font-bold text-primary-foreground mt-2">{project.title}</h3>
                  {project.client && (
                    <p className="text-primary-foreground/70 text-sm">{project.client}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightboxIdx(null)}>
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-3xl w-full aspect-[4/3] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIdx]?.image}
                alt={filtered[lightboxIdx]?.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Realisations;
