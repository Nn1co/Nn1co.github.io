/* Fictional fixtures only. No NetSuite IDs, customer code or production records. */
window.DEMO_DATA = {
  date: '2026-10-27',
  customers: [
    { id: 'atelier', name: 'Atelier Rivage', initials: 'AR', type: 'Concept store', place: 'Namur · Belgique', address: '12 rue Exemple, 5000 Namur (fictif)', reference: 'DEMO-AR-028', palette: 'sea', multiplier: 1 },
    { id: 'studio', name: 'Studio des Collines', initials: 'SC', type: 'Boutique indépendante', place: 'Lille · France', address: '8 allée Fictive, 59000 Lille (fictif)', reference: 'DEMO-SC-014', palette: 'clay', multiplier: 1.1 }
  ],
  products: [
    { id: 'notebook', sku: 'DEMO-N01', name: 'Carnet Horizon', detail: 'A5 · papier ivoire', price: 12, category: 'Papeterie', art: 'notebook', color: 'lilac' },
    { id: 'bottle500', sku: 'DEMO-B05', name: 'Gourde Rivage', detail: '500 ml · vert sauge', price: 20, category: 'Accessoires', art: 'bottle', color: 'sage' },
    { id: 'bottle750', sku: 'DEMO-B07', name: 'Gourde Rivage', detail: '750 ml · vert sauge', price: 24, category: 'Accessoires', art: 'bottle', color: 'sage' },
    { id: 'bag', sku: 'DEMO-T01', name: 'Sac Escale', detail: 'Coton · sable naturel', price: 16, category: 'Accessoires', art: 'bag', color: 'sand' }
  ],
  repeatOrder: { reference: 'DEMO-018', date: '12 octobre 2026', lines: [ { productId: 'notebook', quantity: 12 }, { productId: 'bottle500', quantity: 6, issue: true } ] },
  ambiguity: { requestedLabel: 'Gourde Rivage', previousPrice: 18, candidates: ['bottle500', 'bottle750'], note: 'La commande précédente ne précise pas le volume. Son prix historique de 18 € diffère du catalogue fictif du jour.' }
};
