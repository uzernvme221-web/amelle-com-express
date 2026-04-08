import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Tous", "Goodies", "Impression", "Signalétique", "Événements"];

const placeholderCatalogues = [
  { id: "1", title: "Catalogue Goodies 2025", category: "Goodies", thumbnail_url: "", pdf_url: "#" },
  { id: "2", title: "Brochure Impression", category: "Impression", thumbnail_url: "", pdf_url: "#" },
  { id: "3", title: "Signalétique Intérieure", category: "Signalétique", thumbnail_url: "", pdf_url: "#" },
  { id: "4", title: "Pack Événementiel", category: "Événements", thumbnail_url: "", pdf_url: "#" },
  { id: "5", title: "Objets Publicitaires Premium", category: "Goodies", thumbnail_url: "", pdf_url: "#" },
  { id: "6", title: "Catalogue Grand Format", category: "Impression", thumbnail_url: "", pdf_url: "#" },
];

const Catalogues = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    document.title = "Nos Catalogues | Amelle Com";
  }, []);

  const filtered = activeCategory === "Tous"
    ? placeholderCatalogues
    : placeholderCatalogues.filter((c) => c.category === activeCategory);

  return (
    <div>
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Nos Catalogues Produits</h1>
            <p className="text-primary-foreground/70 max-w-2xl text-lg">
              Parcourez nos catalogues et découvrez notre gamme complète de produits et services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((catalogue, i) => (
              <motion.div
                key={catalogue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-muted-foreground font-heading">Aperçu</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-1 rounded">{catalogue.category}</span>
                  <h3 className="font-heading font-bold text-lg mt-3 mb-4">{catalogue.title}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-heading">
                      <Eye size={16} className="mr-1" /> Voir
                    </Button>
                    <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading">
                      <Download size={16} className="mr-1" /> Télécharger
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalogues;
