(() => {
  'use strict';
  const M = globalThis.WorkbenchModel;
  const lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fr';
  const messages = {
    fr: {
      compareTitle: 'Mesurez l’effet de votre scénario', baseline: 'Plan initial', currentScenario: 'Scénario courant', compareContext: 'Même article, entrepôt et règle d’inclusion des planifiés. Le plan initial exclut vos modifications locales.', compareData: 'Comparer les 12 semaines en chiffres', chartTitle: 'Stock projeté en fin de semaine, plan initial et scénario courant', chartDescription: 'Plan initial en pointillés navy, scénario courant en trait bleu. Les valeurs exactes sont disponibles dans le tableau comparatif qui suit.', chartSame: 'Les deux courbes se superposent : aucun écart entre le plan initial et le scénario courant.', chartDifferent: 'Chaque point est le stock de fin de semaine. La ligne zéro sépare le stock disponible du manque cumulé.', difference: 'Écart', coverNeed: 'Couvrir le besoin', coverIntro: 'Préparez un arrivage minimal à la première rupture pour supprimer les soldes négatifs de l’horizon.', coverReady: 'Aucun solde négatif sur les 12 semaines. Aucun arrivage supplémentaire n’est proposé.', coverReview: 'Proposition à vérifier', coverSource: 'Source : soldes hebdomadaires du scénario courant, après demande, arrivages retenus et transferts.', coverFormula: 'Quantité minimale = max(0, −minimum des soldes de la première rupture à S12).', coverReason: 'Cette quantité relève tous les soldes à partir de la réception. Une unité de moins laisserait au moins un solde négatif.', receiptWeek: 'Réception planifiée', proposedQuantity: 'Quantité minimale', resultMinimum: 'Minimum après application', resultEnding: 'Fin après application', resultRisk: 'Risque après application', coverCaution: 'Cette proposition couvre le manque, sans ajouter de stock de sécurité ni vérifier un délai fournisseur.', applyCoverage: 'Appliquer cet arrivage planifié', cancelProposal: 'Annuler la proposition', coverageAdded: 'Arrivage planifié appliqué. Comparaison et projection recalculées.', plannedExcluded: 'Les arrivages planifiés sont exclus : la proposition ne pourrait pas couvrir le besoin dans ce mode.', enablePlanned: 'Inclure les planifiés et recalculer', quantityLimit: 'Cette proposition dépasse la limite de 100 000 unités par arrivage. Elle ne peut pas être appliquée en une réception.', seeReceipt: 'Voir l’arrivage ajouté', proposalCanceled: 'Proposition annulée. Aucune donnée modifiée.', chartUnits: 'Unités', before: 'Avant', after: 'Après'
      ,
      shellBrand: 'Applications pour NetSuite', shellContext: 'Planification des stocks', shellDemo: 'Démo locale · données fictives', skip: 'Aller au workbench', back: 'Les démonstrations TG', demo: 'Données de démonstration', contact: 'Parlons de votre projet ↗', eyebrow: 'Opérations / Planification', title: 'Workbench de stock', intro: 'Repérez les tensions. Explorez une semaine. Ajustez votre plan.', horizon: 'Horizon de 12 semaines', reset: 'Réinitialiser le scénario', inventory: 'Votre plan de stock', export: 'Exporter le périmètre CSV ↓', search: 'Rechercher un article', searchPlaceholder: 'SKU ou désignation', family: 'Famille', warehouse: 'Entrepôt', risk: 'Risque', clear: 'Effacer les filtres', overview: 'Synthèse', projection: 'Projection par semaine', includePlanned: 'Inclure les arrivages planifiés', tableHint: 'Ouvrez un article pour examiner ses mouvements et tester un scénario.', projectionHint: 'Chaque solde ouvre les documents de la semaine. Faites défiler le tableau pour parcourir les 12 semaines.', previous: '← Précédent', next: 'Suivant →', empty: 'Aucun article ne correspond à ces filtres. Effacez-les pour retrouver le plan complet.', how: 'Comment lire ces projections ?', formula: 'Stock final = stock initial + arrivages retenus + transferts entrants − demande − transferts sortants. Les soldes négatifs restent visibles et se reportent à la semaine suivante.', demandRule: 'La demande réunit les commandes fermes et une prévision complémentaire : elle n’est déduite qu’une fois. Un ajustement local remplace le total de la semaine.', riskRule: 'Rupture : au moins un solde négatif. Sous sécurité : au moins un solde inférieur à deux semaines de demande moyenne. Sinon, surstock : solde final supérieur à huit semaines de demande moyenne. Couvert : les autres cas.', coverageRule: 'La couverture de fin = stock final positif ÷ demande hebdomadaire moyenne des 12 semaines. Sans demande, elle est affichée « — ». Les arrivages planifiés peuvent être exclus du calcul.', footer: '20 articles · 3 entrepôts · Un espace pour essayer vos décisions.', footerContact: 'Construisons votre outil ↗', close: 'Fermer ×', weeklyTitle: 'Projection hebdomadaire', weeklyHint: 'Sélectionnez une semaine pour voir les documents et ajuster le plan.', transferLegend: 'Transferts : entrants − sortants. Entrées : fermes et planifiées retenues.', resetTitle: 'Revenir au plan initial ?', resetBody: 'Les ajustements de demande et les arrivages ajoutés dans cette démonstration seront supprimés de ce navigateur.', cancel: 'Annuler', confirmReset: 'Réinitialiser', allFamilies: 'Toutes les familles', allLocations: 'Les 3 entrepôts', allRisks: 'Tous les risques', shortage: 'Rupture', low: 'Sous sécurité', healthy: 'Couvert', excess: 'Surstock', shortageCaption: 'Au moins un solde négatif', lowCaption: 'Sous deux semaines de sécurité', healthyCaption: 'Dans la plage de couverture', excessCaption: 'Plus de huit semaines en fin', productLocation: 'couples article / entrepôt', initialPlan: 'Plan initial · Scénario enregistré dans ce navigateur', savedPlan: 'modification(s) locale(s) · Enregistrées dans ce navigateur', sessionPlan: 'Scénario de cette session uniquement', corrupt: 'Le scénario enregistré est illisible ou invalide. Le plan initial est affiché. Un nouvel ajustement ou une réinitialisation remplacera ces données.', storageUnavailable: 'Le stockage local est indisponible. Les modifications restent actives dans cette page jusqu’à son rechargement.', product: 'Article', initialStock: 'Stock initial', incoming: 'Arrivages retenus', demand: 'Demande', ending: 'Stock fin S12', cover: 'Couverture fin', status: 'Risque horizon', units: 'u.', weeks: 'sem.', minimum: 'Stock minimum', week: 'Semaine', opening: 'Début', entries: 'Entrées', transfers: 'Transferts', closing: 'Fin', period: 'Période', receipts: 'Commandes entrantes', firm: 'Ferme', planned: 'Planifié', excluded: 'Exclu du calcul', local: 'Ajout local', remove: 'Retirer', noReceipts: 'Aucun arrivage sur cette semaine.', demandDocuments: 'Demandes de la semaine', orders: 'Commandes confirmées', forecast: 'Prévision complémentaire', adjustment: 'Total ajusté localement', originalDemand: 'Demande initiale', noTransfers: 'Aucun transfert sur cette semaine.', from: 'Depuis', to: 'Vers', adjustDemand: 'Ajuster la demande', weeklyDemand: 'Total de la semaine (unités)', applyDemand: 'Appliquer la demande', restoreDemand: 'Rétablir le total initial', demandHint: 'Remplace le total de la semaine ; les semaines suivantes sont recalculées.', addReceipt: 'Ajouter un arrivage', receiptQuantity: 'Quantité (unités)', receiptKind: 'Type d’arrivage', reference: 'Référence locale', referencePlaceholder: 'Ex. SIM-001', receiptHint: 'Ajout sur la semaine sélectionnée. Disponible uniquement dans ce scénario.', saveReceipt: 'Ajouter au scénario', capacity: 'Limite de 200 arrivages locaux atteinte. Retirez-en un ou réinitialisez le scénario.', applied: 'Demande mise à jour. Projection recalculée.', restored: 'Demande initiale rétablie. Projection recalculée.', added: 'Arrivage ajouté. Projection recalculée.', removed: 'Arrivage retiré. Projection recalculée.', resetDone: 'Plan initial rétabli.', exportDone: 'Export téléchargé :', lines: 'lignes de projection.', results: 'résultats', of: 'sur', page: 'Page', exportError: 'Le téléchargement a échoué. Réessayez dans un navigateur autorisant les téléchargements.', invalid: 'Vérifiez les valeurs : quantité entière entre 0 et 100 000, arrivage supérieur à 0.', navigation: 'Navigation principale', metricsLabel: 'Indicateurs de stock', viewLabel: 'Vue du tableau', tableLabel: 'Plan de stock', changed: 'Ajusté', plannedOff: 'Arrivages planifiés exclus', plannedOn: 'Arrivages planifiés inclus', asOf: 'Stock au 1er novembre 2026', detailOpen: 'Ouvrir', detailWeek: 'Voir la semaine', noDemand: 'Aucune demande', document: 'Document', more: 'Voir', storageCount: 'Scénario local', fullExport: '12 lignes par couple article / entrepôt, sur tout le périmètre filtré.'
    },
    en: {
      compareTitle: 'Measure your scenario’s effect', baseline: 'Initial plan', currentScenario: 'Current scenario', compareContext: 'Same product, warehouse and planned-receipt rule. The initial plan excludes your local changes.', compareData: 'Compare all 12 weeks in numbers', chartTitle: 'Projected week-end stock, initial plan and current scenario', chartDescription: 'Initial plan: dashed navy line. Current scenario: solid blue line. Exact values are available in the comparison table below.', chartSame: 'Both lines overlap: there is no difference between the initial plan and the current scenario.', chartDifferent: 'Each point is the week-end stock. The zero line separates available stock from the accumulated shortage.', difference: 'Change', coverNeed: 'Cover the shortfall', coverIntro: 'Prepare the smallest receipt at the first shortage to remove negative balances across the horizon.', coverReady: 'No negative balances across the 12 weeks. No additional receipt is proposed.', coverReview: 'Review the proposal', coverSource: 'Source: current scenario’s weekly balances, after demand, included receipts and transfers.', coverFormula: 'Minimum quantity = max(0, −lowest balance from the first shortage to W12).', coverReason: 'This quantity raises every balance from the receipt week onward. One unit less would leave at least one negative balance.', receiptWeek: 'Planned receipt', proposedQuantity: 'Minimum quantity', resultMinimum: 'Minimum after applying', resultEnding: 'Final stock after applying', resultRisk: 'Risk after applying', coverCaution: 'This proposal covers the shortfall without adding safety stock or checking a supplier lead time.', applyCoverage: 'Apply this planned receipt', cancelProposal: 'Cancel proposal', coverageAdded: 'Planned receipt applied. Comparison and projection recalculated.', plannedExcluded: 'Planned receipts are excluded: the proposal could not cover the shortfall in this mode.', enablePlanned: 'Include planned receipts and recalculate', quantityLimit: 'This proposal exceeds the 100,000-unit limit per receipt. It cannot be applied as a single receipt.', seeReceipt: 'View the added receipt', proposalCanceled: 'Proposal cancelled. No data changed.', chartUnits: 'Units', before: 'Before', after: 'After'
      ,
      shellBrand: 'Applications for NetSuite', shellContext: 'Stock planning', shellDemo: 'Local demo · fictional data', skip: 'Skip to workbench', back: 'TG demonstrations', demo: 'Demonstration data', contact: 'Discuss your project ↗', eyebrow: 'Operations / Planning', title: 'Stock workbench', intro: 'Spot pressure points. Explore a week. Adjust your plan.', horizon: '12-week horizon', reset: 'Reset the scenario', inventory: 'Your stock plan', export: 'Export filtered scope to CSV ↓', search: 'Find a product', searchPlaceholder: 'SKU or product name', family: 'Family', warehouse: 'Warehouse', risk: 'Risk', clear: 'Clear filters', overview: 'Overview', projection: 'Weekly projection', includePlanned: 'Include planned receipts', tableHint: 'Open a product to examine its movements and test a scenario.', projectionHint: 'Each balance opens the week’s documents. Scroll the table to explore all 12 weeks.', previous: '← Previous', next: 'Next →', empty: 'No products match these filters. Clear them to see the full plan.', how: 'How do these projections work?', formula: 'Closing stock = opening stock + included receipts + incoming transfers − demand − outgoing transfers. Negative balances remain visible and carry forward to the next week.', demandRule: 'Demand combines confirmed orders and an additional forecast: it is deducted once. A local adjustment replaces the week’s total.', riskRule: 'Shortage: at least one negative balance. Low cover: at least one balance below two weeks of average demand. Otherwise, excess: final balance above eight weeks of average demand. Covered: all other cases.', coverageRule: 'Final cover = positive final stock ÷ average weekly demand over the 12 weeks. With no demand, cover displays “—”. Planned receipts can be excluded.', footer: '20 products · 3 warehouses · A place to try your decisions.', footerContact: 'Let’s build your tool ↗', close: 'Close ×', weeklyTitle: 'Weekly projection', weeklyHint: 'Select a week to see the documents and adjust the plan.', transferLegend: 'Transfers: incoming − outgoing. Receipts: included firm and planned quantities.', resetTitle: 'Return to the initial plan?', resetBody: 'Demand adjustments and receipts added in this demonstration will be removed from this browser.', cancel: 'Cancel', confirmReset: 'Reset', allFamilies: 'All families', allLocations: 'All 3 warehouses', allRisks: 'All risks', shortage: 'Shortage', low: 'Low cover', healthy: 'Covered', excess: 'Excess', shortageCaption: 'At least one negative balance', lowCaption: 'Below two weeks of safety stock', healthyCaption: 'Within the coverage range', excessCaption: 'Over eight weeks at the end', productLocation: 'product / warehouse pairs', initialPlan: 'Initial plan · Scenario saved in this browser', savedPlan: 'local change(s) · Saved in this browser', sessionPlan: 'Scenario for this session only', corrupt: 'The saved scenario is unreadable or invalid. The initial plan is displayed. A new adjustment or reset will replace the saved data.', storageUnavailable: 'Local storage is unavailable. Changes remain active on this page until it is reloaded.', product: 'Product', initialStock: 'Opening stock', incoming: 'Included receipts', demand: 'Demand', ending: 'Week 12 stock', cover: 'Final cover', status: 'Horizon risk', units: 'units', weeks: 'wk', minimum: 'Minimum stock', week: 'Week', opening: 'Open', entries: 'Receipts', transfers: 'Transfers', closing: 'Close', period: 'Period', receipts: 'Incoming orders', firm: 'Firm', planned: 'Planned', excluded: 'Excluded from calculation', local: 'Local addition', remove: 'Remove', noReceipts: 'No receipts this week.', demandDocuments: 'This week’s demand', orders: 'Confirmed orders', forecast: 'Additional forecast', adjustment: 'Locally adjusted total', originalDemand: 'Initial demand', noTransfers: 'No transfers this week.', from: 'From', to: 'To', adjustDemand: 'Adjust demand', weeklyDemand: 'Week total (units)', applyDemand: 'Apply demand', restoreDemand: 'Restore initial total', demandHint: 'Replaces this week’s total and recalculates the following weeks.', addReceipt: 'Add a receipt', receiptQuantity: 'Quantity (units)', receiptKind: 'Receipt type', reference: 'Local reference', referencePlaceholder: 'E.g. SIM-001', receiptHint: 'Added to the selected week. Available only within this scenario.', saveReceipt: 'Add to scenario', capacity: 'The limit of 200 local receipts is reached. Remove one or reset the scenario.', applied: 'Demand updated. Projection recalculated.', restored: 'Initial demand restored. Projection recalculated.', added: 'Receipt added. Projection recalculated.', removed: 'Receipt removed. Projection recalculated.', resetDone: 'Initial plan restored.', exportDone: 'Export downloaded:', lines: 'projection rows.', results: 'results', of: 'of', page: 'Page', exportError: 'Download failed. Try again in a browser that allows downloads.', invalid: 'Check the values: whole quantities from 0 to 100,000, receipts greater than 0.', navigation: 'Main navigation', metricsLabel: 'Stock indicators', viewLabel: 'Table view', tableLabel: 'Stock plan', changed: 'Adjusted', plannedOff: 'Planned receipts excluded', plannedOn: 'Planned receipts included', asOf: 'Stock on 1 November 2026', detailOpen: 'Open', detailWeek: 'View week', noDemand: 'No demand', document: 'Document', more: 'View', storageCount: 'Local scenario', fullExport: '12 rows per product / warehouse pair, across the entire filtered scope.'
    }
  };
  const t = key => messages[lang][key] || key;
  const $ = id => document.getElementById(id);
  const number = value => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 1 }).format(value);
  const shortDate = value => new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(value));
  const weekName = index => `${lang === 'fr' ? 'S' : 'W'}${String(index + 1).padStart(2, '0')}`;
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function button(text, className, action) {
    const node = element('button', text, className);
    node.type = 'button';
    node.addEventListener('click', action);
    return node;
  }
  function option(select, value, label) {
    const node = element('option', label);
    node.value = value;
    select.append(node);
  }
  const storageKey = 'tg-demo-stock-workbench-v1';
  let state = M.emptyState();
  let storageWorks = true;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (!M.validateState(parsed)) throw new SyntaxError('Invalid scenario');
      state = { version: 1, demands: parsed.demands, receipts: parsed.receipts };
    }
  } catch (error) {
    $('storage-warning').hidden = false;
    $('storage-warning').textContent = t(error instanceof SyntaxError ? 'corrupt' : 'storageUnavailable');
    storageWorks = error instanceof SyntaxError;
  }
  let view = 'overview';
  let page = 0;
  let filteredRows = [];
  let selected = null;
  let lastCoverage = null;
  let includePlanned = true;
  const pageSize = 10;
  const risks = ['shortage', 'low', 'healthy', 'excess'];
  document.documentElement.lang = lang;
  document.title = `${t('title')} · TG`;
  document.querySelector('meta[name="description"]').content = t('intro');
  document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-placeholder]').forEach(node => { node.placeholder = t(node.dataset.placeholder); });
  document.querySelector('.header-links').setAttribute('aria-label', t('navigation'));
  $('metrics').setAttribute('aria-label', t('metricsLabel'));
  document.querySelector('.view-buttons').setAttribute('aria-label', t('viewLabel'));
  document.querySelector('.table-scroll').setAttribute('aria-label', t('tableLabel'));
  document.querySelector('#detail-dialog .detail-grid .table-scroll').setAttribute('aria-label', t('weeklyTitle'));
  $('comparison-table-region').setAttribute('aria-label', t('compareData'));
  $('contact-link').href = $('footer-contact').href = `/${lang}/contact`;
  $(`lang-${lang}`).setAttribute('aria-current', 'page');
  $('date-range').textContent = `${shortDate(M.weeks[0])} 2026 — ${shortDate('2027-01-24')} 2027`;
  $('export').title = t('fullExport');
  option($('family'), '', t('allFamilies'));
  Object.entries(M.families).forEach(([id, family]) => option($('family'), id, family[lang]));
  option($('location'), '', t('allLocations'));
  M.locations.forEach(location => option($('location'), location.id, location[lang]));
  option($('risk'), '', t('allRisks'));
  risks.forEach(risk => option($('risk'), risk, t(risk)));
  const filters = () => ({ search: $('search').value, family: $('family').value, location: $('location').value, risk: $('risk').value });
  const pill = risk => element('span', t(risk), `risk-pill risk-${risk}`);
  function save(message) {
    if (!M.validateState(state)) throw new Error('Invalid local change');
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      storageWorks = true;
      $('storage-warning').hidden = true;
    } catch {
      storageWorks = false;
      $('storage-warning').hidden = false;
      $('storage-warning').textContent = t('storageUnavailable');
    }
    render();
    if (selected && $('detail-dialog').open) {
      renderDetail();
      $('detail-status').textContent = t(message) + (storageWorks ? '' : ` ${t('storageUnavailable')}`);
    }
    $('status').textContent = t(message);
  }
  function render() {
    const allRows = M.rows(state, includePlanned);
    const selectedFilters = filters();
    const scopedRows = M.filterRows(allRows, { ...selectedFilters, risk: '' });
    filteredRows = M.filterRows(allRows, selectedFilters).sort((a, b) => risks.indexOf(a.risk) - risks.indexOf(b.risk) || a.product.sku.localeCompare(b.product.sku) || a.location.id.localeCompare(b.location.id));
    $('metrics').replaceChildren(...risks.map(risk => {
      const node = button('', 'metric', () => { $('risk').value = $('risk').value === risk ? '' : risk; page = 0; render(); $('risk').focus(); });
      node.setAttribute('aria-pressed', String(selectedFilters.risk === risk));
      node.append(element('span', t(risk), 'metric-label'), element('strong', number(scopedRows.filter(row => row.risk === risk).length), 'metric-value'), element('span', t(`${risk}Caption`), 'metric-caption'));
      const arrow = element('span', '↗', 'metric-arrow'); arrow.setAttribute('aria-hidden', 'true'); node.append(arrow);
      return node;
    }));
    const changes = Object.keys(state.demands).length + state.receipts.length;
    $('scenario-status').textContent = storageWorks ? changes ? `${number(changes)} ${t('savedPlan')}` : t('initialPlan') : t('sessionPlan');
    $('inventory-context').textContent = `${scopedRows.length} ${t('productLocation')} · ${t(includePlanned ? 'plannedOn' : 'plannedOff')}`;
    const pages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    page = Math.max(0, Math.min(page, pages - 1));
    const visible = filteredRows.slice(page * pageSize, (page + 1) * pageSize);
    const table = $('stock-table');
    table.className = view === 'projection' ? 'projection-table' : '';
    table.replaceChildren();
    table.append(element('caption', t(view === 'projection' ? 'projection' : 'inventory'), 'sr-only'));
    const head = element('thead'); const heading = element('tr');
    const headings = view === 'overview' ? [t('product'), t('warehouse'), t('initialStock'), t('incoming'), t('demand'), t('ending'), t('cover'), t('status')] : [t('product'), t('warehouse'), ...M.weeks.map((date, index) => `${weekName(index)} · ${shortDate(date)}`)];
    headings.forEach((label, index) => { const cell = element('th', label, index > 1 && index < 7 ? 'numeric' : ''); cell.scope = 'col'; heading.append(cell); });
    head.append(heading); table.append(head);
    const body = element('tbody');
    for (const row of visible) {
      const tr = element('tr'); const productCell = element('td');
      const open = button('', 'product-button', () => showDetail(row.product.id, row.location.id));
      open.dataset.openKey = `${row.product.id}:${row.location.id}`;
      open.setAttribute('aria-label', `${t('detailOpen')} ${row.product[lang]}, ${row.location[lang]}`);
      open.append(element('strong', row.product[lang]), element('small', `${row.product.sku} · ${M.families[row.product.family][lang]}`));
      productCell.append(open); tr.append(productCell, element('td', row.location[lang]));
      if (view === 'overview') {
        [row.initial, row.firm + (includePlanned ? row.planned : 0), row.totalDemand, row.ending].forEach(value => tr.append(element('td', number(value), `numeric${value < 0 ? ' negative' : ''}`)));
        tr.append(element('td', row.coverage === null ? '—' : `${number(row.coverage)} ${t('weeks')}`, 'numeric'));
        const risk = element('td'); risk.append(pill(row.risk)); tr.append(risk);
      } else {
        for (const period of row.periods) {
          const cell = element('td', undefined, 'numeric');
          const openPeriod = button(number(period.closing), `cell-button${period.closing < 0 ? ' negative' : period.closing < row.average * 2 ? ' below-safety' : ''}`, () => showDetail(row.product.id, row.location.id, period.week));
          openPeriod.setAttribute('aria-label', `${row.product.sku}, ${row.location[lang]}, ${t('detailWeek')} ${period.week + 1}: ${number(period.closing)} ${t('units')}`);
          cell.append(openPeriod); tr.append(cell);
        }
      }
      body.append(tr);
    }
    table.append(body);
    $('empty-state').hidden = filteredRows.length !== 0;
    $('result-count').textContent = filteredRows.length ? `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, filteredRows.length)} ${t('of')} ${filteredRows.length} ${t('results')}` : `0 ${t('results')}`;
    $('page-count').textContent = `${t('page')} ${page + 1} / ${pages}`;
    $('previous').disabled = page === 0; $('next').disabled = page >= pages - 1;
    $('export').disabled = filteredRows.length === 0;
    $('table-hint').textContent = t(view === 'projection' ? 'projectionHint' : 'tableHint');
  }
  function showDetail(productId, locationId, week) {
    const row = M.project(productId, locationId, state, includePlanned);
    selected = { productId, locationId, week: week ?? (row.shortageWeek < 0 ? 0 : row.shortageWeek) };
    $('detail-status').textContent = '';
    renderDetail();
    $('detail-dialog').showModal();
    document.documentElement.style.overflow = 'hidden';
  }
  function renderDetail() {
    const row = M.project(selected.productId, selected.locationId, state, includePlanned);
    $('detail-title').textContent = row.product[lang];
    $('detail-context').textContent = `${row.product.sku} / ${row.location[lang]} / ${t(includePlanned ? 'plannedOn' : 'plannedOff')}`;
    renderComparison(row);
    renderCoverage(row);
    const head = element('thead'); const heading = element('tr');
    ['week', 'opening', 'entries', 'demand', 'transfers', 'closing'].forEach((key, index) => { const th = element('th', t(key), index ? 'numeric' : ''); th.scope = 'col'; heading.append(th); });
    head.append(heading);
    const body = element('tbody');
    row.periods.forEach(period => {
      const tr = element('tr', undefined, period.week === selected.week ? 'selected' : '');
      const label = element('td');
      const selectWeek = button(`${weekName(period.week)} · ${shortDate(period.date)}`, 'cell-button', () => {
        selected.week = period.week;
        body.querySelectorAll('tr').forEach((node, index) => { node.classList.toggle('selected', index === period.week); node.querySelector('button').setAttribute('aria-pressed', String(index === period.week)); });
        renderPeriod(row);
        $('period-title').focus();
      });
      selectWeek.setAttribute('aria-pressed', String(period.week === selected.week)); label.append(selectWeek); tr.append(label);
      [period.opening, period.firm + (includePlanned ? period.planned : 0), period.demand].forEach(value => tr.append(element('td', number(value), `numeric${value < 0 ? ' negative' : ''}`)));
      tr.append(element('td', `${number(period.transferIn)} − ${number(period.transferOut)}`, 'numeric'), element('td', number(period.closing), `numeric${period.closing < 0 ? ' negative' : period.closing < row.average * 2 ? ' below-safety' : ''}`));
      body.append(tr);
    });
    $('period-table').replaceChildren(head, body);
    renderPeriod(row);
  }
  function renderComparison(row) {
    const baseline = M.project(row.product.id, row.location.id, M.emptyState(), includePlanned);
    $('comparison-context').textContent = t('compareContext');
    $('detail-metrics').replaceChildren(...['ending', 'minimum', 'risk'].map(key => {
      const card = element('div', undefined, 'comparison-stat');
      card.append(element('h4', t(key === 'risk' ? 'status' : key)));
      const values = element('div', undefined, 'comparison-values');
      for (const [label, projection] of [[t('baseline'), baseline], [t('currentScenario'), row]]) {
        const value = element('div'); value.append(element('span', label));
        value.append(key === 'risk' ? pill(projection.risk) : element('strong', `${number(projection[key])} ${t('units')}`, projection[key] < 0 ? 'negative' : ''));
        values.append(value);
      }
      card.append(values); return card;
    }));
    const head = element('thead'); const headings = element('tr');
    ['week', 'baseline', 'currentScenario', 'difference'].forEach((key, index) => { const cell = element('th', t(key), index ? 'numeric' : ''); cell.scope = 'col'; headings.append(cell); }); head.append(headings);
    const body = element('tbody');
    row.periods.forEach((period, index) => {
      const line = element('tr'); const label = element('th', `${weekName(index)} · ${shortDate(period.date)}`); label.scope = 'row'; line.append(label);
      [baseline.periods[index].closing, period.closing, period.closing - baseline.periods[index].closing].forEach(value => line.append(element('td', number(value), `numeric${value < 0 ? ' negative' : ''}`)));
      body.append(line);
    });
    $('comparison-table').replaceChildren(head, body);
    $('chart-note').textContent = t(row.periods.every((period, index) => period.closing === baseline.periods[index].closing) ? 'chartSame' : 'chartDifferent');
    renderChart(row, baseline);
  }
  function renderChart(row, baseline) {
    const width = Math.max(250, Math.round($('chart-container').getBoundingClientRect().width) || 900);
    const height = 220;
    const values = [0, ...row.periods.map(period => period.closing), ...baseline.periods.map(period => period.closing)];
    const low = Math.min(...values); const high = Math.max(...values); const span = Math.max(1, high - low);
    const bottom = height - 35; const top = 25;
    const x = index => 62 + index * (width - 82) / 11;
    const y = value => top + (high - value) / span * (bottom - top);
    const svgNode = (tag, attributes, text) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
      if (text !== undefined) node.textContent = text;
      return node;
    };
    const svg = svgNode('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-labelledby': 'chart-title chart-description' });
    svg.append(svgNode('title', { id: 'chart-title' }, t('chartTitle')), svgNode('desc', { id: 'chart-description' }, t('chartDescription')));
    const ticks = [...new Set([low, 0, high])];
    ticks.forEach(value => {
      svg.append(svgNode('line', { x1: 62, x2: width - 20, y1: y(value), y2: y(value), class: value === 0 ? 'chart-zero' : 'chart-grid' }));
      const label = Math.abs(value) < 10000 ? number(value) : new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
      svg.append(svgNode('text', { x: 52, y: y(value) + 5, 'text-anchor': 'end', class: 'chart-axis' }, label));
    });
    svg.append(svgNode('text', { x: 0, y: 14, class: 'chart-axis' }, t('chartUnits')));
    row.periods.forEach((period, index) => {
      if (width > 650 || index === 11 || index % (width < 400 ? 3 : 2) === 0 && index < 10) svg.append(svgNode('text', { x: x(index), y: height - 9, 'text-anchor': 'middle', class: 'chart-axis' }, weekName(index)));
    });
    for (const [projection, className] of [[baseline, 'chart-baseline'], [row, 'chart-scenario']]) {
      svg.append(svgNode('polyline', { points: projection.periods.map((period, index) => `${x(index)},${y(period.closing)}`).join(' '), class: className }));
    }
    row.periods.forEach((period, index) => {
      const point = svgNode('circle', { cx: x(index), cy: y(period.closing), r: 3.5, class: 'chart-point' });
      point.append(svgNode('title', {}, `${weekName(index)} · ${t('baseline')} ${number(baseline.periods[index].closing)} · ${t('currentScenario')} ${number(period.closing)}`)); svg.append(point);
    });
    $('chart-container').replaceChildren(svg);
  }
  function preserveDrafts(action) {
    const drafts = ['demand-quantity', 'receipt-quantity', 'receipt-kind', 'receipt-reference'].map(id => [id, $(id)?.value]);
    action();
    drafts.forEach(([id, value]) => { if ($(id) && value !== undefined) $(id).value = value; });
  }
  function renderCoverage(row, review = false) {
    const pane = $('coverage-guide'); const proposal = M.coverNeed(row.product.id, row.location.id, state, includePlanned);
    const header = element('div', undefined, 'coverage-header'); const copy = element('div');
    const title = element('h3', t(review ? 'coverReview' : 'coverNeed')); title.id = 'coverage-title'; title.tabIndex = -1;
    copy.append(title, element('p', t(proposal ? 'coverIntro' : 'coverReady'))); header.append(copy); pane.replaceChildren(header);
    if (lastCoverage && lastCoverage.productId === row.product.id && lastCoverage.locationId === row.location.id && state.receipts.includes(lastCoverage)) {
      const actions = element('div', undefined, 'coverage-actions');
      actions.append(button(t('seeReceipt'), 'quiet-button', () => { if (selected.week !== lastCoverage.week) { selected.week = lastCoverage.week; renderDetail(); } $('period-title').focus(); }), button(`${t('remove')} ${lastCoverage.reference}`, 'quiet-button', () => { preserveDrafts(() => { state.receipts = state.receipts.filter(receipt => receipt.id !== lastCoverage.id); lastCoverage = null; save('removed'); }); $('coverage-title').focus(); }));
      pane.append(actions);
    }
    if (!proposal) return;
    if (proposal.reason === 'plannedExcluded') {
      pane.append(element('p', t('plannedExcluded'), 'coverage-warning'));
      pane.append(button(t('enablePlanned'), 'quiet-button', () => {
        preserveDrafts(() => { includePlanned = true; $('planned').checked = true; render(); renderDetail(); renderCoverage(M.project(row.product.id, row.location.id, state, true), true); });
        $('coverage-title').focus();
      }));
      return;
    }
    if (!review) { header.append(button(t('coverNeed'), 'action-button', () => { renderCoverage(row, true); $('coverage-title').focus(); })); return; }
    pane.append(element('p', t('coverSource'), 'coverage-source'), element('p', `${t('coverFormula')} ${number(proposal.quantity)} = max(0, −(${number(proposal.minimumBefore)})).`, 'coverage-formula'));
    const numbers = element('dl', undefined, 'coverage-numbers');
    for (const [label, value] of [[t('receiptWeek'), `${weekName(proposal.week)} · ${shortDate(M.weeks[proposal.week])}`], [t('proposedQuantity'), `${number(proposal.quantity)} ${t('units')}`], [t('minimum'), `${number(proposal.minimumBefore)} → ${number(proposal.minimumAfter)} ${t('units')}`], [t('ending'), `${number(proposal.endingBefore)} → ${number(proposal.endingAfter)} ${t('units')}`], [t('resultRisk'), t(proposal.riskAfter)]]) {
      const group = element('div'); group.append(element('dt', label), element('dd', value)); numbers.append(group);
    }
    pane.append(numbers, element('p', t('coverReason')), element('p', t('coverCaution'), 'coverage-warning'));
    if (!proposal.canApply) pane.append(element('p', t(proposal.reason), 'coverage-warning'));
    const actions = element('div', undefined, 'coverage-actions');
    const apply = button(t('applyCoverage'), 'action-button', () => {
      const current = M.coverNeed(row.product.id, row.location.id, state, includePlanned);
      if (!current?.canApply) { renderCoverage(M.project(row.product.id, row.location.id, state, includePlanned), true); return; }
      preserveDrafts(() => {
        let next = 1;
        while (state.receipts.some(receipt => receipt.id === `local-${next}`)) next++;
        const receipt = { id: `local-${next}`, productId: row.product.id, locationId: row.location.id, week: current.week, kind: 'planned', quantity: current.quantity, reference: `COV-${String(next).padStart(3, '0')}` };
        state.receipts.push(receipt); lastCoverage = receipt; save('coverageAdded');
      });
      $('coverage-title').focus();
    });
    apply.disabled = !proposal.canApply;
    actions.append(apply, button(t('cancelProposal'), 'quiet-button', () => { renderCoverage(row); $('detail-status').textContent = t('proposalCanceled'); $('coverage-title').focus(); }));
    pane.append(actions);
  }
  function section(title) { const node = element('section', undefined, 'period-section'); node.append(element('h4', title)); return node; }
  function documentRow(title, subtitle, quantity) {
    const li = element('li', undefined, 'document-row'); const text = element('div');
    text.append(element('strong', title), element('small', subtitle));
    li.append(text, element('span', `${number(quantity)} ${t('units')}`, 'quantity'));
    return li;
  }
  function inputField(form, labelText, id, type, value) {
    const label = element('label'); label.htmlFor = id; label.append(element('span', labelText));
    const input = element('input'); input.id = id; input.name = id; input.type = type; input.value = value; input.required = true;
    if (type === 'number') { input.min = '0'; input.max = '100000'; input.step = '1'; input.inputMode = 'numeric'; }
    label.append(input); form.append(label); return input;
  }
  function renderPeriod(row) {
    const period = row.periods[selected.week];
    const pane = $('period-detail');
    const heading = element('div', undefined, 'period-heading'); const title = element('h3', `${weekName(period.week)} · ${shortDate(period.date)}`); title.id = 'period-title'; title.tabIndex = -1;
    heading.append(title, element('span', `${t('closing')} : ${number(period.closing)} ${t('units')}`)); pane.replaceChildren(heading);
    const incoming = section(t('receipts')); const receipts = element('ul', undefined, 'document-list');
    period.incoming.forEach(receipt => {
      const excluded = !includePlanned && receipt.kind === 'planned';
      const item = documentRow(receipt.reference, `${t(receipt.kind)}${receipt.local ? ` · ${t('local')}` : ''}${excluded ? ` · ${t('excluded')}` : ''}`, receipt.quantity);
      if (excluded) item.classList.add('excluded');
      if (receipt.local) item.firstChild.append(button(t('remove'), 'remove-receipt', () => { state.receipts = state.receipts.filter(value => value.id !== receipt.id); save('removed'); $('period-title').focus(); }));
      receipts.append(item);
    });
    incoming.append(period.incoming.length ? receipts : element('p', t('noReceipts'), 'period-empty')); pane.append(incoming);
    const demands = section(t('demandDocuments')); const demandLines = element('ul', undefined, 'document-list');
    if (period.adjusted) demandLines.append(documentRow(t('adjustment'), `${t('originalDemand')} : ${number(period.original.quantity)} ${t('units')}`, period.demand));
    else {
      const ref = `${row.product.index + 1}-${row.location.id.slice(0, 2).toUpperCase()}-${period.week + 1}`;
      demandLines.append(documentRow(`DEM-${ref}`, t('orders'), period.original.committed), documentRow(`PRE-${ref}`, t('forecast'), period.original.forecast));
    }
    demands.append(demandLines); pane.append(demands);
    const moves = section(t('transfers')); const movementLines = element('ul', undefined, 'document-list');
    period.movements.forEach(movement => { const inbound = movement.to === row.location.id; const other = M.locations.find(location => location.id === (inbound ? movement.from : movement.to)); movementLines.append(documentRow(movement.reference, `${t(inbound ? 'from' : 'to')} ${other[lang]}`, movement.quantity)); });
    moves.append(period.movements.length ? movementLines : element('p', t('noTransfers'), 'period-empty')); pane.append(moves);
    const demandSection = section(t('adjustDemand')); const demandForm = element('form', undefined, 'scenario-form');
    const demandInput = inputField(demandForm, t('weeklyDemand'), 'demand-quantity', 'number', period.demand);
    demandForm.append(element('p', t('demandHint')));
    const demandActions = element('div', undefined, 'form-actions'); const applyDemand = element('button', t('applyDemand'), 'action-button'); applyDemand.type = 'submit'; demandActions.append(applyDemand);
    const key = `${row.product.id}:${row.location.id}:${period.week}`;
    if (Object.hasOwn(state.demands, key)) demandActions.append(button(t('restoreDemand'), 'quiet-button', () => { delete state.demands[key]; save('restored'); $('demand-quantity').focus(); }));
    demandForm.append(demandActions);
    demandForm.addEventListener('submit', event => {
      event.preventDefault(); const value = Number(demandInput.value);
      if (!demandForm.reportValidity() || !M.validQuantity(value)) { $('detail-status').textContent = t('invalid'); return; }
      if (value === period.original.quantity) delete state.demands[key]; else state.demands[key] = value;
      save('applied'); $('demand-quantity').focus();
    });
    demandSection.append(demandForm); pane.append(demandSection);
    const receiptSection = section(t('addReceipt')); const receiptForm = element('form', undefined, 'scenario-form');
    const rowFields = element('div', undefined, 'form-two-columns');
    const quantity = inputField(rowFields, t('receiptQuantity'), 'receipt-quantity', 'number', ''); quantity.min = '1';
    const kindLabel = element('label'); kindLabel.htmlFor = 'receipt-kind'; kindLabel.append(element('span', t('receiptKind')));
    const kind = element('select'); kind.id = 'receipt-kind'; kind.name = 'kind'; option(kind, 'planned', t('planned')); option(kind, 'firm', t('firm')); kindLabel.append(kind); rowFields.append(kindLabel); receiptForm.append(rowFields);
    const reference = inputField(receiptForm, t('reference'), 'receipt-reference', 'text', ''); reference.maxLength = 60; reference.placeholder = t('referencePlaceholder'); reference.required = false;
    receiptForm.append(element('p', t('receiptHint')));
    const add = element('button', t('saveReceipt'), 'action-button'); add.type = 'submit'; receiptForm.append(add);
    if (state.receipts.length >= 200) { add.disabled = true; receiptForm.append(element('p', t('capacity'))); }
    receiptForm.addEventListener('submit', event => {
      event.preventDefault(); const value = Number(quantity.value);
      if (!receiptForm.reportValidity() || !M.validQuantity(value) || value === 0 || state.receipts.length >= 200) { $('detail-status').textContent = t('invalid'); return; }
      let next = 1;
      while (state.receipts.some(receipt => receipt.id === `local-${next}`)) next++;
      state.receipts.push({ id: `local-${next}`, productId: row.product.id, locationId: row.location.id, week: period.week, kind: kind.value, quantity: value, reference: reference.value.trim() || `SIM-${String(next).padStart(3, '0')}` });
      save('added'); $('receipt-quantity').focus();
    });
    receiptSection.append(receiptForm); pane.append(receiptSection);
  }
  $('filters').addEventListener('submit', event => event.preventDefault());
  ['search', 'family', 'location', 'risk'].forEach(id => $(id).addEventListener(id === 'search' ? 'input' : 'change', () => { page = 0; render(); }));
  $('clear-filters').addEventListener('click', () => { ['search', 'family', 'location', 'risk'].forEach(id => { $(id).value = ''; }); page = 0; render(); $('search').focus(); });
  ['overview', 'projection'].forEach(value => $(`${value}-view`).addEventListener('click', () => { view = value; ['overview', 'projection'].forEach(name => $(`${name}-view`).setAttribute('aria-pressed', String(name === value))); render(); }));
  $('planned').addEventListener('change', () => { includePlanned = $('planned').checked; page = 0; render(); });
  $('previous').addEventListener('click', () => { page--; render(); });
  $('next').addEventListener('click', () => { page++; render(); });
  $('close-detail').addEventListener('click', () => $('detail-dialog').close());
  $('detail-dialog').addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    const target = selected && document.querySelector(`[data-open-key="${selected.productId}:${selected.locationId}"]`);
    if (target) target.focus(); else { $('inventory-title').tabIndex = -1; $('inventory-title').focus(); }
  });
  $('reset').addEventListener('click', () => $('reset-dialog').showModal());
  $('cancel-reset').addEventListener('click', () => $('reset-dialog').close());
  $('confirm-reset').addEventListener('click', () => { state = M.emptyState(); save('resetDone'); $('reset-dialog').close(); $('reset').focus(); });
  $('export').addEventListener('click', () => {
    let url;
    try {
      const csv = M.exportCsv(filteredRows, lang, includePlanned);
      url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      const anchor = element('a'); anchor.href = url; anchor.download = `tg-stock-${lang}-${M.weeks[0]}.csv`; document.body.append(anchor); anchor.click(); anchor.remove();
      $('status').textContent = `${t('exportDone')} ${filteredRows.length * 12} ${t('lines')}`;
    } catch { $('status').textContent = t('exportError'); }
    finally { if (url) setTimeout(() => URL.revokeObjectURL(url), 1000); }
  });
  new ResizeObserver(() => {
    if (selected && $('detail-dialog').open) renderChart(M.project(selected.productId, selected.locationId, state, includePlanned), M.project(selected.productId, selected.locationId, M.emptyState(), includePlanned));
  }).observe($('chart-container'));
  render();
})();
