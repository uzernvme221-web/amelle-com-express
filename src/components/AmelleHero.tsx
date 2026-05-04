/**
 * AmelleHero.tsx — Premium Hero Section for Amelle Com
 */
import { useEffect, useRef, useCallback, RefObject } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationControls,
} from "framer-motion";
import { Link } from "react-router-dom";

const C = {
  orange: "#FF6521",
  orangeGlow: "rgba(255,101,33,.45)",
  blue: "#1A6EFF",
  blueGlow: "rgba(26,110,255,.40)",
  bg: "#060912",
  bg2: "#0d1120",
  surface: "#111827",
  border: "rgba(255,255,255,.07)",
  text: "#F0F2FF",
  muted: "#6B7A99",
};

/* Fog canvas */
function useFogCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  fogAlphaRef: RefObject<number>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;
    let W = 0, H = 0;

    type Blob = { x: number; y: number; r: number; vx: number; vy: number; ph: number; base: number; kind: number };
    let blobs: Blob[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      blobs = Array.from({ length: 14 }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 160 + Math.random() * 280,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.18,
        ph: Math.random() * Math.PI * 2,
        base: 0.04 + Math.random() * 0.055,
        kind: i < 8 ? 0 : i < 11 ? 1 : 2,
      }));
    };

    const draw = () => {
      const fa = Math.max(0, Math.min(1, fogAlphaRef.current ?? 1));
      ctx.clearRect(0, 0, W, H);
      if (fa <= 0) return;
      t += 0.0025;
      ctx.fillStyle = `rgba(6,9,18,${0.28 * fa})`;
      ctx.fillRect(0, 0, W, H);

      blobs.forEach((b) => {
        b.x += b.vx + Math.sin(t + b.ph) * 0.35;
        b.y += b.vy + Math.cos(t * 0.65 + b.ph) * 0.25;
        if (b.x < -b.r) b.x = W + b.r;
        if (b.x > W + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = H + b.r;
        if (b.y > H + b.r) b.y = -b.r;

        const op = b.base * fa * 2.2;
        const color =
          b.kind === 1
            ? `rgba(255,160,90,${op})`
            : b.kind === 2
            ? `rgba(80,140,255,${op})`
            : `rgba(190,200,230,${op * 1.3})`;

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const vig = ctx.createLinearGradient(0, H * 0.65, 0, H);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, `rgba(6,9,18,${0.25 * fa})`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, H * 0.65, W, H * 0.35);
    };

    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    resize();
    window.addEventListener("resize", resize);
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef, fogAlphaRef]);
}

/* Particles canvas */
function useParticlesCanvas(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let W = 0, H = 0;

    type P = { x: number; y: number; size: number; vx: number; vy: number; op: number; life: number; streak: boolean; slen: number; warm: boolean };
    let pts: P[] = [];

    const make = (): P => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.08 - Math.random() * 0.28,
      op: 0.1 + Math.random() * 0.45,
      life: Math.random(),
      streak: Math.random() > 0.75,
      slen: 10 + Math.random() * 22,
      warm: Math.random() > 0.5,
    });

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.min(90, Math.floor(W / 14));
      pts = Array.from({ length: n }, make);
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.life += 0.004;
        if (p.y < -10 || p.life >= 1) { Object.assign(p, make()); p.y = H + 5; p.life = 0; }
        const alpha = p.op * Math.sin(p.life * Math.PI);
        const rgb = p.warm ? "255,101,33" : "26,110,255";
        if (p.streak) {
          const g = ctx.createLinearGradient(p.x, p.y + p.slen, p.x, p.y);
          g.addColorStop(0, "transparent");
          g.addColorStop(1, `rgba(${rgb},${alpha * 0.55})`);
          ctx.strokeStyle = g; ctx.lineWidth = p.size;
          ctx.beginPath(); ctx.moveTo(p.x, p.y + p.slen); ctx.lineTo(p.x, p.y); ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${rgb},${alpha})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        }
      });
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

/* Printing machine */
function PrintingMachine() {
  return (
    <>
      <style>{`
        @keyframes accentShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes progressFill{0%{width:0%;opacity:0}5%{opacity:1}70%{width:100%;opacity:1}85%,100%{width:100%;opacity:0}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes scanBeam{0%{top:8%;opacity:0}10%{opacity:.8}90%{opacity:.6}100%{top:92%;opacity:0}}
        @keyframes paperOut{0%,8%{height:0;opacity:0}20%{opacity:1}45%,65%{height:64px;opacity:1}90%,100%{height:64px;opacity:0}}
        .roller{animation:spin .7s linear infinite}
        .roller-rev{animation:spin .7s linear infinite reverse}
      `}</style>

      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          width: 420,
          maxWidth: "100%",
          background: `linear-gradient(160deg, ${C.surface}, ${C.bg2})`,
          border: `1px solid ${C.border}`,
        }}
      >
        {/* Accent stripe */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${C.orange}, ${C.blue}, ${C.orange})`,
            backgroundSize: "200% 100%",
            animation: "accentShimmer 4s linear infinite",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div>
            <div className="text-[11px] tracking-[.25em] text-white/50">AMELLE COM</div>
            <div className="text-white font-semibold text-sm">ProPrint X9 Series</div>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: "#00E676", animation: "blink 1.8s infinite" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: C.orange, animation: "blink 2.5s infinite .5s" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: C.blue, animation: "blink 2.1s infinite 1s" }} />
          </div>
        </div>

        {/* Progress */}
        <div className="mx-5 mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${C.orange}, ${C.blue})`,
              animation: "progressFill 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Feed tray */}
        <div className="mx-5 mt-3 h-8 rounded-md bg-white/[.03] border border-white/10 flex items-center px-3 text-[10px] uppercase tracking-widest text-white/40">
          Paper Feed
        </div>

        {/* Core */}
        <div className="mx-5 mt-4 flex items-stretch gap-2">
          {/* Left rollers */}
          <div className="flex flex-col gap-2 justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-white/20 roller" />
            <div className="w-4 h-4 rounded-full border-2 border-white/20 roller-rev" />
          </div>

          {/* Ink module */}
          <div
            className="relative flex-1 rounded-lg p-3 overflow-hidden"
            style={{
              background: `linear-gradient(180deg, rgba(26,110,255,.08), rgba(255,101,33,.06))`,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              className="absolute left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${C.orange}, transparent)`,
                animation: "scanBeam 3s ease-in-out infinite",
              }}
            />
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">CMYK Ink System</div>
            <div className="flex items-end gap-1.5 h-12">
              {[
                [C.blue, 72],
                ["#E91E8C", 88],
                ["#FFD600", 58],
                ["#cccccc", 92],
              ].map(([color, h], i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: color as string,
                    opacity: 0.85,
                    animation: `blink 2s ease-in-out infinite ${i * 0.25}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right rollers */}
          <div className="flex flex-col gap-2 justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-white/20 roller" />
            <div className="w-4 h-4 rounded-full border-2 border-white/20 roller-rev" />
          </div>
        </div>

        {/* Output */}
        <div className="mx-5 mt-3 relative">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Output</div>
          <div className="h-2 rounded-full bg-black/40 border border-white/10" />
          <div
            className="mx-auto mt-1 w-[60%] rounded-sm bg-white/95 overflow-hidden"
            style={{ animation: "paperOut 4.5s ease-in-out infinite" }}
          >
            <div className="px-2 py-1">
              <div className="text-[8px] font-bold" style={{ color: C.orange }}>AMELLE COM</div>
              <div className="mt-1 grid grid-cols-15 gap-[1px]" style={{ gridTemplateColumns: "repeat(15, 1fr)" }}>
                {[100, 60, 80, 100, 45, 75, 100, 50, 90, 100, 60, 40, 80, 100, 55].map((h, i) => (
                  <div key={i} style={{ height: `${h / 14}px`, background: i % 3 === 0 ? C.blue : "#222" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-4 gap-1.5 m-5">
          {["Print", "Copy", "Scan", "Settings"].map((l) => (
            <div
              key={l}
              className="text-[10px] text-center py-1.5 rounded-md text-white/60"
              style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}` }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* Main hero */
export default function AmelleHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const fogAlphaRef = useRef<number>(1);
  const controls = useAnimationControls();

  const { scrollYProgress } = useScroll({ target: heroRef });
  const fogMotion = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const machineY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const hintOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  useEffect(() => fogMotion.on("change", (v) => { fogAlphaRef.current = v; }), [fogMotion]);

  useFogCanvas(fogRef, fogAlphaRef);
  useParticlesCanvas(particlesRef);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 45, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 45, damping: 20 });

  const sceneRotY = useTransform(springX, [-1, 1], [-17, -3]);
  const sceneRotX = useTransform(springY, [-1, 1], [9, -1]);
  const orbOrangeX = useTransform(springX, [-1, 1], [-22, 22]);
  const orbOrangeY = useTransform(springY, [-1, 1], [-15, 15]);
  const orbBlueX = useTransform(springX, [-1, 1], [32, -32]);
  const orbBlueY = useTransform(springY, [-1, 1], [20, -20]);
  const contentX = useTransform(springX, [-1, 1], [7, -7]);
  const contentYMouse = useTransform(springY, [-1, 1], [5, -5]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const hw = window.innerWidth / 2;
    const hh = window.innerHeight / 2;
    rawX.set((e.clientX - hw) / hw);
    rawY.set((e.clientY - hh) / hh);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => { controls.start("visible"); }, [controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: `radial-gradient(ellipse at top, ${C.bg2}, ${C.bg})`, color: C.text }}
    >
      <style>{`
        @keyframes heroScan{0%{top:-1%;opacity:0}5%{opacity:.6}95%{opacity:.3}100%{top:101%;opacity:0}}
      `}</style>

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-[1px] z-[2]"
        style={{
          background: `linear-gradient(90deg, transparent, ${C.orange}, ${C.blue}, transparent)`,
          animation: "heroScan 9s linear infinite",
        }}
      />

      {/* Glow orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 520, height: 520, top: "10%", left: "5%",
          background: `radial-gradient(circle, ${C.orangeGlow}, transparent 70%)`,
          x: orbOrangeX, y: orbOrangeY,
        }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 600, height: 600, bottom: "5%", right: "5%",
          background: `radial-gradient(circle, ${C.blueGlow}, transparent 70%)`,
          x: orbBlueX, y: orbBlueY,
        }}
      />

      {/* Particles */}
      <canvas ref={particlesRef} className="absolute inset-0 z-[3] pointer-events-none" />

      {/* Fog */}
      <canvas ref={fogRef} className="absolute inset-0 z-[10] pointer-events-none" />

      {/* Main grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={controls}
          style={{ x: contentX, y: contentYMouse }}
        >
          <motion.div style={{ y: contentY }}>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-6"
              style={{ background: "rgba(255,255,255,.05)", border: `1px solid ${C.border}`, color: C.muted }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.orange }} />
              Premium Printing Studio · Dakar
            </motion.div>

            <h1 className="font-extrabold leading-[1.05] tracking-tight text-5xl md:text-6xl lg:text-7xl mb-6">
              {["We Print Your", "Brand Into", "Reality"].map((line, i) => (
                <motion.span key={i} variants={fadeUp} className="block">
                  <span
                    style={{
                      backgroundImage:
                        i === 1
                          ? `linear-gradient(90deg, ${C.orange}, ${C.blue})`
                          : `linear-gradient(180deg, #fff, #c9d2ee)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {line}
                  </span>
                </motion.span>
              ))}
            </h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg max-w-md mb-8" style={{ color: C.muted }}>
              Banners, kakemonos, business prints, branding materials — fast, premium quality.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                style={{ background: `linear-gradient(90deg, ${C.orange}, #ff8a4e)`, boxShadow: `0 10px 30px ${C.orangeGlow}` }}
              >
                Demander un devis →
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 rounded-full font-semibold transition-colors"
                style={{ border: `1px solid ${C.border}`, color: C.text, background: "rgba(255,255,255,.03)" }}
              >
                Voir les services
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 max-w-md">
              {[
                ["500+", "Projets livrés"],
                ["48h", "Délai express"],
                ["99%", "Satisfaction"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: C.text }}>{n}</div>
                  <div className="text-xs mt-1" style={{ color: C.muted }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right machine */}
        <motion.div
          className="flex justify-center lg:justify-end"
          style={{ y: machineY, perspective: 1200 }}
        >
          <motion.div
            style={{
              rotateY: sceneRotY,
              rotateX: sceneRotX,
              transformStyle: "preserve-3d",
            }}
          >
            <PrintingMachine />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        style={{ opacity: hintOp, color: C.muted }}
      >
        <div className="text-[10px] uppercase tracking-[.3em]">Scroll to reveal</div>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
