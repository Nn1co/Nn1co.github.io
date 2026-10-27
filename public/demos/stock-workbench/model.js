/* Independent, fictional stock-planning model. No remote services. */
(() => {
  'use strict';
  const weeks = Array.from({ length: 12 }, (_, index) => new Date(Date.UTC(2026, 10, 2 + index * 7)).toISOString().slice(0, 10));
  const locations = [{ id: 'rivage', fr: 'Rivage', en: 'Rivage' }, { id: 'coteau', fr: 'Coteau', en: 'Coteau' }, { id: 'plateau', fr: 'Plateau', en: 'Plateau' }];
  const families = {
    filters: { fr: 'Filtration', en: 'Filtration' }, pumps: { fr: 'Pompage', en: 'Pumps' },
    fittings: { fr: 'Raccords', en: 'Fittings' }, instruments: { fr: 'Instrumentation', en: 'Instruments' }
  };
  const names = [
    ['Cartouche sédiment 10', 'Sediment cartridge 10', 'filters'], ['Cartouche charbon 20', 'Carbon cartridge 20', 'filters'],
    ['Filtre tamis 40', 'Mesh filter 40', 'filters'], ['Membrane compacte', 'Compact membrane', 'filters'], ['Porte-filtre double', 'Double filter housing', 'filters'],
    ['Pompe compacte 12', 'Compact pump 12', 'pumps'], ['Pompe de circulation', 'Circulation pump', 'pumps'], ['Pompe doseuse mini', 'Mini dosing pump', 'pumps'],
    ['Kit rotor 24', 'Rotor kit 24', 'pumps'], ['Tête de pompe 32', 'Pump head 32', 'pumps'],
    ['Raccord droit 16', 'Straight fitting 16', 'fittings'], ['Coude renforcé 20', 'Reinforced elbow 20', 'fittings'], ['Vanne quart de tour', 'Quarter-turn valve', 'fittings'],
    ['Manchon souple 25', 'Flexible sleeve 25', 'fittings'], ['Collecteur 4 voies', 'Four-way manifold', 'fittings'],
    ['Sonde de débit', 'Flow sensor', 'instruments'], ['Manomètre axial', 'Axial pressure gauge', 'instruments'], ['Capteur de niveau', 'Level sensor', 'instruments'],
    ['Thermomètre à plongeur', 'Immersion thermometer', 'instruments'], ['Compteur impulsion', 'Pulse counter', 'instruments']
  ];
  const products = names.map(([fr, en, family], index) => ({ id: `item-${index + 1}`, sku: `FLX-${String(101 + index).padStart(3, '0')}`, fr, en, family, index }));
  const receipts = [];
  const demand = [];
  const stocks = {};
  for (const product of products) for (const [locationIndex, location] of locations.entries()) {
    const base = 12 + (product.index % 7) * 4 + locationIndex * 3;
    const group = (product.index + locationIndex) % 5;
    stocks[`${product.id}:${location.id}`] = base * [2, 5, 5, 22, 3][group];
    for (let week = 0; week < 12; week++) {
      const quantity = base + (week % 3 - 1) * (1 + product.index % 3);
      const committed = Math.floor(quantity * 0.6);
      demand.push({ productId: product.id, locationId: location.id, week, quantity, committed, forecast: quantity - committed });
    }
    const plan = [[[4, 4, 'firm']], [[3, 4, 'firm'], [7, 4, 'planned']], [[3, 4, 'firm'], [7, 6, 'planned']], [[5, 3, 'firm']], [[6, 2, 'planned']]][group];
    for (const [week, multiple, kind] of plan) receipts.push({ id: `receipt-${receipts.length + 1}`, productId: product.id, locationId: location.id, week, kind, quantity: base * multiple, reference: `REC-${String(receipts.length + 1).padStart(4, '0')}`, local: false });
  }
  const transfers = products.map(product => ({ productId: product.id, from: locations[product.index % 3].id, to: locations[(product.index + 1) % 3].id, week: 2 + product.index % 5, quantity: 6 + product.index % 5, reference: `MOV-${String(product.index + 1).padStart(3, '0')}` }));
  const emptyState = () => ({ version: 1, demands: {}, receipts: [] });
  const validQuantity = value => Number.isInteger(value) && value >= 0 && value <= 100000;
  const pairValid = (productId, locationId) => products.some(product => product.id === productId) && locations.some(location => location.id === locationId);
  const riskFor = (minimum, ending, average) => minimum < 0 ? 'shortage' : minimum < average * 2 ? 'low' : (average === 0 ? ending > 0 : ending > average * 8) ? 'excess' : 'healthy';
  function validateState(value) {
    if (!value || value.version !== 1 || typeof value.demands !== 'object' || value.demands === null || Array.isArray(value.demands) || !Array.isArray(value.receipts) || value.receipts.length > 200) return false;
    if (Object.keys(value.demands).length > 720) return false;
    for (const [key, quantity] of Object.entries(value.demands)) {
      const [productId, locationId, week, extra] = key.split(':');
      if (extra !== undefined || !pairValid(productId, locationId) || !/^(?:[0-9]|1[01])$/.test(week) || !validQuantity(quantity)) return false;
    }
    const ids = new Set();
    return value.receipts.every(receipt => {
      if (!receipt || !pairValid(receipt.productId, receipt.locationId) || !Number.isInteger(receipt.week) || receipt.week < 0 || receipt.week > 11 || !['firm', 'planned'].includes(receipt.kind) || !validQuantity(receipt.quantity) || receipt.quantity === 0 || typeof receipt.reference !== 'string' || receipt.reference.length > 60 || typeof receipt.id !== 'string' || !/^local-\d+$/.test(receipt.id) || !Number.isSafeInteger(Number(receipt.id.slice(6))) || ids.has(receipt.id)) return false;
      ids.add(receipt.id);
      return true;
    });
  }
  function project(productId, locationId, state = emptyState(), includePlanned = true) {
    if (!pairValid(productId, locationId)) throw new Error('Unknown product or location');
    const initial = stocks[`${productId}:${locationId}`];
    let balance = initial;
    const allReceipts = [...receipts, ...state.receipts.map(receipt => ({ ...receipt, local: true }))].filter(receipt => receipt.productId === productId && receipt.locationId === locationId);
    const periods = weeks.map((date, week) => {
      const original = demand.find(line => line.productId === productId && line.locationId === locationId && line.week === week);
      const key = `${productId}:${locationId}:${week}`;
      const quantity = Object.hasOwn(state.demands, key) ? state.demands[key] : original.quantity;
      const incoming = allReceipts.filter(receipt => receipt.week === week);
      const firm = incoming.filter(receipt => receipt.kind === 'firm').reduce((total, receipt) => total + receipt.quantity, 0);
      const planned = incoming.filter(receipt => receipt.kind === 'planned').reduce((total, receipt) => total + receipt.quantity, 0);
      const movements = transfers.filter(transfer => transfer.productId === productId && transfer.week === week && [transfer.from, transfer.to].includes(locationId));
      const transferIn = movements.filter(transfer => transfer.to === locationId).reduce((total, transfer) => total + transfer.quantity, 0);
      const transferOut = movements.filter(transfer => transfer.from === locationId).reduce((total, transfer) => total + transfer.quantity, 0);
      const opening = balance;
      balance += firm + (includePlanned ? planned : 0) + transferIn - quantity - transferOut;
      return { week, date, opening, firm, planned, transferIn, transferOut, demand: quantity, original, adjusted: quantity !== original.quantity, closing: balance, incoming, movements };
    });
    const totalDemand = periods.reduce((total, period) => total + period.demand, 0);
    const average = totalDemand / 12;
    const minimum = Math.min(...periods.map(period => period.closing));
    const ending = periods[11].closing;
    const coverage = average ? Math.max(0, ending) / average : null;
    const shortageWeek = periods.findIndex(period => period.closing < 0);
    const risk = riskFor(minimum, ending, average);
    return { product: products.find(product => product.id === productId), location: locations.find(location => location.id === locationId), initial, periods, totalDemand, average, minimum, ending, coverage, shortageWeek, risk, firm: periods.reduce((sum, period) => sum + period.firm, 0), planned: periods.reduce((sum, period) => sum + period.planned, 0) };
  }
  function rows(state = emptyState(), includePlanned = true) {
    return products.flatMap(product => locations.map(location => project(product.id, location.id, state, includePlanned)));
  }
  function coverNeed(productId, locationId, state = emptyState(), includePlanned = true) {
    const row = project(productId, locationId, state, includePlanned);
    if (row.shortageWeek < 0) return null;
    const week = row.shortageWeek;
    const quantity = -Math.min(...row.periods.slice(week).map(period => period.closing));
    const minimumAfter = Math.min(...row.periods.map(period => period.closing + (period.week >= week ? quantity : 0)));
    const endingAfter = row.ending + quantity;
    const reason = !includePlanned ? 'plannedExcluded' : quantity > 100000 ? 'quantityLimit' : state.receipts.length >= 200 ? 'capacity' : '';
    return { week, quantity, minimumBefore: row.minimum, minimumAfter, endingBefore: row.ending, endingAfter, riskAfter: riskFor(minimumAfter, endingAfter, row.average), canApply: !reason, reason };
  }
  function filterRows(allRows, filters = {}) {
    const search = (filters.search || '').trim().toLocaleLowerCase();
    return allRows.filter(row => (!filters.family || row.product.family === filters.family) && (!filters.location || row.location.id === filters.location) && (!filters.risk || row.risk === filters.risk) && (!search || `${row.product.sku} ${row.product.fr} ${row.product.en}`.toLocaleLowerCase().includes(search)));
  }
  function csvCell(value) {
    let text = String(value ?? '');
    if (/^[\s]*[=+@-]/.test(text) && typeof value !== 'number') text = `'${text}`;
    return `"${text.replaceAll('"', '""')}"`;
  }
  function exportCsv(filteredRows, lang = 'fr', includePlanned = true) {
    const header = lang === 'fr' ? ['Article', 'Désignation', 'Entrepôt', 'Semaine du', 'Stock initial', 'Arrivages fermes', 'Arrivages planifiés', 'Planifiés inclus', 'Transferts entrants', 'Demande', 'Transferts sortants', 'Stock final', 'Risque horizon', 'Références arrivages'] : ['SKU', 'Product', 'Warehouse', 'Week of', 'Opening stock', 'Firm receipts', 'Planned receipts', 'Planned included', 'Transfers in', 'Demand', 'Transfers out', 'Closing stock', 'Horizon risk', 'Receipt references'];
    const riskLabels = { shortage: ['Rupture', 'Shortage'], low: ['Sous sécurité', 'Low cover'], excess: ['Surstock', 'Excess'], healthy: ['Couvert', 'Covered'] };
    const lines = [header, ...filteredRows.flatMap(row => row.periods.map(period => [row.product.sku, row.product[lang], row.location[lang], period.date, period.opening, period.firm, period.planned, includePlanned ? 1 : 0, period.transferIn, period.demand, period.transferOut, period.closing, riskLabels[row.risk][lang === 'fr' ? 0 : 1], period.incoming.map(receipt => receipt.reference).join(' | ')]))];
    return '\uFEFF' + lines.map(line => line.map(csvCell).join(';')).join('\r\n');
  }
  globalThis.WorkbenchModel = { weeks, locations, families, products, receipts, demand, stocks, transfers, emptyState, validateState, validQuantity, project, rows, coverNeed, filterRows, csvCell, exportCsv };
})();
