import type { ProjectSlug } from './projects'

const cases = {
  'quick-so': {
    image: 'order', path: 'order-portal',
    fr: { title: 'Saisie de commandes.', category: 'Vente · Application NetSuite', summary: 'Client, produits et quantités réunis dans un écran dédié à la vente.', problem: 'Une tâche quotidienne, ralentie par un formulaire trop général.', outcome: 'Préparer, vérifier et créer la commande dans une seule interface.' },
    en: { title: 'Sales order entry.', category: 'Sales · NetSuite application', summary: 'Customer, products and quantities together in a dedicated sales screen.', problem: 'A routine task slowed down by a general-purpose form.', outcome: 'Prepare, review and create the order in a single interface.' },
  },
  'prp-v2': {
    image: 'portal', path: 'order-portal',
    fr: { title: 'Portail commercial.', category: 'Vente · Application NetSuite', summary: 'Un catalogue, les tarifs client et des paniers que l’on peut reprendre.', problem: 'Les fonctions commerciales étaient dans un outil séparé.', outcome: 'Les fonctions utiles réunies directement dans NetSuite.' },
    en: { title: 'Sales portal.', category: 'Sales · NetSuite application', summary: 'A catalogue, customer pricing and baskets you can come back to.', problem: 'Sales features lived in a separate tool.', outcome: 'The useful features brought together directly in NetSuite.' },
  },
  'supply-chain-workbench': {
    image: 'stock', path: 'stock-workbench',
    fr: { title: 'Planification des stocks.', category: 'Opérations · Application NetSuite', summary: 'Stock, demande et arrivages réunis pour comprendre ce qui risque de manquer.', problem: 'Le stock disponible ne disait pas ce qui allait manquer demain.', outcome: 'Une vue par article, entrepôt et période, avec les mouvements à portée de main.' },
    en: { title: 'Stock planning.', category: 'Operations · NetSuite application', summary: 'Stock, demand and incoming supply together to understand what may run short.', problem: 'Available stock did not explain what might be missing next.', outcome: 'A view by product, warehouse and period, with the movements close at hand.' },
  },
  'quoting-assistants': {
    image: 'quote', path: 'quote-configurator',
    fr: { title: 'Assistants pour NetSuite.', category: 'IA · Offre de services', summary: 'Trouver une réponse et vérifier une action dans ses outils métier.', problem: 'L’information est répartie entre applications et documents.', outcome: 'Des assistants intégrés aux outils et aux tâches de l’équipe.' },
    en: { title: 'Assistants for NetSuite.', category: 'AI · Services', summary: 'Find an answer and review an action inside your business tools.', problem: 'Information is spread across applications and documents.', outcome: 'Assistants integrated into the team’s tools and tasks.' },
  },
}

export function caseStudy(slug: ProjectSlug, locale: string) {
  const item = cases[slug]
  return { ...item[locale === 'fr' ? 'fr' : 'en'], path: item.path, image: `/work-previews/${item.image}-${locale === 'fr' ? 'fr' : 'en'}-netsuite.jpg` }
}
