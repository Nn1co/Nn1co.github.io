'use strict';
const data = window.DEMO_DATA;
const storageKey = 'tg-order-lab-v1';
const main = document.querySelector('#main');
const dialog = document.querySelector('#reviewDialog');
const money = value => new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(value);
const product = id => data.products.find(item => item.id === id);
const customer = () => data.customers.find(item => item.id === state.customerId);
const price = id => Math.round(product(id).price * customer().multiplier * 100) / 100;
const total = () => state.lines.reduce((sum, line) => sum + price(line.productId) * line.quantity, 0);
const cleanState = () => ({ step: 1, customerId: null, lines: [], attempts: 0, failFirst: true, failure: false, validation: '', completed: false, resumedDraft: false });
let state = cleanState();
let sending = false;
let toastTimer;
let saved = readDraft();

function readDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(storageKey));
    if (!draft || draft.version !== 1 || !data.customers.some(c => c.id === draft.customerId) || !Array.isArray(draft.lines)) return null;
    const ids = new Set();
    if (!draft.lines.every(line => {
      if (!product(line.productId) || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 999 || ids.has(line.productId)) return false;
      ids.add(line.productId);
      return typeof line.issue === 'boolean' && typeof line.resolved === 'boolean';
    })) return null;
    return { version: 1, customerId: draft.customerId, lines: draft.lines.map(({ productId, quantity, issue, resolved }) => ({ productId, quantity, issue, resolved })) };
  } catch { return null; }
}
function notify(text) {
  clearTimeout(toastTimer);
  document.querySelector('#toast').textContent = text;
  toastTimer = setTimeout(() => { document.querySelector('#toast').textContent = ''; }, 4000);
}
function go(step) { state.step = step; state.validation = ''; render(); main.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
function render() {
  const labels = ['Choisir le client', 'Préparer le panier', 'Vérifier & simuler', 'Voir le résultat'];
  document.querySelector('#steps').innerHTML = labels.map((label, i) => `<li class="${i + 1 === state.step ? 'active' : i + 1 < state.step ? 'done' : ''}" ${i + 1 === state.step ? 'aria-current="step"' : ''}><b>${i + 1 < state.step ? '✓' : String(i + 1).padStart(2, '0')}</b><span>${label}</span></li>`).join('');
  main.innerHTML = state.step === 1 ? welcome() : state.step === 2 ? prepare() : state.step === 3 ? summary() : result();
}
function welcome() {
  return `<div class="heading"><div><p class="eyebrow">LE BON CONTEXTE. LA BONNE COMMANDE.</p><h1>Reprendre le fil.<br>Préparer la suite.</h1><p>Retrouvez un client, repartez d’une commande et gardez les exceptions visibles jusqu’à leur résolution.</p></div><span class="tag neutral">SCÉNARIO FICTIF · 27 OCT. 2026</span></div>
  ${saved ? `<div class="draft-banner"><div><strong>Votre brouillon vous attend</strong><p>${data.customers.find(c => c.id === saved.customerId).name} · ${saved.lines.length} ligne(s) · enregistré dans ce navigateur</p></div><button class="btn" data-action="resume">Reprendre le brouillon →</button></div>` : ''}
  <section class="card pad"><div class="section-top"><h2>Pour quel client ?</h2><span class="label">02 CLIENTS FICTIFS</span></div><div class="customers">${data.customers.map(c => `<button class="customer" data-action="customer" data-id="${c.id}"><span class="avatar ${c.palette}">${c.initials}</span><span><h3>${c.name}</h3><p>${c.type}<br>${c.place}</p></span><span class="arrow">↗</span></button>`).join('')}</div></section>
  <section class="welcome-note"><div><span class="label">CE QUE VOUS POUVEZ ESSAYER</span><h2>Un parcours, y compris<br>quand tout ne va pas bien.</h2><p>Un prix ambigu, un brouillon repris, un échec simulé. Les cas difficiles font partie de la démonstration.</p></div><ul><li>Sélectionner des articles et ajuster les quantités</li><li>Reprendre une commande ou un brouillon local</li><li>Résoudre une ambiguïté avant la simulation</li><li>Conserver le panier après un échec simulé</li></ul></section>`;
}
function context() {
  const c = customer();
  return `<div class="context card"><div class="avatar ${c.palette}">${c.initials}</div><div><h3>${c.name}</h3><small>${c.type} · ${c.place}</small></div><div class="context-meta"><span class="label">CONTEXTE FICTIF</span><br><small>${c.reference} · EUR</small></div></div>`;
}
function prepare() {
  return `<div class="heading"><div><p class="eyebrow">02 / PRÉPARER</p><h1>Une commande à composer.</h1><p>Retrouvez les articles. Les points à vérifier restent visibles.</p></div><button class="btn" data-action="save">Enregistrer & quitter ↗</button></div>${context()}
  <div class="order-grid"><section class="card catalog"><div class="section-top"><h2>Le catalogue</h2><span class="tag neutral">FICTIF</span></div><div class="search"><input type="search" id="search" aria-label="Rechercher un article" placeholder="Rechercher un article ou une référence…"></div><div class="products" id="products">${catalog('')}</div></section>
  <section class="card cart" aria-label="Panier"><div class="section-top"><h2>Votre panier <small>(${state.lines.length})</small></h2><span class="tag">BROUILLON LOCAL</span></div><div class="repeat"><div><strong class="small">Repartir de la commande DEMO-018</strong><p>12 octobre · 2 lignes · données fictives</p></div><button class="btn" data-action="repeat">Reprendre les articles</button></div>
  ${state.lines.length ? state.lines.map(cartLine).join('') : '<div class="empty"><div class="empty-symbol">＋</div><h3>Le panier est prêt à commencer.</h3><p class="small">Ajoutez un article ou reprenez une commande.</p></div>'}
  <div class="totals"><span>Sous-total indicatif</span><strong>${money(total())}</strong></div><p class="cart-note">Hors taxes et livraison. Un prix non confirmé peut changer.</p>${state.validation ? `<div class="validation" role="alert">${state.validation}</div>` : ''}<div class="cart-actions"><button class="btn primary" data-action="review">Vérifier le panier <span>→</span></button><button class="btn quiet" data-action="back">Revenir aux clients</button></div></section></div>`;
}
function catalog(query) {
  const matches = data.products.filter(p => `${p.name} ${p.detail} ${p.sku}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return matches.map(p => `<article class="product"><div class="art ${p.color}" aria-hidden="true"><div class="object ${p.art}"></div></div><div class="product-info"><h3>${p.name}</h3><p>${p.detail}</p><div class="product-bottom"><span>${money(price(p.id))}</span><button class="add" aria-label="Ajouter ${p.name} ${p.detail}" data-action="add" data-id="${p.id}">+</button></div></div></article>`).join('') || '<p class="search-empty">Aucun article ne correspond. Essayez « gourde ».</p>';
}
function cartLine(line) {
  const p = product(line.productId);
  return `<div class="line"><div><h3>${p.name}</h3><p>${line.issue ? 'Volume à confirmer' : p.detail}<br>${p.sku} · ${money(price(p.id))} / unité</p><button class="remove" data-action="remove" data-id="${p.id}">Retirer</button></div><div><label for="qty-${p.id}">QUANTITÉ</label><input class="qty" id="qty-${p.id}" aria-label="Quantité ${p.name} ${p.detail}" type="number" min="1" max="999" step="1" value="${line.quantity}" data-quantity="${p.id}"></div><strong class="amount">${money(price(p.id) * line.quantity)}</strong>${line.issue ? `<div class="issue"><span>! Article et prix à confirmer</span><button data-action="resolve" data-id="${p.id}">Examiner →</button></div>` : line.resolved ? '<div class="resolution">✓ Choix manuel · prix du catalogue fictif retenu</div>' : ''}</div>`;
}
function summary() {
  return `<div class="heading"><div><p class="eyebrow">03 / VÉRIFIER & SIMULER</p><h1>Tout est prêt à relire.</h1><p>Ce récapitulatif est local. Aucune validation serveur n’a été effectuée.</p></div><button class="btn" data-action="edit">Modifier le panier</button></div>${context()}
  ${state.failure ? '<div class="fail" role="alert"><h3>Échec simulé — le panier est conservé.</h3><p>Le scénario imite une interruption de transmission. Aucun appel réseau n’a eu lieu. Vous pouvez réessayer sans recréer le panier.</p></div>' : ''}
  <div class="summary-grid"><section class="card pad"><div class="section-top"><h2>Récapitulatif</h2><span class="tag">${state.lines.length} LIGNE${state.lines.length > 1 ? 'S' : ''}</span></div><p class="small">Livraison fictive : ${customer().address}</p><table class="summary-table"><thead><tr><th>ARTICLE</th><th>QTÉ</th><th>MONTANT HT</th></tr></thead><tbody>${state.lines.map(line => `<tr><td>${product(line.productId).name}<small>${product(line.productId).detail}</small></td><td>${line.quantity}</td><td>${money(price(line.productId) * line.quantity)}</td></tr>`).join('')}</tbody></table><div class="totals"><span>Sous-total indicatif</span><strong>${money(total())}</strong></div><p class="small">Taxes et livraison non calculées.</p><ul class="check-list"><li>Client et articles fictifs sélectionnés</li><li>Quantités entières, de 1 à 999</li><li>Aucune ambiguïté en attente</li></ul></section>
  <section class="handoff-panel"><p class="eyebrow">ENVIRONNEMENT DE DÉMONSTRATION</p><h2>Une transmission.<br>Entièrement simulée.</h2><p>Le bouton déclenche un scénario dans ce navigateur. Il ne crée aucune commande et ne contacte aucun service.</p>${state.attempts === 0 ? `<label><input id="failFirst" type="checkbox" ${state.failFirst ? 'checked' : ''}>Introduire un échec simulé au premier essai</label>` : '<div class="notice">Premier essai interrompu dans la simulation. Le panier reste identique.</div>'}<p>Sans connexion NetSuite, sans authentification, sans validation de stock.</p><button class="btn dark" data-action="send">${state.failure ? 'Réessayer la simulation' : 'Simuler la transmission'} →</button></section></div>`;
}
function result() {
  return `<section class="final card pad"><div class="success-mark" aria-hidden="true">✓</div><div class="heading"><p class="eyebrow">04 / RÉSULTAT LOCAL</p><h1>Simulation terminée.<br>Aucune commande créée.</h1><p>Le parcours est allé jusqu’au bout dans ce navigateur. Ce résultat ne vaut ni acceptation de commande, ni validation NetSuite.</p></div><div class="receipt"><span>Client fictif</span><b>${customer().name}</b></div><div class="receipt"><span>Panier préparé</span><b>${state.lines.length} ligne${state.lines.length > 1 ? 's' : ''} · ${state.lines.reduce((sum, l) => sum + l.quantity, 0)} unités</b></div><div class="receipt"><span>Sous-total indicatif HT</span><strong>${money(total())}</strong></div><div class="receipt"><span>Parcours simulé</span><b>${state.attempts > 1 ? 'Échec puis reprise' : 'Sans échec introduit'}</b></div><div class="notice">À vérifier dans un projet réel : configuration existante, droits, règles de prix, taxes, stock et validation côté serveur. Cette démo ne les implémente pas.</div><div class="final-actions"><button class="btn primary" data-action="download">Télécharger le récapitulatif fictif ↓</button><button class="btn" data-action="new">Nouvelle simulation</button></div></section>`;
}
function resolve(id) {
  const line = state.lines.find(l => l.productId === id);
  if (!line?.issue) return;
  document.querySelector('#dialogContent').innerHTML = `<p class="eyebrow">UNE EXCEPTION À RÉSOUDRE</p><h2 id="dialogTitle">Quelle gourde, à quel prix ?</h2><p>${data.ambiguity.note} Choisissez explicitement une référence et son prix fictif actuel.</p>${data.ambiguity.candidates.map((id, i) => `<label class="choice"><input type="radio" name="variant" value="${id}" ${i === 0 ? 'checked' : ''}><span><strong>${product(id).name}</strong><small>${product(id).detail} · ${product(id).sku}</small></span><span>${money(price(id))}</span></label>`).join('')}<div class="notice">Choix humain dans la démo. Aucun moteur de prix ni contrôle NetSuite n’est interrogé.</div><div class="dialog-actions"><button class="btn" data-action="cancel-resolve">Garder en attente</button><button class="btn primary" data-action="confirm-resolve" data-id="${id}">Retenir ce choix fictif</button></div>`;
  dialog.showModal();
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button || sending) return;
  const { action, id } = button.dataset;
  if (action === 'customer') { state = { ...cleanState(), customerId: id }; go(2); }
  if (action === 'add') {
    const line = state.lines.find(l => l.productId === id);
    if (line && line.quantity === 999) return notify('La quantité maximum est 999.');
    if (line) line.quantity++; else state.lines.push({ productId: id, quantity: 1, issue: false, resolved: false });
    state.validation = ''; render(); notify('Article ajouté au panier.');
  }
  if (action === 'remove') { state.lines = state.lines.filter(l => l.productId !== id); state.validation = ''; render(); }
  if (action === 'repeat') {
    if (state.lines.length) { notify('Repartez d’un panier vide pour reprendre cette commande sans écraser vos articles.'); return; }
    state.lines = data.repeatOrder.lines.map(line => ({ ...line, issue: !!line.issue, resolved: false }));
    state.validation = ''; render(); notify('Articles repris. Une ambiguïté reste à vérifier.');
  }
  if (action === 'save') {
    try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, customerId: state.customerId, lines: state.lines })); saved = readDraft(); go(1); notify('Brouillon enregistré dans ce navigateur.'); }
    catch { notify('Stockage local indisponible. Le panier reste ouvert ; ne fermez pas cette page.'); }
  }
  if (action === 'resume') { if (!saved) return; state = { ...cleanState(), customerId: saved.customerId, lines: saved.lines.map(l => ({ ...l })), resumedDraft: true }; go(2); notify('Brouillon repris, y compris l’exception en attente.'); }
  if (action === 'back') {
    if (state.lines.length) return notify('Pour conserver ce panier et changer de client, utilisez « Enregistrer & quitter ».');
    state = cleanState(); go(1);
  }
  if (action === 'review') {
    if (!state.lines.length) state.validation = 'Ajoutez au moins un article avant de continuer.';
    else if (state.lines.some(l => l.issue)) state.validation = 'Le panier reste bloqué : confirmez l’article et le prix avant de continuer.';
    else return go(3);
    render();
  }
  if (action === 'resolve') resolve(id);
  if (action === 'cancel-resolve') dialog.close();
  if (action === 'confirm-resolve') {
    const selected = dialog.querySelector('input[name=variant]:checked').value;
    const line = state.lines.find(l => l.productId === id);
    const existing = state.lines.find(l => l.productId === selected && l !== line);
    if (existing && existing.quantity + line.quantity > 999) return notify('La fusion dépasserait 999 unités. Réduisez les quantités.');
    if (existing) { existing.quantity += line.quantity; existing.resolved = true; state.lines = state.lines.filter(l => l !== line); }
    else { line.productId = selected; line.issue = false; line.resolved = true; }
    dialog.close(); state.validation = ''; render(); notify('Référence et prix fictif confirmés manuellement.');
  }
  if (action === 'edit') go(2);
  if (action === 'send') {
    if (state.step !== 3 || state.completed || !state.lines.length || state.lines.some(l => l.issue)) return;
    sending = true; button.disabled = true; button.textContent = 'Scénario local en cours…';
    setTimeout(() => {
      state.attempts++; sending = false;
      if (state.failFirst && state.attempts === 1) { state.failure = true; render(); main.focus({ preventScroll: true }); }
      else { state.completed = true; if (state.resumedDraft) { try { localStorage.removeItem(storageKey); } catch {} saved = null; } go(4); }
    }, 650);
  }
  if (action === 'new') { state = cleanState(); go(1); }
  if (action === 'download') {
    const receipt = { demonstration: true, syntheticData: true, transmitted: false, serverValidated: false, createdInNetSuite: false, currency: 'EUR', customer: customer().name, lines: state.lines.map(l => ({ sku: product(l.productId).sku, description: product(l.productId).name + ' · ' + product(l.productId).detail, quantity: l.quantity, unitPrice: price(l.productId) })), subtotalExcludingTaxAndShipping: total(), simulatedAttempts: state.attempts };
    const url = URL.createObjectURL(new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'tg-demo-recapitulatif-fictif.json'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
});
document.addEventListener('input', event => {
  if (event.target.id === 'search') document.querySelector('#products').innerHTML = catalog(event.target.value);
});
function commitQuantity(event) {
  if (event.target.dataset.quantity && event.target.isConnected) {
    const quantity = Number(event.target.value);
    const line = state.lines.find(l => l.productId === event.target.dataset.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) { event.target.value = line.quantity; notify('Utilisez un nombre entier compris entre 1 et 999.'); return; }
    if (line.quantity !== quantity) { line.quantity = quantity; state.validation = ''; render(); }
  }
}
document.addEventListener('change', event => {
  if (event.target.id === 'failFirst') state.failFirst = event.target.checked;
  commitQuantity(event);
});
document.addEventListener('focusout', commitQuantity);
render();
