/**
 * Centralized Contact & Form Dispatch Configuration
 * Supports direct WhatsApp API prefill, Web3Forms API, Formspree, and Vercel /api/contact
 */

export const CONTACT_CONFIG = {
  // Real WebKraftX WhatsApp phone number (in international format without '+' or spaces)
  whatsAppNumber: '917708136273',
  displayPhone: '+91 77081 36273',
  contactEmail: 'contact.webkraftx@gmail.com',

  // Optional external form gateways (can be overridden via environment variables)
  web3FormsAccessKey: (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) || '',
  formspreeUrl: (import.meta.env.VITE_FORMSPREE_URL as string) || '',

  // Dedicated WhatsApp web/app link
  getWhatsAppUrl(message?: string): string {
    const base = `https://wa.me/${this.whatsAppNumber}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  },

  // Formatted email mailto link
  getMailtoUrl(subject?: string): string {
    const base = `mailto:${this.contactEmail}`;
    return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
  },
};
