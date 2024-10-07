import { createI18n } from 'vue-i18n'

const messages = {
  fr: {
    bookPartner: 'Réservez votre partenaire',
    bookSparring: 'Réservez votre session de sparring maintenant et améliorez vos compétences en boxe !',
    registered: 'Enregistré !',
    ourPartners: 'Nos partenaires',
  },
  en: {
    bookPartner: 'Book your partner',
    bookSparring: 'Book your sparring session now and take your boxing skills to the next level!',
    registered: 'Registered!',
    ourPartners: 'Our partners',
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // langue par défaut
  fallbackLocale: 'fr',
  messages,
})