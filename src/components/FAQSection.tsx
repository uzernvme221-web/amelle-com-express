import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const BLUE = "#0A1F6E";
const DARK = "#0a1f44";
const WHATSAPP_URL = "https://wa.me/221778403939";

const faqs = [
  {
    q: "Quels services propose Amelle Com ?",
    a: "Amelle Com est une agence dakaroise spécialisée en communication visuelle et objets publicitaires personnalisés. Nous couvrons l'ensemble de la chaîne : Goodies personnalisés (stylos, mugs, t-shirts, sacs) — Supports d'exposition (kakémonos, roll-ups, banderoles) — Impression numérique et offset toutes dimensions — Création d'identité visuelle (logo, charte graphique, branding) — Organisation et habillage d'événements professionnels.",
  },
  {
    q: "Où êtes-vous basés et livrez-vous partout au Sénégal ?",
    a: "Notre agence est implantée à Dakar. Nous assurons la livraison dans toute la capitale ainsi qu'à l'intérieur du Sénégal selon les volumes et délais convenus.",
  },
  {
    q: "Comment passer une commande ?",
    a: "Le processus est simple : (1) Contactez-nous via WhatsApp ou le formulaire en ligne — (2) Partagez votre logo, vos besoins et vos quantités — (3) Recevez un devis détaillé sous 24h ouvrées — (4) Validation, production et livraison.",
  },
  {
    q: "Quels sont les délais de production ?",
    a: "Impression rapide : 24h à 72h (flyers, affiches, kakémonos). Objets personnalisés : 3 à 7 jours ouvrés. Commandes urgentes : solutions express disponibles sur demande.",
  },
  {
    q: "Proposez-vous un service de design graphique ?",
    a: "Oui. Notre studio crée l'ensemble de vos visuels : logo, charte graphique, supports print et digitaux, maquettes prêtes à l'impression. Une solution clé en main pour les entreprises qui souhaitent déléguer toute leur communication visuelle à un seul interlocuteur.",
  },
  {
    q: "Qui sont vos clients typiques ?",
    a: "PME et grandes entreprises sénégalaises et internationales — ONG et organisations humanitaires — Institutions publiques et administrations — Organisateurs de salons, conférences et lancements de produits.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Nous acceptons : Mobile Money (Wave, Orange Money, Free Money) — Virement bancaire — Paiement en espèces à l'agence.",
  },
  {
    q: "Pourquoi choisir Amelle Com plutôt qu'un autre prestataire ?",
    a: "Amelle Com se distingue par une expertise terrain éprouvée, des produits de qualité premium, des délais tenus et un accompagnement personnalisé du brief à la livraison. Nous sommes votre partenaire communication — pas seulement un imprimeur.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto px-4" style={{ maxWidth: 780 }}>
        <div className="text-center mb-10">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 border"
            style={{
              color: BLUE,
              borderColor: BLUE,
              backgroundColor: "rgba(10, 31, 110, 0.1)",
            }}
          >
            Questions fréquentes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Tout savoir sur Amelle Com
          </h2>
          <p className="text-muted-foreground">
            Objets publicitaires & communication visuelle à Dakar, Sénégal
          </p>
          <div
            className="mx-auto mt-6 h-[3px] w-16 rounded-full"
            style={{ backgroundColor: BLUE }}
          />
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden transition-shadow"
                style={isOpen ? { boxShadow: `0 4px 20px -8px ${BLUE}55` } : {}}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-foreground">
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                    style={{
                      backgroundColor: "rgba(10, 31, 110, 0.12)",
                      color: BLUE,
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-5 pb-5 pt-1 text-muted-foreground leading-relaxed border-t"
                      style={{ borderColor: `${BLUE}33` }}
                    >
                      <p className="pt-4">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: DARK }}
        >
          <div className="text-center md:text-left">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
              Prêt à lancer votre projet ?
            </h3>
            <p className="text-sm mt-1" style={{ color: `${BLUE}cc` }}>
              Devis gratuit sous 24h · Livraison Dakar & Sénégal
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-heading font-semibold transition-transform hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: BLUE, color: DARK }}
          >
            Demander un devis →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
