import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import DevisRapideModal from "./DevisRapideModal";

const navLinks = [
  { label: "Accueil", path: "/" },
  { label: "Services", path: "/services" },
  
  { label: "Réalisations", path: "/realisations" },
  { label: "À Propos", path: "/a-propos" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [devisOpen, setDevisOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const solid = !isHome || scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-background/90 backdrop-blur-lg shadow-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">A</span>
            </div>
            <span className="font-heading font-bold text-xl text-primary">
              Amelle <span className="text-secondary">Com</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => setDevisOpen(true)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold"
            >
              Devis Rapide
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base font-medium py-2 transition-colors ${
                      location.pathname === link.path
                        ? "text-secondary"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  onClick={() => {
                    setDevisOpen(true);
                    setMobileOpen(false);
                  }}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold w-full"
                >
                  Devis Rapide
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <DevisRapideModal open={devisOpen} onOpenChange={setDevisOpen} />
    </>
  );
};

export default Navbar;
