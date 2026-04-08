import { useState } from "react";
import { ClipboardList } from "lucide-react";
import DevisRapideModal from "./DevisRapideModal";

const FloatingDevisButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-5 py-3 shadow-lg flex items-center gap-2 font-heading font-semibold transition-transform hover:scale-105"
      >
        <ClipboardList size={20} />
        <span className="hidden sm:inline">Devis Rapide</span>
      </button>
      <DevisRapideModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default FloatingDevisButton;
