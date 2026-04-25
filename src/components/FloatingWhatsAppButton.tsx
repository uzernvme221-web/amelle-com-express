import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "221778403939";
const WHATSAPP_MESSAGE =
  "Bonjour Amelle Com, je souhaite obtenir des informations ou un devis concernant vos services. Merci de me répondre.";

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

const FloatingWhatsAppButton = () => {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-6 left-6 z-40 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white rounded-full px-5 py-3 shadow-lg flex items-center gap-2 font-heading font-semibold transition-transform hover:scale-105 animate-pulse-soft"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsAppButton;
