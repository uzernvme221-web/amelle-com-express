import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroAgency from "@/assets/hero-agency.jpg";

/**
 * CinematicHero
 * - Layered parallax (background slow, mid medium, foreground subtle)
 * - Animated fog overlay that fades + un-blurs on scroll
 * - Subtle background zoom on scroll
 * - Reduced effects on mobile / reduced-motion
 */
const CinematicHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
        // distance scrolled into the hero (positive as we scroll down)
        setScrollY(Math.max(0, -top));
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const progress = Math.min(1, scrollY / (vh * 0.6)); // 0 → 1 over ~60vh
  const fogOpacity = Math.max(0, 0.85 - progress * 2.1); // fully gone by ~40%
  const fogBlur = Math.max(0, (1 - progress * 2.5) * (isMobile ? 4 : 10)); // px
  const bgY = scrollY * 0.3;
  const midY = scrollY * 0.6;
  const fgY = scrollY * 0.9;
  const bgScale = 1 + Math.min(0.05, progress * 0.05);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Background layer (slow parallax + zoom) */}
      <div
        className="absolute inset-0 -z-10 will-change-transform"
        style={{
          transform: `translate3d(0, ${bgY}px, 0) scale(${bgScale})`,
          transition: "transform 0.05s linear",
        }}
      >
        <video
          src="/hero-bg.mp4"
          poster={heroAgency}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src={heroAgency}
          alt="Équipe créative africaine au travail dans une agence moderne à Dakar"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* Dark gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-background/90" />
      </div>

      {/* Mid layer — soft glow / light rays (medium parallax) */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: `translate3d(0, ${midY}px, 0)` }}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--secondary) / 0.35) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Fog / brume overlay */}
      {!isMobile || fogOpacity > 0 ? (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            opacity: fogOpacity,
            backdropFilter: `blur(${fogBlur}px)`,
            WebkitBackdropFilter: `blur(${fogBlur}px)`,
            transition: "opacity 0.2s linear",
          }}
          aria-hidden="true"
        >
          <div
            className="absolute -inset-x-1/2 inset-y-0 animate-fog"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%), radial-gradient(ellipse at 70% 60%, rgba(220,225,235,0.45) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.25), rgba(200,210,220,0.15))",
              filter: "blur(20px)",
            }}
          />
        </div>
      ) : null}

      {/* Subtle grain noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Foreground content (subtle parallax) */}
      <div
        className="container mx-auto px-4 relative z-10 py-32 text-center will-change-transform"
        style={{ transform: `translate3d(0, ${fgY * 0.1}px, 0)` }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-primary-foreground drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
          >
            Donnez de la voix <br />à votre{" "}
            <span className="text-secondary">marque.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-primary-foreground/85 mb-8"
          >
            Impression · Signalétique · Goodies · Web · Événements · Vidéo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-semibold shadow-xl"
            >
              <Link to="/services">Nos Services</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-heading font-semibold backdrop-blur-sm"
            >
              <Link to="/contact">Demander un devis</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
