import {products, customers, templates, historical, unitPrice, totals, validateStore, validateLines, restockProposal} from './data.js';

const lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fr';
const l = (fr, en) => lang === 'fr' ? fr : en;
const localized = value => typeof value === 'object' ? value[lang] : value;
const money = cents => new Intl.NumberFormat(lang === 'fr' ? 'fr-BE' : 'en-IE', {style:'currency',currency:'EUR'}).format(cents / 100);
const date = value => new Intl.DateTimeFormat(lang === 'fr' ? 'fr-BE' : 'en-GB', {day:'2-digit',month:'short',year:'numeric'}).format(new Date(value));
const KEY = 'tg-demo-order-portal-v1';
const familyNames = {protection:l('Protection','Protection'),light:l('Éclairage','Lighting'),storage:l('Rangement','Storage'),workshop:l('Atelier','Workshop')};
const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
let view = ['clients','catalog','drafts','history'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'catalog';
let search = '', family = '', inStock = false, sort = 'default', clientSearch = '', historyCustomer = '';
let storageIssue = '', lastRaw = null, toastTimer, lastFocus;
const id = prefix => `${prefix}-${crypto.randomUUID()}`;
const now = () => new Date().toISOString();
const customer = customerId => customers.find(item => item.id === customerId);
const product = productId => products.find(item => item.id === productId);
const copyLines = lines => lines.map(line => ({...line}));
function draftFor(customerId, name, lines = []) {
  return {id:id('draft'),name,customerId,addressId:customer(customerId).addresses[0].id,reference:'',notes:'',lines:copyLines(lines),updated:now()};
}
function initialState() {
  const draft = draftFor(customers[0].id,l('Réassort octobre','October restock'),templates[0].lines);
  return {version:1,drafts:[draft],activeId:draft.id,documents:[],templates:[]};
}
let state;
try {
  lastRaw = localStorage.getItem(KEY);
  state = lastRaw === null ? initialState() : JSON.parse(lastRaw);
  validateStore(state);
} catch {
  state = initialState();
  storageIssue = l('Le stockage local est indisponible ou contient des données invalides. Cette session reste en mémoire. Réinitialisez pour enregistrer à nouveau.','Local storage is unavailable or contains invalid data. This session stays in memory. Reset to save again.');
}
function save() {
  validateStore(state);
  if (storageIssue) return;
  try {
    if (localStorage.getItem(KEY) !== lastRaw) {
      storageIssue = l('Les données ont changé dans un autre onglet. Vos modifications restent en mémoire. Rechargez pour récupérer la version enregistrée.','Data changed in another tab. Your edits remain in memory. Reload to recover the saved version.');
      return;
    }
    const raw = JSON.stringify(state);
    localStorage.setItem(KEY,raw);
    lastRaw = raw;
  } catch {
    storageIssue = l('Enregistrement local impossible. Vos modifications restent en mémoire pour cette session.','Local saving failed. Your edits stay in memory for this session.');
  }
}
save();
const active = () => state.drafts.find(item => item.id === state.activeId);
const activeCustomer = () => customer(active().customerId);
function h(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);
  for (const [key,value] of Object.entries(attrs)) {
    if (key.startsWith('on')) element.addEventListener(key.slice(2).toLowerCase(),value);
    else if (key === 'class') element.className = value;
    else if (key.startsWith('aria-') && value !== null) element.setAttribute(key,String(value));
    else if (key === 'value' || key === 'checked' || key === 'disabled' || key === 'selected') element[key] = value;
    else if (value !== null && value !== false) element.setAttribute(key,value === true ? '' : value);
  }
  for (const child of children.flat(Infinity)) {
    if (child !== null && child !== undefined && child !== false) element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return element;
}
const button = (label, action, attrs = {}) => h('button',{type:'button',onClick:action,...attrs},label);
const field = (label, control, attrs = {}) => h('label',attrs,label,control);
const empty = (title,text,action) => h('div',{class:'empty'},h('h3',{},title),h('p',{},text),action);
function tell(message) {
  document.querySelector('#announcement').textContent = message;
  if (modal.open) {
    let status = modal.querySelector('[data-dialog-status]');
    if (!status) {status = h('p',{'data-dialog-status':'',role:'status',class:'small muted'});modal.querySelector('.dialog-body').append(status);}
    status.textContent = message;
  }
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {toast.textContent = '';},4500);
}
function go(next) {
  view = next;
  history.replaceState(null,'',`${location.pathname}${location.search}#${next}`);
  render('view-title');
}
function updateDraft(changes, focusId) {
  Object.assign(active(),changes,{updated:now()});
  save();
  render(focusId);
}
function newDraft(customerId, lines = [], name = l('Nouveau panier','New cart'), addressId) {
  if (state.drafts.length >= 30) {tell(l('Limite de 30 brouillons atteinte. Supprimez un brouillon avant de continuer.','The 30-draft limit is reached. Delete a draft before continuing.'));return;}
  const draft = draftFor(customerId,name,lines);
  if (addressId) draft.addressId = addressId;
  state.drafts.push(draft);
  state.activeId = draft.id;
  save();
  closeModal();
  go('catalog');
  tell(l('Nouveau brouillon indépendant. Le précédent est conservé.','New independent draft. The previous draft is preserved.'));
}
function openModal(title,body,actions = []) {
  if (!modal.open) lastFocus = document.activeElement;
  modal.replaceChildren(h('div',{class:'dialog-head'},h('h2',{id:'modal-title',tabindex:'-1'},title),button('×',closeModal,{'aria-label':l('Fermer','Close')})),body,h('div',{class:'dialog-actions'},...actions));
  if (!modal.open) modal.showModal();
  document.querySelector('#modal-title').focus();
}
function closeModal() {if (modal.open) modal.close();}
modal.addEventListener('close',() => {(lastFocus?.isConnected ? lastFocus : document.querySelector('#view-title'))?.focus({preventScroll:true});});
function saveInline() {
  active().updated = now();save();
  updateSaveStatus();
  if (storageIssue) {
    if (!document.querySelector('.storage-alert')) document.querySelector('#main').prepend(storageBanner());
  }
}
function updateSaveStatus() {
  const status = document.querySelector('.status-line');
  const invalidName = document.querySelector('#draft-name')?.validity.valid === false;
  const message = storageIssue ? l('Session en mémoire uniquement','In-memory session only') : invalidName ? l('Nom invalide : le dernier nom valide reste enregistré.','Invalid name: the last valid name remains saved.') : l('Brouillon enregistré dans ce navigateur','Draft saved in this browser');
  if (status && status.textContent !== message) status.textContent = message;
}
function storageBanner() {
  return h('div',{class:'storage-alert',role:'alert'},h('span',{},storageIssue),button(l('Recharger','Reload'),() => location.reload()),button(l('Réinitialiser','Reset'),reset));
}
function confirmAction(title,text,action,label = l('Confirmer','Confirm')) {
  openModal(title,h('div',{class:'dialog-body'},h('p',{},text)),[button(l('Annuler','Cancel'),closeModal),button(label,() => {closeModal();action();},{class:'primary'})]);
}
function reset() {
  confirmAction(l('Réinitialiser cette démonstration ?','Reset this demonstration?'),l('Les brouillons, modèles et bons locaux de ce portail seront supprimés de ce navigateur. Les données de départ seront restaurées.','Drafts, templates and local documents for this portal will be removed from this browser. The starting data will be restored.'),() => {
    try {localStorage.removeItem(KEY);lastRaw = null;storageIssue = '';} catch {storageIssue = l('Stockage indisponible : session en mémoire.','Storage unavailable: in-memory session.');}
    state = initialState();save();search = '';family = '';inStock = false;go('catalog');
    tell(l('Démonstration réinitialisée.','Demonstration reset.'));
  },l('Réinitialiser','Reset'));
}
function totalBlock(lines,client,amount = totals(lines,client)) {
  return h('div',{class:'totals'},
    h('div',{},h('span',{},l('Articles HT','Items excl. VAT')),h('span',{},money(amount.subtotal))),
    h('div',{},h('span',{},l('Livraison HT','Delivery excl. VAT')),h('span',{},amount.shipping ? money(amount.shipping) : l('Offerte','Free'))),
    h('div',{},h('span',{},l('TVA de démonstration · 21 %','Demo VAT · 21%')),h('span',{},money(amount.tax))),
    h('div',{class:'grand-total'},h('span',{},l('Total TTC','Total incl. VAT')),h('span',{'data-testid':'grand-total'},money(amount.total))));
}
function render(focusId) {
  document.documentElement.lang = lang;
  document.title = l('Commandes clients · TG','Customer orders · TG');
  document.querySelector('meta[name="description"]').content = l('Portail de commande B2B interactif avec données de démonstration.','Interactive B2B order portal with demonstration data.');
  const nav = [['clients',l('Clients','Customers')],['catalog',l('Catalogue','Catalogue')],['drafts',l('Brouillons','Drafts')],['history',l('Historique','History')]];
  app.replaceChildren(
    h('header',{class:'erp-header'},h('span',{class:'erp-brand'},l('Applications pour NetSuite','Applications for NetSuite'),h('span',{},' · TG')),
      h('span',{class:'erp-application'},l('Espace commercial','Sales workspace')),h('span',{class:'erp-demo'},l('Démo locale · données fictives','Local demo · fictional data')),
      h('div',{class:'erp-site-links'},h('a',{href:`/${lang}/demos`},l('← Démonstrations','← Demonstrations')),
        h('nav',{class:'language','aria-label':l('Langue','Language')},...['fr','en'].map(code => h('a',{href:`?lang=${code}#${view}`,'aria-current':code === lang ? 'page' : null,lang:code},code.toUpperCase()))))),
    h('div',{class:'workspace'},h('aside',{class:'rail'},h('nav',{'aria-label':l('Navigation du portail','Portal navigation')},...nav.map(([key,label],i) => button([h('span',{class:'nav-number'},`0${i+1}`),label,key === 'drafts' ? h('span',{class:'count'},state.drafts.length) : null],() => go(key),{'aria-current':view === key ? 'page' : null}))),
      h('div',{class:'rail-bottom'},h('p',{},l('Espace local · EUR','Local workspace · EUR')),button(l('Réinitialiser la démo','Reset demo'),reset,{class:'link-button'}))),
      h('div',{class:'erp-record app-heading'},h('div',{},h('p',{class:'erp-breadcrumb'},l('Ventes / Commandes clients','Sales / Customer orders')),h('h1',{},nav.find(([key])=>key===view)[1])),h('span',{class:'erp-record-status'},l('Brouillon local','Local draft'))),
      h('main',{class:'main',id:'main'},storageIssue ? storageBanner() : null,
        view !== 'clients' ? contextBar() : null,
        view === 'catalog' ? catalogue() : view === 'clients' ? clientView() : view === 'drafts' ? draftsView() : historyView())),
    view === 'catalog' ? button(`${l('Voir le panier','View cart')} · ${totals(active().lines,activeCustomer()).quantity} · ${money(totals(active().lines,activeCustomer()).total)} ↓`,() => {const cart = document.querySelector('#cart-summary');cart.scrollIntoView({behavior:'instant',block:'start'});cart.focus({preventScroll:true});},{class:'mobile-cart-jump primary'}) : null,
    h('div',{class:'toast',id:'toast','aria-hidden':'true'}));
  if (focusId) document.getElementById(focusId)?.focus({preventScroll:true});
}
function contextBar() {
  const client = activeCustomer();
  const source = latestHistorical(client.id);
  return h('section',{class:'context','aria-label':l('Client du panier actif','Active cart customer')},
    h('div',{class:'context-name'},h('div',{class:'initials','aria-hidden':'true'},client.name.split(' ').map(word => word[0]).slice(0,2).join('')),
      h('div',{},h('h2',{},client.name),h('p',{},`${client.ref} · ${client.city} · ${l('Tarif','Price level')} ${client.discount ? `−${client.discount} %` : l('standard','standard')}`))),
    h('div',{class:'context-meta'},h('div',{},h('span',{},l('Contact','Contact')),client.contact),h('div',{},h('span',{},l('Conditions','Terms')),`${client.terms} ${l('jours','days')} · EUR`),button(l('Changer de client','Change customer'),() => go('clients'))),
    h('div',{class:'restock-strip'},h('div',{},h('strong',{},source ? l('Préparer le prochain réassort','Plan the next restock') : l('Composer une nouvelle commande','Build a new order')),
      h('p',{},source ? `${l('Dernière commande exemple','Latest example order')} · ${source.id} · ${date(source.date)} · ${source.lines.length} ${l('références','products')}` : l('Aucun historique fictif disponible. Composez un panier depuis le catalogue.','No fictional order history is available. Build a cart from the catalogue.'))),
      button(source ? l('Préparer un réassort','Plan a restock') : l('Parcourir le catalogue','Browse catalogue'),() => source ? showRestock(client.id) : openCatalogue(),{class:'restock-trigger'})));
}
function latestHistorical(customerId) {
  return historical.filter(item => item.customerId === customerId).sort((a,b) => b.date.localeCompare(a.date))[0];
}
function openCatalogue() {
  go('catalog');document.querySelector('#product-search').focus();document.querySelector('#product-search').scrollIntoView({block:'center'});
}
function showRestock(customerId) {
  const source = latestHistorical(customerId), client = customer(customerId);
  if (!source) {openCatalogue();return;}
  const preview = h('div',{class:'restock-preview'});
  const scale = h('select',{id:'restock-scale'},...[[50,l('50 % · Réassort réduit','50% · Smaller restock')],[100,l('100 % · Quantités identiques','100% · Same quantities')],[150,l('150 % · Réassort renforcé','150% · Larger restock')]].map(([value,label]) => h('option',{value,selected:value === 100},label)));
  const create = button(l('Créer un nouveau brouillon','Create a new draft'),() => {
    const proposal = restockProposal(source,Number(scale.value));
    if (proposal.shortages.length) return;
    newDraft(customerId,proposal.lines,`${l('Réassort','Restock')} · ${source.id}`,source.addressId);
  },{class:'primary',id:'create-restock'});
  function refresh() {
    const proposal = restockProposal(source,Number(scale.value));
    create.disabled = proposal.shortages.length > 0 || state.drafts.length >= 30;
    const status = proposal.shortages.length ? l('Stock insuffisant : réduisez le facteur. Aucune quantité ne sera tronquée.','Insufficient stock: reduce the factor. No quantity will be silently reduced.') : l('Toutes les quantités proposées sont disponibles dans le stock de démonstration.','All proposed quantities are available in the demonstration stock.');
    preview.replaceChildren(h('p',{class:proposal.shortages.length ? 'notice error' : 'notice',role:'status'},status),
      h('div',{class:'table-scroll'},h('table',{class:'document-table restock-table'},h('caption',{class:'sr-only'},l('Comparaison de la commande source et du réassort proposé','Comparison of the source order and proposed restock')),
        h('thead',{},h('tr',{},...[l('Article','Product'),l('Source','Source'),l('Proposé','Proposed'),l('Stock','Stock'),l('Unité HT','Unit excl. VAT'),l('Total HT','Total excl. VAT')].map(label => h('th',{scope:'col'},label)))),
        h('tbody',{},...proposal.lines.map((line,index) => {const item = product(line.productId), shortage = proposal.shortages.find(row => row.productId === item.id);return h('tr',{},h('td',{},localized(item.name),h('br'),h('span',{class:'muted'},item.sku)),h('td',{},source.lines[index].quantity),h('td',{},h('strong',{},line.quantity)),h('td',{class:shortage ? 'error' : ''},item.stock,shortage ? h('small',{},` · ${l('manque','short')} ${shortage.requested-shortage.available}`) : null),h('td',{},money(unitPrice(item,client))),h('td',{},money(unitPrice(item,client)*line.quantity)));})))),
      h('div',{class:'document-total'},totalBlock(proposal.lines,client,proposal.amount)),
      ...(state.drafts.length >= 30 ? [h('p',{class:'error'},l('Limite de 30 brouillons atteinte. Supprimez un brouillon pour continuer.','The 30-draft limit is reached. Delete a draft to continue.'))] : []));
  }
  scale.addEventListener('change',refresh);refresh();
  openModal(l('Préparer un réassort','Plan a restock'),h('div',{class:'dialog-body'},h('div',{class:'restock-source'},h('h3',{},client.name),h('p',{},`${l('Commande source','Source order')} ${source.id} · ${date(source.date)}`),h('p',{class:'muted'},`${l('Référence client','Customer reference')} : ${source.reference}`)),
    field(l('Quantités à reprendre','Quantities to reuse'),scale),h('p',{class:'small muted'},l('Quantités arrondies à l’unité supérieure. Prix du catalogue selon le tarif client ; stock de démonstration.','Quantities are rounded up to whole units. Current catalogue prices reflect the customer’s price level; demonstration stock.')),preview,
    h('p',{class:'small muted'},l('Le brouillon actuel et la commande source restent inchangés. La référence ponctuelle et les instructions ne sont pas recopiées.','The current draft and source order stay unchanged. One-off reference and instructions are not copied.'))),[button(l('Annuler','Cancel'),closeModal),create]);
}
function heading(title,subtitle,action,titleId = 'view-title') {
  return h('div',{class:'content-heading'},h('div',{},h('h2',{id:titleId,tabindex:'-1'},title),h('p',{},subtitle)),action);
}
function filteredProducts() {
  const term = search.trim().toLocaleLowerCase();
  const rows = products.filter(item => (!family || item.family === family) && (!inStock || item.stock > 0) && `${localized(item.name)} ${localized(item.variant)} ${item.sku}`.toLocaleLowerCase().includes(term));
  if (sort === 'price') rows.sort((a,b) => a.price-b.price);
  if (sort === 'name') rows.sort((a,b) => localized(a.name).localeCompare(localized(b.name)));
  return rows;
}
function catalogue() {
  const rows = filteredProducts();
  const searchInput = h('input',{id:'product-search',type:'search',value:search,placeholder:l('Nom, référence ou variante…','Name, SKU or variant…'),onInput:event => {
    search = event.target.value;
    const start = event.target.selectionStart;
    render('product-search');document.querySelector('#product-search').setSelectionRange(start,start);
  }});
  return h('div',{class:'catalog-layout'},h('section',{class:'catalog'},heading(l('Catalogue produits','Product catalogue'),l('Prix unitaires HT, selon le tarif du client sélectionné.','Unit prices exclude VAT and reflect the selected customer’s price level.')),
    h('div',{class:'filters'},field(l('Rechercher un article','Find a product'),searchInput,{class:'search'}),
      field(l('Trier par','Sort by'),h('select',{id:'product-sort',onChange:event => {sort = event.target.value;render('product-sort');}},...[[ 'default',l('Référence','SKU')],['name',l('Nom','Name')],['price',l('Prix croissant','Price: low to high')]].map(([value,label]) => h('option',{value,selected:sort === value},label))),{class:'sort'}),
      field(l('En stock','In stock'),h('input',{id:'stock-only',type:'checkbox',checked:inStock,onChange:event => {inStock = event.target.checked;render('stock-only');}}),{class:'check'})),
    h('div',{class:'family-tabs',role:'group','aria-label':l('Familles de produits','Product families')},...Object.entries({'':l('Tous les articles','All products'),...familyNames}).map(([key,label]) => button(label,() => {family = key;render(`family-${key || 'all'}`);},{id:`family-${key || 'all'}`,'aria-pressed':family === key}))),
    h('div',{class:'result-meta'},h('span',{},`${rows.length} ${rows.length === 1 ? l('référence','product') : l('références','products')}`),h('span',{},l('Livraison offerte dès 500 € HT','Free delivery from €500 excl. VAT'))),
    rows.length ? h('div',{},h('div',{class:'product-head','aria-hidden':'true'},h('span',{},l('Article / variante','Product / variant')),h('span',{},l('Prix HT','Excl. VAT')),h('span',{class:'stock'},l('Disponible','Available')),h('span',{},l('Quantité','Quantity'))),...rows.map(productRow)) : empty(l('Aucun article trouvé','No products found'),l('Essayez une autre recherche ou retirez un filtre.','Try another search or remove a filter.'),button(l('Effacer les filtres','Clear filters'),() => {search = '';family = '';inStock = false;render('product-search');}))),cartView());
}
function productRow(item) {
  const already = active().lines.find(line => line.productId === item.id)?.quantity || 0;
  const available = item.stock - already;
  const quantity = h('input',{id:`qty-${item.id}`,type:'number',min:1,max:Math.max(1,available),step:1,value:1,required:true,disabled:available === 0,'aria-label':`${l('Quantité à ajouter','Quantity to add')} · ${localized(item.name)} · ${localized(item.variant)}`});
  const add = h('form',{class:'add-form',onSubmit:event => {
    event.preventDefault();
    const number = Number(quantity.value);
    const remaining = item.stock-(active().lines.find(row => row.productId === item.id)?.quantity || 0);
    if (!Number.isInteger(number) || number < 1 || number > remaining) {quantity.reportValidity();return;}
    const lines = copyLines(active().lines);
    const line = lines.find(row => row.productId === item.id);
    if (line) line.quantity += number; else lines.push({productId:item.id,quantity:number});
    const focusId = number === remaining ? `cart-${item.id}` : `qty-${item.id}`;
    validateLines(lines);updateDraft({lines},focusId);
    if (number === remaining) document.getElementById(focusId).scrollIntoView({block:'nearest'});
    tell(`${number} × ${localized(item.name)} ${l('ajouté(s) au panier.','added to the cart.')}`);
  }},quantity,h('button',{type:'submit',disabled:available === 0,'aria-label':`${l('Ajouter','Add')} ${localized(item.name)} · ${localized(item.variant)}`},'+'));
  return h('article',{class:'product-row','data-product-id':item.id},h('div',{class:'product-info'},h('img',{src:item.image,alt:'',width:50,height:58}),h('div',{},h('h3',{},localized(item.name)),h('p',{},`${item.sku} · ${localized(item.variant)}`),h('p',{},localized(item.unit)))),
    h('div',{class:'price'},money(unitPrice(item,activeCustomer()))),h('div',{class:`stock ${!item.stock ? 'out' : ''}`},item.stock ? `${item.stock}` : l('Épuisé','Sold out'),h('small',{},already ? `${already} ${l('au panier','in cart')}` : l('unités','units'))),add);
}
function cartView() {
  const draft = active(), client = activeCustomer(), amount = totals(draft.lines,client);
  const nameInput = h('input',{id:'draft-name',value:draft.name,maxlength:80,required:true,'aria-describedby':'draft-save-status',onInput:event => {
    const name = event.target.value;
    const message = !name.trim() ? l('Le nom du brouillon est obligatoire.','A draft name is required.') : name.length > 80 ? l('Le nom est limité à 80 caractères.','The name is limited to 80 characters.') : '';
    event.target.setCustomValidity(message);
    event.target.setAttribute('aria-invalid',String(Boolean(message)));
    if (message) {updateSaveStatus();return;}
    draft.name = name;saveInline();
  }});
  return h('aside',{class:'cart',id:'cart-summary',tabindex:'-1','aria-label':l('Panier actif','Active cart')},h('div',{class:'cart-header'},h('h2',{},l('Votre panier','Your cart')),h('p',{},`${draft.lines.length} ${l('références','products')} · ${amount.quantity} ${l('unités','units')}`)),
    h('div',{class:'cart-body'},field(l('Nom du brouillon','Draft name'),nameInput),
      draft.lines.length ? h('div',{class:'cart-lines'},...draft.lines.map(line => {
        const item = product(line.productId);
        return h('div',{class:'cart-item'},h('div',{},h('strong',{},localized(item.name)),h('p',{},localized(item.variant)),h('div',{class:'cart-item-control'},h('input',{id:`cart-${item.id}`,type:'number',min:1,max:item.stock,step:1,value:line.quantity,'aria-label':`${l('Quantité dans le panier','Cart quantity')} · ${item.sku}`,onChange:event => {
          const quantity = Number(event.target.value);
          if (!Number.isInteger(quantity) || quantity < 1 || quantity > item.stock) {event.target.value = line.quantity;tell(l(`Quantité attendue : un entier de 1 à ${item.stock}.`,`Quantity must be a whole number from 1 to ${item.stock}.`));return;}
          line.quantity = quantity;saveInline();
          document.querySelector('.cart-body>.totals').replaceWith(totalBlock(draft.lines,client));
          document.querySelector('.cart-header p').textContent = `${draft.lines.length} ${l('références','products')} · ${totals(draft.lines,client).quantity} ${l('unités','units')}`;
          document.querySelector('.mobile-cart-jump').textContent = `${l('Voir le panier','View cart')} · ${totals(draft.lines,client).quantity} · ${money(totals(draft.lines,client).total)} ↓`;
          event.target.closest('.cart-item').querySelector('.price').textContent = money(unitPrice(item,client)*quantity);
          const catalogRow = document.querySelector(`[data-product-id="${item.id}"]`);
          if (catalogRow) {
            const remaining = item.stock-quantity;
            catalogRow.querySelector('input').max = Math.max(1,remaining);
            catalogRow.querySelector('input').disabled = !remaining;
            catalogRow.querySelector('button').disabled = !remaining;
            catalogRow.querySelector('.stock small').textContent = `${quantity} ${l('au panier','in cart')}`;
          }
        }}),button('×',() => {
          const index = draft.lines.findIndex(row => row.productId === item.id);
          const lines = draft.lines.filter(row => row.productId !== item.id);
          const next = lines[index] || lines[index-1];
          updateDraft({lines},next ? `cart-${next.productId}` : 'cart-summary');
          tell(l('Article retiré du panier.','Product removed from cart.'));
        },{class:'remove','aria-label':`${l('Retirer','Remove')} ${item.sku}`}))),h('div',{class:'price'},money(unitPrice(item,client)*line.quantity)));
      })) : h('div',{class:'empty'},h('h3',{},l('Votre panier est vide','Your cart is empty')),h('p',{},l('Ajoutez des articles au catalogue.','Add products from the catalogue.'))),
      totalBlock(draft.lines,client),
      h('div',{class:'cart-actions'},button(l('Vérifier et préparer le bon','Review and prepare document'),reviewOrder,{class:'primary',disabled:!draft.lines.length}),button(l('Enregistrer comme modèle','Save as template'),saveTemplate,{disabled:!draft.lines.length}),h('p',{class:'status-line',id:'draft-save-status',role:'status','aria-live':'polite'},storageIssue ? l('Session en mémoire uniquement','In-memory session only') : l('Brouillon enregistré dans ce navigateur','Draft saved in this browser'))),
      h('p',{class:'cart-note'},l('Livraison : 18 € HT, offerte dès 500 € HT. TVA illustrative de 21 %. Le bon est préparé localement.','Delivery: €18 excl. VAT, free from €500 excl. VAT. Illustrative VAT: 21%. The document is prepared locally.'))));
}
function clientView() {
  const term = clientSearch.toLocaleLowerCase();
  const rows = customers.filter(client => `${client.name} ${client.ref} ${client.city}`.toLocaleLowerCase().includes(term));
  const client = activeCustomer();
  const source = latestHistorical(client.id);
  return h('section',{},heading(l('Vos clients','Your customers'),l('Sélectionnez un client pour consulter son contexte et préparer sa commande.','Select a customer to review their context and prepare an order.')),
    h('div',{class:'filters'},field(l('Rechercher un client','Find a customer'),h('input',{id:'client-search',type:'search',value:clientSearch,placeholder:l('Nom, référence ou ville…','Name, reference or city…'),onInput:event => {clientSearch = event.target.value;render('client-search');}}),{class:'search'})),
    h('div',{class:'result-meta'},`${rows.length} ${l('clients','customers')}`,l('Tous les montants sont en EUR','All amounts are in EUR')),
    rows.length ? h('div',{class:'client-grid'},...rows.map(item => h('article',{class:`client-card ${item.id === client.id ? 'selected' : ''}`},h('div',{},h('span',{class:'pill'},`${item.ref} · ${item.city}`),h('h3',{},item.name),h('p',{},item.contact)),
      h('dl',{},h('div',{},h('dt',{},l('Tarif client','Customer price')),h('dd',{},item.discount ? `−${item.discount} %` : l('Standard','Standard'))),h('div',{},h('dt',{},l('Paiement','Payment')),h('dd',{},`${item.terms} ${l('jours','days')}`))),
      button(item.id === client.id ? l('Reprendre le panier','Resume cart') : l('Préparer une commande','Prepare an order'),() => {if (item.id === client.id) go('catalog');else chooseCustomer(item);},{class:item.id === client.id ? 'primary' : ''})))) : empty(l('Aucun client trouvé','No customers found'),l('Recherchez un nom ou une ville.','Search for a name or city.'),button(l('Afficher tous les clients','Show all customers'),() => {clientSearch = '';render('client-search');})),
    h('div',{class:'customer-detail'},h('div',{},h('h3',{},l('Client du panier actif','Active cart customer')),h('p',{},client.name),h('p',{},client.contact),h('p',{},`${client.terms} ${l('jours · EUR','days · EUR')}`)),
      h('div',{},h('h3',{},l('Destination sélectionnée','Selected destination')),h('p',{},client.addresses.find(item => item.id === active().addressId).text)),
      h('div',{},h('h3',{},l('Préparer le prochain réassort','Plan the next restock')),h('p',{},source ? `${source.id} · ${date(source.date)} · ${source.reference}` : l('Aucun historique fictif pour ce client.','No fictional history for this customer.')),button(source ? l('Préparer un réassort →','Plan a restock →') : l('Parcourir le catalogue →','Browse catalogue →'),() => source ? showRestock(client.id) : openCatalogue(),{class:'link-button'}))));
}
function chooseCustomer(client) {
  const saved = state.drafts.filter(draft => draft.customerId === client.id);
  const body = h('div',{class:'dialog-body'},h('p',{},l('Le panier actuel reste enregistré. Choisissez un brouillon existant ou commencez un nouveau panier.','The current cart stays saved. Choose an existing draft or start a new cart.')),
    ...saved.map(draft => button(`${l('Reprendre','Resume')} · ${draft.name}`,() => {state.activeId = draft.id;save();closeModal();go('catalog');})),
    h('div',{class:'notice'},`${client.name} · ${l('Tarif','Price level')} ${client.discount ? `−${client.discount} %` : l('standard','standard')} · ${client.terms} ${l('jours','days')}`));
  openModal(client.name,body,[button(l('Annuler','Cancel'),closeModal),button(l('Nouveau panier','New cart'),() => newDraft(client.id),{class:'primary'})]);
}
function draftsView() {
  return h('section',{},h('div',{class:'library-section'},heading(l('Brouillons enregistrés','Saved drafts'),l('Retrouvez vos paniers avec leurs quantités et leur contexte client.','Recover your carts with their quantities and customer context.'),button(l('+ Nouveau panier','+ New cart'),() => newDraft(active().customerId))),
    h('div',{class:'library-list'},...state.drafts.slice().sort((a,b) => b.updated.localeCompare(a.updated)).map(draft => libraryRow(draft.name,`${customer(draft.customerId).name} · ${date(draft.updated)}`,`${draft.lines.length} ${l('références','products')} · ${totals(draft.lines,customer(draft.customerId)).quantity} ${l('unités','units')}`,money(totals(draft.lines,customer(draft.customerId)).total),[
      button(l('Reprendre','Resume'),() => {state.activeId = draft.id;save();go('catalog');},{class:draft.id === active().id ? 'primary' : ''}),button(l('Supprimer','Delete'),() => deleteDraft(draft),{'aria-label':`${l('Supprimer le brouillon','Delete draft')} ${draft.name}`})],draft.id === active().id ? l('Actif','Active') : '')))),
    h('div',{class:'library-section'},heading(l('Modèles de commande','Order templates'),l('Une base réutilisable. Chaque utilisation crée une copie indépendante.','A reusable starting point. Each use creates an independent copy.'),null,'template-title'),
      h('div',{class:'library-list'},...[...templates,...state.templates].map(template => libraryRow(localized(template.name),customer(template.customerId).name,`${template.lines.length} ${l('références','products')}`,l('Prix recalculés dans le panier','Prices recalculated in cart'),[
        button(l('Utiliser le modèle','Use template'),() => newDraft(template.customerId,template.lines,localized(template.name),template.addressId)),
        state.templates.includes(template) ? button(l('Supprimer','Delete'),() => confirmAction(l('Supprimer le modèle ?','Delete template?'),localized(template.name),() => {state.templates = state.templates.filter(item => item.id !== template.id);save();render();}),{'aria-label':`${l('Supprimer le modèle','Delete template')} ${localized(template.name)}`}) : null
      ],state.templates.includes(template) ? l('Personnel','Personal') : l('Exemple','Example'))))));
}
function libraryRow(name,description,metric,detail,actions,pill) {
  return h('article',{class:'library-row'},h('div',{},h('h3',{},name),h('p',{},description),pill ? h('span',{class:'pill'},pill) : null),h('div',{},h('strong',{},metric),h('p',{},detail)),h('div',{class:'row-actions'},actions));
}
function deleteDraft(draft) {
  confirmAction(l('Supprimer le brouillon ?','Delete draft?'),l(`« ${draft.name} » sera supprimé de ce navigateur.`,`“${draft.name}” will be removed from this browser.`),() => {
    state.drafts = state.drafts.filter(item => item.id !== draft.id);
    if (!state.drafts.length) state.drafts.push(draftFor(draft.customerId,l('Nouveau panier','New cart')));
    if (state.activeId === draft.id) state.activeId = state.drafts[0].id;
    save();render();tell(l('Brouillon supprimé.','Draft deleted.'));
  },l('Supprimer','Delete'));
}
function saveTemplate() {
  if (state.templates.length >= 30) {tell(l('Limite de 30 modèles atteinte. Supprimez un modèle.','The 30-template limit is reached. Delete a template.'));return;}
  const input = h('input',{id:'template-name',value:active().name,maxlength:80,required:true});
  const form = h('form',{class:'dialog-body',id:'template-form',onSubmit:event => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name) {input.setCustomValidity(l('Saisissez un nom.','Enter a name.'));input.reportValidity();return;}
    const draft = active();
    state.templates.push({id:id('template'),name,customerId:draft.customerId,addressId:draft.addressId,lines:copyLines(draft.lines)});
    save();closeModal();render();tell(l('Modèle enregistré. Référence et instructions ne sont pas copiées.','Template saved. Reference and instructions are not copied.'));
  }},field(l('Nom du modèle','Template name'),input),h('p',{class:'muted'},l('Le modèle conserve le client, la destination, les articles et les quantités. Les prix seront recalculés à la reprise.','The template keeps the customer, destination, products and quantities. Prices will be recalculated when reused.')));
  input.addEventListener('input',() => input.setCustomValidity(''));
  openModal(l('Enregistrer un modèle','Save a template'),form,[button(l('Annuler','Cancel'),closeModal),h('button',{type:'submit',form:'template-form',class:'primary'},l('Enregistrer le modèle','Save template'))]);
}
function reviewOrder() {
  const draft = active(), client = activeCustomer();
  const address = h('select',{id:'delivery-address',required:true},...client.addresses.map(item => h('option',{value:item.id,selected:item.id === draft.addressId},`${localized(item.label)} · ${item.text}`)));
  const reference = h('input',{id:'order-reference',value:draft.reference,maxlength:60,placeholder:l('Ex. ACH-2026-42','E.g. PO-2026-42')});
  const notes = h('textarea',{id:'delivery-notes',maxlength:400,rows:3},draft.notes);
  for (const [control,key] of [[address,'addressId'],[reference,'reference'],[notes,'notes']]) control.addEventListener(key === 'addressId' ? 'change' : 'input',() => {
    const valid = key === 'addressId' ? client.addresses.some(item => item.id === control.value) : control.value.length <= control.maxLength;
    const message = valid ? '' : l('La valeur dépasse la limite autorisée.','The value exceeds the allowed limit.');
    const previousMessage = control.validationMessage;
    control.setCustomValidity(message);control.setAttribute('aria-invalid',String(!valid));
    if (!valid) {if (message !== previousMessage) tell(message);return;}
    draft[key] = control.value;saveInline();
    if (storageIssue && modal.querySelector('[data-dialog-status]')?.textContent !== storageIssue) tell(storageIssue);
  });
  const form = h('form',{class:'dialog-body',id:'review-form',onSubmit:event => {
    event.preventDefault();
    if (!draft.lines.length || !client.addresses.some(item => item.id === address.value)) return;
    Object.assign(draft,{addressId:address.value,reference:reference.value.trim(),notes:notes.value.trim(),updated:now()});
    validateLines(draft.lines);
    const previous = state.documents.find(doc => doc.sourceDraftId === draft.id && doc.addressId === draft.addressId && doc.reference === draft.reference && doc.notes === draft.notes && JSON.stringify(doc.lines) === JSON.stringify(draft.lines));
    if (previous) {save();render();showDocument(previous);return;}
    if (state.documents.length >= 40) {tell(l('Limite de 40 bons locaux atteinte. Réinitialisez la démo pour en créer de nouveaux.','The 40-document limit is reached. Reset the demo to create more.'));return;}
    const document = {...draft,id:id('document'),number:`LOCAL-${String(state.documents.length+1).padStart(4,'0')}`,created:now(),sourceDraftId:draft.id,lines:copyLines(draft.lines)};
    state.documents.unshift(document);save();render();showDocument(document);
  }},h('div',{class:'notice'},l('Vous préparez un bon local. Aucun envoi, aucune réservation de stock et aucune commande serveur ne sont effectués.','You are preparing a local document. Nothing is sent, no stock is reserved and no server order is created.')),
    h('div',{class:'fields'},field(l('Client','Customer'),h('input',{value:client.name,readonly:true}),{class:'full'}),field(l('Livraison','Delivery'),address,{class:'full'}),field(l('Référence client (facultatif)','Customer reference (optional)'),reference,{class:'full'}),field(l('Instructions de livraison (facultatif)','Delivery instructions (optional)'),notes,{class:'full'})),
    totalBlock(draft.lines,client));
  openModal(l('Vérifier la commande','Review the order'),form,[button(l('Continuer la sélection','Continue selecting'),closeModal),h('button',{type:'submit',form:'review-form',class:'primary'},l('Préparer le bon local','Prepare local document'))]);
}
function historyView() {
  const examples = historical.map(item => ({...item,number:item.id,created:item.date,name:l('Commande exemple','Example order'),example:true}));
  const rows = [...state.documents,...examples].filter(item => !historyCustomer || item.customerId === historyCustomer);
  return h('section',{},heading(l('Historique des commandes','Order history'),l('Vos bons préparés localement et trois commandes fictives à réutiliser.','Your locally prepared documents and three fictional orders to reuse.')),
    h('div',{class:'filters'},field(l('Client','Customer'),h('select',{id:'history-customer',onChange:event => {historyCustomer = event.target.value;render('history-customer');}},h('option',{value:'',selected:historyCustomer === ''},l('Tous les clients','All customers')),...customers.map(item => h('option',{value:item.id,selected:historyCustomer === item.id},item.name))))),
    rows.length ? h('div',{class:'library-list'},...rows.map(item => libraryRow(item.number,`${customer(item.customerId).name} · ${date(item.created)}`,money(totals(item.lines,customer(item.customerId)).total),`${item.lines.length} ${l('références','products')} · ${item.reference || l('Sans référence client','No customer reference')}`,[
      button(l('Voir le bon','View document'),() => showDocument(item)),button(l('Commander à nouveau','Order again'),() => newDraft(item.customerId,item.lines,`${l('Copie','Copy')} · ${item.number}`,item.addressId))
    ],item.example ? l('Exemple fictif','Fictional example') : l('Préparé localement','Prepared locally')))) : empty(l('Aucun bon pour ce client','No documents for this customer'),l('Préparez un panier pour créer un premier bon local.','Prepare a cart to create a first local document.')));
}
function documentBody(doc) {
  const client = customer(doc.customerId);
  const address = client.addresses.find(item => item.id === doc.addressId) || client.addresses[0];
  return h('div',{class:'dialog-body',id:'document-content'},h('div',{class:'document-heading'},h('div',{},h('div',{class:'eyebrow'},l('Données de démonstration','Demonstration data')),h('h3',{},l('Bon de commande','Order document')),h('p',{class:'muted'},doc.number)),h('div',{},h('p',{},date(doc.created || doc.date)),h('p',{class:'small'},l('EUR · Document local','EUR · Local document')))),
    h('div',{class:'document-address'},h('div',{},h('h3',{},l('Client','Customer')),h('p',{},`${client.name}\n${client.ref}\n${client.contact}`)),h('div',{},h('h3',{},l('Livraison','Delivery')),h('p',{},address.text))),
    h('p',{class:'small'},`${l('Référence client','Customer reference')} : ${doc.reference || '—'} · ${l('Conditions','Terms')} : ${client.terms} ${l('jours','days')}`),
    h('div',{class:'table-scroll'},h('table',{class:'document-table'},h('thead',{},h('tr',{},...[l('Article / SKU','Product / SKU'),l('Qté','Qty'),l('Unité HT','Unit excl. VAT'),l('Total HT','Total excl. VAT')].map(label => h('th',{scope:'col'},label)))),h('tbody',{},...doc.lines.map(line => {const item = product(line.productId);return h('tr',{},h('td',{},localized(item.name),h('br'),h('span',{class:'muted'},`${item.sku} · ${localized(item.variant)}`)),h('td',{},line.quantity),h('td',{},money(unitPrice(item,client))),h('td',{},money(unitPrice(item,client)*line.quantity)));})))),
    h('div',{class:'document-total'},totalBlock(doc.lines,client)),doc.notes ? h('div',{},h('h3',{},l('Instructions','Instructions')),h('p',{style:'white-space:pre-wrap;overflow-wrap:anywhere'},doc.notes)) : null,
    h('p',{class:'notice'},l('Bon préparé dans le navigateur. Aucun envoi ni engagement commercial. Les produits, prix, stocks et montants de TVA sont fictifs.','Document prepared in this browser. Nothing has been sent and no commercial commitment has been made. Products, prices, stock and VAT amounts are fictional.')));
}
function showDocument(doc) {
  openModal(l('Bon local prêt à consulter','Local document ready to view'),documentBody(doc),[button(l('Fermer','Close'),closeModal),button(l('Télécharger le bon','Download document'),() => downloadDocument(doc)),button(l('Imprimer / PDF','Print / PDF'),() => window.print(),{class:'primary'})]);
}
function downloadDocument(doc) {
  const body = documentBody(doc);
  const wrapper = document.createElement('html');wrapper.lang = lang;
  const head = h('head',{},h('meta',{charset:'utf-8'}),h('meta',{name:'viewport',content:'width=device-width,initial-scale=1'}),h('title',{},`${doc.number} · ${l('Bon local','Local document')}`),h('style',{},'body{font:15px/1.6 Arial,sans-serif;color:#17283f;max-width:850px;margin:36px auto;padding:20px}h3,p{margin:0 0 12px}.document-heading,.document-address{display:flex;justify-content:space-between;gap:40px;margin-bottom:28px}.document-table{width:100%;border-collapse:collapse}.document-table td,.document-table th{padding:12px 8px;border-bottom:1px solid #e5eaf1;text-align:left}.totals{max-width:340px;margin:28px 0 28px auto}.totals>div{display:flex;justify-content:space-between;gap:16px}.grand-total{border-top:1px solid #17283f;margin-top:10px;padding-top:10px;font-size:20px}.notice{padding:16px;background:#f7f9fd}.muted,.eyebrow{color:#5f6b7c}.eyebrow{font-size:12px;text-transform:uppercase}.table-scroll{overflow-x:auto}@media(max-width:550px){.document-address{display:block}}'));
  wrapper.append(head,h('body',{},body));
  const blob = new Blob(['<!doctype html>\n',wrapper.outerHTML],{type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = h('a',{href:url,download:`${doc.number}.html`});document.body.append(link);link.click();link.remove();setTimeout(() => URL.revokeObjectURL(url),1000);
  tell(l('Bon téléchargé au format HTML, lisible hors ligne.','Document downloaded as HTML, readable offline.'));
}
window.addEventListener('hashchange',() => {const next = location.hash.slice(1);if (['clients','catalog','drafts','history'].includes(next)) {view = next;render('view-title');}});
window.addEventListener('storage',event => {if (event.key === KEY && event.newValue !== lastRaw) {storageIssue = l('La démo a changé dans un autre onglet. Rechargez pour récupérer cette version. Votre session reste en mémoire.','The demo changed in another tab. Reload to recover that version. Your session stays in memory.');render();}});
render();
