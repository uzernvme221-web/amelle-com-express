import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-heading font-bold text-sm">A</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary-foreground">
                Amelle <span className="text-secondary">Com</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Votre communication, notre expertise. Agence de communication globale basée à Dakar, Sénégal.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {[
                { label: "Services", path: "/services" },
                
                { label: "Réalisations", path: "/realisations" },
                { label: "À Propos", path: "/a-propos" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Dakar, Sénégal</li>
              <li>+221 XX XXX XX XX</li>
              <li>contact@amellecom.sn</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: MessageCircle, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © 2025 Amelle Com. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
