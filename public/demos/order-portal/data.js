const bilingual = (fr, en) => ({ fr, en });

export const products = [
  ['P01', 'NV-110-M', 'Gants de manutention', 'Handling gloves', 'Gris · taille M', 'Grey · size M', 'protection', 640, 180, 'paire', 'pair'],
  ['P02', 'NV-110-L', 'Gants de manutention', 'Handling gloves', 'Gris · taille L', 'Grey · size L', 'protection', 640, 240, 'paire', 'pair'],
  ['P03', 'NV-125-C', 'Lunettes de protection', 'Safety glasses', 'Écran clair · branches réglables', 'Clear lens · adjustable arms', 'protection', 890, 96, 'pièce', 'piece'],
  ['P04', 'NV-140-J', 'Gilet de visibilité', 'Visibility vest', 'Jaune · taille unique', 'Yellow · one size', 'protection', 1250, 72, 'pièce', 'piece'],
  ['P05', 'NV-210-5', 'Projecteur d’atelier', 'Workshop floodlight', '50 W · sur pied', '50 W · tripod', 'light', 7490, 28, 'pièce', 'piece'],
  ['P06', 'NV-220-R', 'Baladeuse rechargeable', 'Rechargeable work light', '800 lm · base aimantée', '800 lm · magnetic base', 'light', 3290, 54, 'pièce', 'piece'],
  ['P07', 'NV-230-F', 'Lampe frontale', 'Headlamp', '350 lm · bandeau réglable', '350 lm · adjustable strap', 'light', 1895, 65, 'pièce', 'piece'],
  ['P08', 'NV-240-A', 'Lampe de bureau articulée', 'Adjustable desk lamp', 'Anthracite · 8 W', 'Anthracite · 8 W', 'light', 2790, 0, 'pièce', 'piece'],
  ['P09', 'NV-310-20', 'Bac empilable', 'Stacking bin', '20 L · bleu', '20 L · blue', 'storage', 1490, 120, 'pièce', 'piece'],
  ['P10', 'NV-310-40', 'Bac empilable', 'Stacking bin', '40 L · bleu', '40 L · blue', 'storage', 2290, 84, 'pièce', 'piece'],
  ['P11', 'NV-325-12', 'Organiseur à compartiments', 'Compartment organiser', '12 cases · couvercle transparent', '12 compartments · clear lid', 'storage', 1790, 48, 'pièce', 'piece'],
  ['P12', 'NV-340-90', 'Étagère d’atelier', 'Workshop shelving', '90 × 40 × 180 cm · 5 niveaux', '90 × 40 × 180 cm · 5 shelves', 'storage', 8950, 18, 'pièce', 'piece'],
  ['P13', 'NV-410-25', 'Mètre ruban', 'Tape measure', '5 m · ruban 25 mm', '5 m · 25 mm tape', 'workshop', 1195, 150, 'pièce', 'piece'],
  ['P14', 'NV-420-6', 'Jeu de tournevis', 'Screwdriver set', '6 pièces · poignée bicolore', '6 pieces · two-tone grip', 'workshop', 2490, 42, 'jeu', 'set'],
  ['P15', 'NV-430-30', 'Chariot de service', 'Service trolley', '3 plateaux · charge 120 kg', '3 shelves · 120 kg capacity', 'workshop', 12900, 12, 'pièce', 'piece'],
  ['P16', 'NV-450-60', 'Tapis de poste', 'Workstation mat', '60 × 90 cm · gris', '60 × 90 cm · grey', 'workshop', 3990, 30, 'pièce', 'piece']
].map(([id, sku, fr, en, variantFr, variantEn, family, price, stock, unitFr, unitEn]) => ({
  id, sku, name: bilingual(fr, en), variant: bilingual(variantFr, variantEn),
  family, price, stock, unit: bilingual(unitFr, unitEn), image: `assets/${family}.svg`
}));

export const customers = [
  { id: 'C01', ref: 'C-101', name: 'Néolac Distribution', city: 'Rivemont', contact: 'Alix Varenne', discount: 5, terms: 30, addresses: [
    { id: 'A1', label: bilingual('Entrepôt principal', 'Main warehouse'), text: '18 allée des Verriers, 4130 Rivemont' },
    { id: 'A2', label: bilingual('Comptoir professionnel', 'Trade counter'), text: '7 avenue du Lavoir, 4130 Rivemont' }
  ] },
  { id: 'C02', ref: 'C-102', name: 'Méridia Équipements', city: 'Boisval', contact: 'Nora Delcourt', discount: 8, terms: 45, addresses: [
    { id: 'A1', label: bilingual('Centre logistique', 'Logistics centre'), text: '42 route des Érables, 5280 Boisval' },
    { id: 'A2', label: bilingual('Agence Nord', 'North branch'), text: '9 rue des Tisserands, 5280 Boisval' }
  ] },
  { id: 'C03', ref: 'C-103', name: 'Atelier Silevo', city: 'Valdune', contact: 'Émile Perrin', discount: 0, terms: 30, addresses: [
    { id: 'A1', label: bilingual('Atelier central', 'Central workshop'), text: '26 passage des Forges, 6720 Valdune' }
  ] },
  { id: 'C04', ref: 'C-104', name: 'Comptoir Ardelis', city: 'Clairpré', contact: 'Inès Marceau', discount: 5, terms: 30, addresses: [
    { id: 'A1', label: bilingual('Magasin professionnel', 'Trade store'), text: '3 place du Moulin, 3470 Clairpré' }
  ] },
  { id: 'C05', ref: 'C-105', name: 'Velnor Maintenance', city: 'Montbrune', contact: 'Hugo Lemaire', discount: 0, terms: 30, addresses: [
    { id: 'A1', label: bilingual('Dépôt technique', 'Technical depot'), text: '51 chemin des Ormes, 7860 Montbrune' }
  ] },
  { id: 'C06', ref: 'C-106', name: 'Orvane Collectivités', city: 'Rocheval', contact: 'Léa Fontanel', discount: 8, terms: 45, addresses: [
    { id: 'A1', label: bilingual('Plateforme régionale', 'Regional platform'), text: '12 parc des Aulnes, 2640 Rocheval' },
    { id: 'A2', label: bilingual('Service entretien', 'Maintenance department'), text: '8 rue des Prés Longs, 2640 Rocheval' }
  ] }
];

const lines = (...pairs) => pairs.map(([productId, quantity]) => ({ productId, quantity }));

export const templates = [
  { id: 'T01', name: bilingual('Réassort du comptoir', 'Trade counter restock'), customerId: 'C01', lines: lines(['P01', 24], ['P02', 24], ['P03', 12], ['P13', 12]) },
  { id: 'T02', name: bilingual('Équipement d’un atelier', 'Workshop setup'), customerId: 'C02', lines: lines(['P05', 2], ['P10', 8], ['P12', 2], ['P14', 4], ['P16', 4]) },
  { id: 'T03', name: bilingual('Kit équipe mobile', 'Mobile team kit'), customerId: 'C03', lines: lines(['P02', 6], ['P04', 6], ['P06', 6], ['P07', 6], ['P11', 3], ['P13', 6]) }
];

export const historical = [
  { id: 'EX-001', customerId: 'C01', lines: lines(['P01', 36], ['P03', 18], ['P09', 12], ['P13', 12]), addressId: 'A1', date: '2026-10-14', reference: 'REASSORT-RM-10', notes: '' },
  { id: 'EX-002', customerId: 'C02', lines: lines(['P05', 4], ['P06', 8], ['P12', 3], ['P15', 9]), addressId: 'A2', date: '2026-10-19', reference: 'AGENCE-NORD-24', notes: '' },
  { id: 'EX-003', customerId: 'C04', lines: lines(['P02', 20], ['P04', 10], ['P11', 8], ['P14', 8]), addressId: 'A1', date: '2026-10-22', reference: 'COMPTOIR-AUT-07', notes: '' }
];

const productById = new Map(products.map(product => [product.id, product]));
const customerById = new Map(customers.map(customer => [customer.id, customer]));
const fail = message => { throw new Error(message); };
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const text = (value, max, required = false) => typeof value === 'string' && value.length <= max && (!required || value.trim().length > 0);
const identifier = value => typeof value === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(value);
const isoDate = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString().replace('.000Z', 'Z') === value.replace('.000Z', 'Z');
};

export function unitPrice(product, customer) {
  return Math.round(product.price * (100 - customer.discount) / 100);
}

export function validateLines(value) {
  if (!Array.isArray(value) || value.length > products.length) fail('Invalid order lines');
  const seen = new Set();
  for (const line of value) {
    if (!object(line)) fail('Invalid order line');
    const product = productById.get(line.productId);
    if (!product || seen.has(line.productId)) fail('Unknown or duplicate product');
    if (!Number.isInteger(line.quantity) || line.quantity <= 0 || line.quantity > product.stock) fail('Invalid quantity or insufficient stock');
    seen.add(line.productId);
  }
  return value;
}

function calculateAmount(value, customer) {
  const subtotal = value.reduce((sum, line) => sum + unitPrice(productById.get(line.productId), customer) * line.quantity, 0);
  const shipping = !value.length || subtotal >= 50000 ? 0 : 1800;
  const tax = Math.round((subtotal + shipping) * .21);
  return { subtotal, shipping, tax, total: subtotal + shipping + tax, quantity: value.reduce((sum, line) => sum + line.quantity, 0) };
}

export function totals(value, customer) {
  validateLines(value);
  return calculateAmount(value, customer);
}

export function restockProposal(source, percent) {
  if (![50, 100, 150].includes(percent)) fail('Invalid restock percentage');
  if (!object(source) || !customerById.has(source.customerId)) fail('Invalid restock customer');
  validateLines(source.lines);
  const proposed = source.lines.map(line => ({ productId: line.productId, quantity: Math.ceil(line.quantity * percent / 100) }));
  const shortages = proposed.filter(line => line.quantity > productById.get(line.productId).stock).map(line => ({
    productId: line.productId, requested: line.quantity, available: productById.get(line.productId).stock
  }));
  return { lines: proposed, shortages, amount: calculateAmount(proposed, customerById.get(source.customerId)) };
}

function validateContent(value) {
  if (!object(value) || !identifier(value.id) || !text(value.name, 80, true)) fail('Invalid name or identifier');
  const customer = customerById.get(value.customerId);
  if (!customer || !customer.addresses.some(address => address.id === value.addressId)) fail('Invalid customer or address');
  validateLines(value.lines);
  return value;
}

export function validateDraft(value) {
  validateContent(value);
  if (!text(value.reference, 60) || !text(value.notes, 400) || !isoDate(value.updated)) fail('Invalid draft details');
  return value;
}

export function validateStore(value) {
  if (!object(value) || value.version !== 1) fail('Invalid storage version');
  for (const [key, max] of [['drafts', 30], ['documents', 40], ['templates', 30]]) {
    if (!Array.isArray(value[key]) || value[key].length > max) fail(`Invalid ${key}`);
    const ids = new Set();
    for (const entry of value[key]) {
      if (key === 'templates') {
        validateContent(entry);
        if (!entry.lines.length) fail('Empty template');
      } else validateDraft(entry);
      if (ids.has(entry.id)) fail(`Duplicate ${key} identifier`);
      ids.add(entry.id);
      if (key === 'documents' && (typeof entry.number !== 'string' || !/^LOCAL-\d{4,}$/.test(entry.number) || !isoDate(entry.created) || !identifier(entry.sourceDraftId) || !entry.lines.length)) fail('Invalid local document');
    }
  }
  if (!value.drafts.length || !value.drafts.some(draft => draft.id === value.activeId)) fail('Unknown active draft');
  return value;
}
