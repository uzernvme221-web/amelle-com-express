import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const services = [
  "Goodies & Objets Publicitaires",
  "Kakémonos & Roll-ups",
  "Enseignes & Façades",
  "Impression & Printing",
  "Création de Sites Web",
  "Vidéos & Motion Design",
  "Publicité & Campagnes",
  "Organisation d'Événements",
];

const Contact = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Contact | Amelle Com";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Votre message a été envoyé avec succès !");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      <section className="relative pt-32 pb-16 text-primary-foreground">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
          alt="Professionnels africains au bureau"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contactez-nous</h1>
            <p className="text-primary-foreground/70 max-w-2xl text-lg">
              Parlons de votre projet. Nous sommes à votre écoute.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-heading font-bold mb-8">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Nom" required />
                  <Input placeholder="Entreprise" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input type="email" placeholder="Email" required />
                  <Input type="tel" placeholder="Téléphone" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Service concerné" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea placeholder="Votre message..." rows={5} required />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold"
                >
                  {loading ? "Envoi..." : "Envoyer le message"}
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-heading font-bold mb-8">Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground text-sm">Dakar, Sénégal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Téléphone</h3>
                    <p className="text-muted-foreground text-sm">+221 XX XXX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">contact@amellecom.sn</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/221XXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[hsl(142,70%,45%)] text-[hsl(0,0%,100%)] px-6 py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition-opacity w-fit"
                >
                  <MessageCircle size={20} />
                  Discuter sur WhatsApp
                </a>
              </div>

              {/* Map placeholder */}
              <div className="mt-10 aspect-[4/3] rounded-xl bg-muted flex items-center justify-center border border-border">
                <span className="text-muted-foreground font-heading">Google Maps — Dakar, Sénégal</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
