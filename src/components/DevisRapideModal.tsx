import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  "Vidéos Publicitaires & Motion Design",
  "Publicité & Campagnes",
  "Organisation d'Événements",
];

interface DevisRapideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DevisRapideModal = ({ open, onOpenChange }: DevisRapideModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      toast.success("Votre demande de devis a été envoyée avec succès !");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Devis Rapide</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Votre nom" required />
          <Input type="email" placeholder="Votre email" required />
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Service concerné" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea placeholder="Décrivez brièvement votre besoin..." rows={3} required />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DevisRapideModal;
