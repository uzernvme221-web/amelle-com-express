
# Amelle Com — Full Marketing Website

## Brand Setup
- Colors: Deep Electric Blue (#0A1F6E), Vibrant Orange (#F76C1B), White, Light Grey (#F4F4F4)
- Typography: Google Fonts — **Syne** (headings) + **DM Sans** (body)
- Tagline: "Votre communication, notre expertise."
- All text in French

## Global Components

### Navbar (sticky, glassmorphism on scroll)
- Logo "Amelle Com" (Syne bold) with blue/orange geometric mark
- Links: Accueil, Services, Catalogues, Réalisations, À Propos, Contact
- "Devis Rapide" orange CTA button
- Mobile hamburger → slide-in drawer

### Footer (dark blue #0A1F6E background)
- Logo, tagline, quick links, social icons (Facebook, Instagram, LinkedIn, WhatsApp)
- Address: Dakar, Sénégal | © 2025

### Floating "Devis Rapide" Button
- Bottom-right orange floating button → modal with Name, Email, Service dropdown, Message, Submit

## Pages

### 1. Home (/)
- Full-screen hero: "Donnez de la voix à votre marque." + service keywords + 2 CTAs
- Animated scrolling ticker/marquee with service keywords
- 8-card services grid with hover animation (blue-to-orange gradient, lift + shadow)
- "Pourquoi Amelle Com?" — animated counters (years, clients, projects)
- Featured projects strip (3 showcase cards)
- Catalogue CTA banner (orange bg, catalogue thumbnails grid)
- Client logos carousel (placeholders)
- Testimonials (3 quotes with avatars)
- Contact CTA section with inline form

### 2. Services (/services)
- Hero: "Ce que nous faisons"
- 8 detailed service sections in alternating layout (image left/right)
- Each: title, description, bullet deliverables, icon, "Demander un devis" CTA
- Sticky sidebar navigation on desktop

### 3. Catalogues (/catalogues)
- "Nos Catalogues Produits" with category filter tabs (All, Goodies, Impression, Signalétique, Événements)
- Dynamic grid of catalogue cards (thumbnail, title, category tag, download/view button)
- Data from Supabase table: id, title, category, thumbnail_url, pdf_url, created_at
- Admin "Ajouter un catalogue" button → upload modal (behind simple auth)

### 4. Réalisations (/realisations)
- Masonry/grid of project cards with image, title, client, category tag
- Hover overlay with "Voir le projet"
- Category filter: All, Web, Print, Goodies, Événements, Vidéo, Signalétique
- Lightbox on click

### 5. À Propos (/a-propos)
- "Qui sommes-nous?" split layout (text + image)
- 3 values cards: Créativité, Proximité, Excellence
- Team section (3-4 placeholder cards)
- Timeline of milestones

### 6. Contact (/contact)
- Split: form (left) + contact info (right)
- Form: Nom, Entreprise, Email, Téléphone, Service dropdown, Message → Supabase "contact_requests"
- Contact info: address, phone, email, WhatsApp button
- Embedded map placeholder

## Technical Details
- Framer Motion for animations (page transitions, counters, card hovers, hero)
- React Router for multi-page routing
- Supabase integration for catalogues, contact form, devis requests
- Mobile-first responsive design
- Smooth scroll behavior
- SEO meta tags per page
- Lucide React icons throughout

## Design Rules
- No purple or generic gradients
- Cards: subtle shadows, rounded-xl
- Section bg alternation: white → light grey → white → blue → white
- Orange = highlight/accent, Blue = dominant
- Buttons: solid orange (primary), outlined blue (secondary)
- All interactive elements have hover states
