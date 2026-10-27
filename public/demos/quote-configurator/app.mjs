import {STORAGE_KEY,catalog,customers,briefs,recommendationPlan,adaptVariant,createState,uid,isCurrent,issues,calculate,calculateVariant,duplicate,prepare,decodeState} from './model.mjs';

const lang=new URLSearchParams(location.search).get('lang')==='en'?'en':'fr';
const t=(fr,en)=>lang==='fr'?fr:en;
const name=value=>value[lang==='fr'?0:1];
const money=cents=>new Intl.NumberFormat(lang==='fr'?'fr-FR':'en-IE',{style:'currency',currency:'EUR'}).format(cents/100);
const date=value=>new Intl.DateTimeFormat(lang==='fr'?'fr-FR':'en-GB',{dateStyle:'medium',timeStyle:'short'}).format(new Date(value));
let state=createState(),section='configuration',query='',category='all',compareId='',storageOK=true,restoreMessage='',guidedOpen=location.hash==='#assistant';
try {const saved=localStorage.getItem(STORAGE_KEY);if(saved){state=decodeState(saved);restoreMessage=t('Votre préparation locale a été reprise.','Your local draft has been restored.');}}
catch {restoreMessage=t('La sauvegarde locale est illisible ou indisponible. Une nouvelle préparation est ouverte.','Local data is unreadable or unavailable. A new draft is open.');}
const active=()=>state.variants.find(variant=>variant.id===state.active);
const customer=(context=state.context)=>customers.find(item=>item.id===context.customer);
const opportunity=(context=state.context)=>customer(context).opportunities.find(item=>item.id===context.opportunity);
const app=document.getElementById('app');
document.documentElement.lang=lang;
document.title=t('Configuration de devis · TG','Quote configuration · TG');
document.querySelector('meta[name="description"]').content=t('Démonstration interactive de configuration et préparation de devis.','Interactive demonstration of configuration and quote preparation.');
document.querySelector('.skip').textContent=t('Aller au contenu','Skip to content');

function h(tag,attributes={},...children){
  const element=document.createElement(tag);
  children.flat(Infinity).forEach(child=>{if(child!==null&&child!==undefined&&child!==false)element.append(child instanceof Node?child:document.createTextNode(String(child)));});
  Object.entries(attributes).forEach(([key,value])=>{
    if(key.startsWith('on'))element.addEventListener(key.slice(2).toLowerCase(),value);
    else if(key==='class')element.className=value;
    else if(key==='value')element.value=value;
    else if(typeof value==='boolean')element[key]=value;
    else if(value!==null&&value!==undefined)element.setAttribute(key,String(value));
  });
  return element;
}
const button=(label,action,className='',attributes={})=>h('button',{type:'button',class:className,onClick:action,'data-focus':attributes['aria-label']||(typeof label==='string'?label:className),...attributes},label);
const badge=(label,current=false)=>h('span',{class:`badge${current?' current':''}`},label);
const field=(label,input,help='')=>h('label',{class:'field'},h('span',{},label),input,help?h('small',{},help):null);
const notice=h('div',{class:'notice',role:'status','aria-live':'polite'});
function say(message){notice.textContent=message;}
function persist(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));storageOK=true;}
  catch{storageOK=false;}
}
function update(action,message=''){
  const focused=document.activeElement?.id;
  action();persist();render();
  if(focused)document.getElementById(focused)?.focus({preventScroll:true});
  if(message)say(message);
}
function focusSection(){
  const title=document.querySelector('#section-content h2');title.tabIndex=-1;title.focus({preventScroll:true});
  const top=document.querySelector('.projectbar').getBoundingClientRect().top+window.scrollY-16;
  window.scrollTo({top,behavior:'instant'});
  if(title.getBoundingClientRect().bottom>window.innerHeight-24)title.scrollIntoView({block:'center',behavior:'instant'});
}
function navigate(next){section=next;render();focusSection();}
function changed(){active().calculated=null;}
function select(options,value,onChange,id){return h('select',{id,value,onChange:event=>onChange(event.target.value)},options.map(([key,label])=>h('option',{value:key},label)));}
function numberInput(id,value,min,max,onChange){return h('input',{id,type:'number',value,min,max,step:1,inputmode:'numeric',required:true,onInput:event=>{
  const input=event.target;
  if(!input.checkValidity()||input.value===''){say(t('Saisie en cours : une valeur entière dans les limites indiquées est nécessaire.','Input in progress: enter a whole number within the indicated limits.'));return;}
  update(()=>{onChange(Number(input.value));changed();});
},onChange:event=>{if(!event.target.checkValidity()||event.target.value===''){event.target.reportValidity();event.target.value=value;say(t('Valeur refusée. La dernière valeur valide est conservée.','Value rejected. The last valid value is retained.'));}}});}
function errorText(code){return ({usersSites:t('Prévoyez au moins un utilisateur par site.','Allow at least one user per site.'),connectorSetup:t('Le connecteur nécessite au moins une journée de paramétrage de site. Ajoutez-la depuis le catalogue.','The connector requires at least one site setup unit. Add it from the catalogue.'),stale:t('Recalculez cette variante avant de préparer le devis.','Recalculate this variant before preparing the quote.'),quoteLimit:t('La limite de 15 devis locaux est atteinte. Exportez vos devis avant de réinitialiser.','The limit of 15 local quotes has been reached. Export your quotes before resetting.'),variantLimit:t('Vous pouvez conserver cinq variantes au maximum.','You can keep up to five variants.')})[code]||t('Cette action est indisponible.','This action is unavailable.');}
function recalculate(){
  const invalid=app.querySelector('input:invalid,textarea:invalid');if(invalid){invalid.reportValidity();return;}
  if(!calculateVariant(state.context,active())){say(issues(active()).map(errorText).join(' '));navigate('configuration');return;}
  persist();render();document.getElementById('calculate').focus({preventScroll:true});say(t('Calcul actualisé. La variante peut être préparée.','Calculation updated. The variant is ready to prepare.'));
}
function addItem(id){update(()=>{
  const existing=active().items.find(item=>item.id===id);
  if(existing&&existing.quantity>=99)return;
  if(existing)existing.quantity++;else active().items.push({id,quantity:1});
  changed();
},t('Article ajouté. Recalcul nécessaire.','Item added. Recalculation required.'));}

function render(){
  const focused=document.activeElement,hadFocus=app.contains(focused),focusId=focused?.id,focusKey=focused?.getAttribute('data-focus');
  const selection=focused?.tagName==='TEXTAREA'||focused?.type==='text'?[focused.selectionStart,focused.selectionEnd]:null;
  const variant=active(),current=isCurrent(state.context,variant);
  const steps=[['context',t('Client & projet','Customer & project')],['configuration',t('Configuration','Configuration')],['catalogue',t('Articles & services','Items & services')],['comparison',t('Comparaison','Comparison')],['summary',t('Synthèse du devis','Quote summary')],['saved',t('Devis enregistrés','Saved quotes')]];
  app.replaceChildren(
    h('header',{class:'erp-header'},h('span',{class:'erp-brand'},t('Applications pour NetSuite','Applications for NetSuite'),h('span',{},' · TG')),
      h('span',{class:'erp-application'},t('Configuration & devis','Configuration & quoting')),h('span',{class:'erp-demo'},t('Démo locale · données fictives','Local demo · fictional data')),
      h('nav',{class:'erp-site-links','aria-label':t('Liens du site','Site links')},h('a',{href:`/${lang}/demos`},t('← Démonstrations','← Demonstrations')),h('a',{href:'?lang=fr',lang:'fr','aria-current':lang==='fr'?'page':null},'FR'),h('a',{href:'?lang=en',lang:'en','aria-current':lang==='en'?'page':null},'EN'))),
    h('nav',{class:'erp-navigation quote-navigation','aria-label':t('Étapes du devis','Quote steps')},steps.map(([key,label],index)=>button([h('span',{class:'step-number'},String(index+1).padStart(2,'0')),h('span',{},label),key==='saved'?h('span',{class:'count'},state.quotes.length):null],()=>navigate(key),'step',{'aria-current':section===key?'step':null}))),
    h('div',{class:'erp-record heading'},h('div',{},h('p',{class:'erp-breadcrumb'},t('Ventes / Propositions','Sales / Proposals')),h('h1',{},t('Proposition commerciale','Sales proposal'))),h('span',{class:'erp-record-status'},t('Préparation locale','Local preparation'))),
    h('div',{class:'projectbar'},h('div',{},h('strong',{},customer().name),h('span',{},name(opportunity().name))),h('div',{class:'projectmeta'},h('span',{},'EUR'),h('span',{},t('Projet de déploiement','Deployment project')),button(t('Changer le contexte','Change context'),()=>navigate('context'),'text-button'))),
    h('div',{class:'workspace-layout'},h('aside',{class:'sidebar'},h('div',{class:'storage'},h('strong',{},storageOK?t('Sauvegarde locale automatique','Automatic local saving'):t('Sauvegarde indisponible','Saving unavailable')),h('p',{},storageOK?t('La préparation reste dans ce navigateur.','The draft stays in this browser.'):t('Gardez cet onglet ouvert et téléchargez votre devis.','Keep this tab open and download your quote.')),button(t('Réinitialiser la démo','Reset demo'),resetDialog,'text-button'))),
      h('main',{id:'workspace',tabindex:'-1'},h('div',{class:'variantbar'},field(t('Variante active','Active variant'),select(state.variants.map(item=>[item.id,item.name]),variant.id,value=>update(()=>{state.active=value;}),'active-variant')),h('div',{class:'variant-actions'},badge(current?t('Calcul à jour','Calculation current'):t('À recalculer','Recalculation needed'),current),button(t('Dupliquer','Duplicate'),()=>{try{update(()=>duplicate(state,t(`Variante ${state.variants.length+1}`,`Variant ${state.variants.length+1}`)),t('Variante indépendante créée.','Independent variant created.'));}catch(error){say(errorText(error.message));}},'',{disabled:state.variants.length>=5,title:t('Cinq variantes maximum','Maximum five variants')}))),
        notice,h('div',{id:'section-content'},({context:contextView,configuration:configurationView,catalogue:catalogueView,comparison:comparisonView,summary:summaryView,saved:savedView})[section]())),
      h('aside',{class:'quote-sidebar','aria-label':t('Montants de la variante','Variant amounts')},totalsPanel(variant)),guidedPanel()),
    h('footer',{class:'app-footer'},h('span',{},t('Configurateur de devis · TG Tech','Quote configurator · TG Tech')),h('a',{href:`/${lang}/contact`},t('Contactez TG Tech','Contact TG Tech')),h('span',{},t('Données fictives · Aucun envoi','Fictional data · No sending')))
  );
  const target=focusId?document.getElementById(focusId):focusKey?[...app.querySelectorAll('[data-focus]')].find(element=>element.getAttribute('data-focus')===focusKey):null;
  if(target&&!target.disabled){target.focus({preventScroll:true});if(selection&&target.setSelectionRange)target.setSelectionRange(...selection);}
  else if(hadFocus)document.getElementById('workspace').focus({preventScroll:true});
}

function contextView(){return h('section',{class:'panel'},h('h2',{},t('Client & projet','Customer & project')),h('p',{class:'section-description'},t('Le contexte est commun aux variantes. Le modifier impose de recalculer chaque variante.','All variants share this context. Changing it requires every variant to be recalculated.')),
  h('div',{class:'form-grid'},field(t('Client','Customer'),select(customers.map(item=>[item.id,item.name]),state.context.customer,value=>update(()=>{state.context.customer=value;state.context.opportunity=customer().opportunities[0].id;state.variants.forEach(item=>item.calculated=null);},t('Contexte modifié. Les calculs des variantes sont invalidés.','Context changed. All variant calculations are invalidated.')),'customer')),
  field(t('Opportunité','Opportunity'),select(customer().opportunities.map(item=>[item.id,name(item.name)]),state.context.opportunity,value=>update(()=>{state.context.opportunity=value;state.variants.forEach(item=>item.calculated=null);}),'opportunity'))),
  h('dl',{class:'details'},h('div',{},h('dt',{},t('Secteur','Industry')),h('dd',{},name(customer().sector))),h('div',{},h('dt',{},t('Localisation','Location')),h('dd',{},customer().city)),h('div',{},h('dt',{},t('Contact du projet','Project contact')),h('dd',{},customer().contact)),h('div',{},h('dt',{},t('Conditions proposées','Proposed terms')),h('dd',{},t('Paiement à 30 jours · EUR','Payment within 30 days · EUR')))),
  h('div',{class:'project-brief'},h('p',{class:'eyebrow'},t('BRIEF DE L’OPPORTUNITÉ','OPPORTUNITY BRIEF')),h('h3',{},name(opportunity().name)),h('p',{},name(briefs[state.context.opportunity].summary)),h('ol',{},briefs[state.context.opportunity].needs.map(need=>h('li',{},h('strong',{},name(need.title)),h('p',{},name(need.reason))))),button(t('Étudier les recommandations','Review recommendations'),showRecommendations)),
  h('div',{class:'callout'},h('strong',{},t('Un contexte pour comparer des offres cohérentes','One context for consistent comparisons')),h('p',{},t('Les configurations et quantités sont conservées lors d’un changement de projet. Vérifiez leur adéquation avant un nouveau calcul.','Configurations and quantities are retained when changing project. Review their suitability before calculating again.'))),
  button(t('Configurer l’offre →','Configure the offer →'),()=>navigate('configuration'),'primary'));
}

function configurationView(){const v=active(),c=v.config;return h('section',{class:'panel'},h('div',{class:'section-heading'},h('div',{},h('h2',{},t('Configuration de l’offre','Offer configuration')),h('p',{class:'section-description'},t('Définissez le périmètre. Les licences s’adaptent aux sites et aux utilisateurs.','Define the scope. Licences adjust to your sites and users.'))),h('span',{class:'section-index'},'01 / 03')),
  h('div',{class:'brief-hint'},h('strong',{},t('Besoin exprimé · ','Stated requirement · '),name(opportunity().name)),h('p',{},name(briefs[state.context.opportunity].summary)),button(t('Voir les adaptations proposées','View proposed adjustments'),showRecommendations,'text-button')),
  field(t('Nom de la variante','Variant name'),h('input',{id:'variant-name',type:'text',value:v.name,maxlength:60,required:true,onInput:event=>{const value=event.target.value;if(!value.trim())return;update(()=>v.name=value);},onChange:event=>{if(!event.target.value.trim())event.target.value=v.name;}})),
  h('div',{class:'form-block'},h('h3',{},t('Périmètre de déploiement','Deployment scope')),h('div',{class:'form-grid'},field(t('Nombre de sites','Number of sites'),numberInput('sites',c.sites,1,20,value=>c.sites=value),t('Socle annuel : 2 400 € / site','Annual platform: €2,400 / site')),field(t('Utilisateurs nominatifs','Named users'),numberInput('users',c.users,1,500,value=>c.users=value),t('Licence annuelle : 144 € / utilisateur','Annual licence: €144 / user')),
  field(t('Durée du contrat','Contract term'),select([12,24,36].map(value=>[String(value),t(`${value} mois`,`${value} months`)]),String(c.months),value=>update(()=>{c.months=Number(value);changed();}),'months')),
  field(t('Niveau d’assistance','Support level'),select([['standard',t('Standard · inclus','Standard · included')],['priority',t('Prioritaire · +12 % / an','Priority · +12% / year')]],c.support,value=>update(()=>{c.support=value;changed();}),'support')))),
  h('div',{class:'form-block'},h('h3',{},t('Modules fonctionnels','Functional modules')),h('p',{class:'section-description'},t('Sélectionnez vos modules. Les quantités s’ajustent dans Articles & services.','Select your modules. Adjust quantities in Items & services.')),
  h('div',{class:'module-grid'},catalog.filter(product=>product.type==='module').map(product=>h('label',{class:`module-option${v.items.some(item=>item.id===product.id)?' selected':''}`},h('input',{id:`module-${product.id}`,type:'checkbox',checked:v.items.some(item=>item.id===product.id),onChange:event=>update(()=>{if(event.target.checked)v.items.push({id:product.id,quantity:1});else v.items=v.items.filter(item=>item.id!==product.id);changed();})}),h('span',{},h('strong',{},name(product.name)),h('small',{},name(product.description)),h('span',{class:'module-price'},`${money(product.price)} / ${t('an','year')}`)))))),
  h('div',{class:'form-block'},h('h3',{},t('Conditions commerciales','Commercial terms')),h('div',{class:'form-grid'},field(t('Remise sur les abonnements (%)','Subscription discount (%)'),numberInput('discount',c.discount,0,15,value=>c.discount=value),t('De 0 à 15 %, assistance comprise.','From 0 to 15%, including support.')),h('div',{class:'field'},h('span',{},t('TVA de simulation','Simulation VAT')),h('p',{class:'readonly'},'20 %'),h('small',{},t('Taux fictif fixe pour cette démonstration.','Fixed fictional rate for this demonstration.')))),field(t('Notes de la proposition','Proposal notes'),h('textarea',{id:'notes',rows:3,maxlength:1000,value:c.notes,placeholder:t('Périmètre, hypothèses ou points à confirmer…','Scope, assumptions or points to confirm…'),onInput:event=>update(()=>{c.notes=event.target.value;changed();})}))),
  issues(v).length?h('div',{class:'validation',role:'alert'},issues(v).map(code=>h('p',{},errorText(code)))):null,
  h('div',{class:'section-bottom'},h('span',{},t('Les services et équipements se sélectionnent à l’étape suivante.','Select services and equipment in the next step.')),button(t('Articles & services →','Items & services →'),()=>navigate('catalogue'),'primary')));
}

function catalogueView(){const area=h('div',{id:'catalog-results'});function results(){area.replaceChildren(catalogTable());}
  const search=h('input',{id:'catalog-search',type:'search',value:query,placeholder:t('Rechercher un article, une référence…','Search for an item or reference…'),onInput:event=>{query=event.target.value;results();}});
  results();return h('section',{class:'panel'},h('div',{class:'section-heading'},h('div',{},h('h2',{},t('Articles & services','Items & services')),h('p',{class:'section-description'},t('Complétez l’offre, puis ajustez les quantités de chaque ligne.','Complete your offer, then adjust quantities on each line.'))),h('span',{class:'section-index'},'02 / 03')),
  h('div',{class:'catalog-tools'},field(t('Rechercher dans le catalogue','Search the catalogue'),search),field(t('Catégorie','Category'),select([['all',t('Toutes les catégories','All categories')],['module',t('Modules','Modules')],['service',t('Services','Services')],['equipment',t('Équipements','Equipment')]],category,value=>{category=value;results();},'category'))),area,
  h('div',{class:'basket-heading'},h('h3',{},t('Votre sélection','Your selection')),h('span',{},t('Les deux licences de base sont automatiques.','The two base licences are automatic.'))),basketTable(),
  h('div',{class:'section-bottom'},button(t('← Configuration','← Configuration'),()=>navigate('configuration')),button(t('Voir la synthèse →','View summary →'),()=>navigate('summary'),'primary')));
}
function catalogTable(){const products=catalog.filter(product=>(category==='all'||product.type===category)&&`${name(product.name)} ${product.sku} ${name(product.description)}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return h('div',{class:'catalog-list'},products.length?products.map(product=>{const item=active().items.find(item=>item.id===product.id);return h('article',{class:'catalog-row'},h('div',{},h('h3',{},name(product.name)),h('p',{},name(product.description)),h('span',{class:'sku'},product.sku)),h('div',{class:'catalog-price'},h('strong',{},money(product.price)),h('span',{},product.recurring?t('par an','per year'):t('ponctuel','one-time'))),button(item?t(`Ajouter · ${item.quantity} sélectionné(s)`,`Add · ${item.quantity} selected`):t('Ajouter','Add'),()=>addItem(product.id),'',{disabled:item?.quantity>=99,'aria-label':t(`Ajouter ${name(product.name)}`,`Add ${name(product.name)}`)}));}):h('p',{class:'empty'},t('Aucun article ne correspond à cette recherche.','No items match this search.')));
}
function basketTable(){const lines=calculate(active()).lines;return h('div',{class:'table-scroll',tabindex:'0','aria-label':t('Articles sélectionnés','Selected items')},h('table',{class:'basket'},h('thead',{},h('tr',{},[t('Article','Item'),t('Quantité','Quantity'),t('Prix unitaire HT','Unit price excl. VAT'),t('Sous-total HT','Subtotal excl. VAT'),t('Action','Action')].map(label=>h('th',{scope:'col'},label)))),h('tbody',{},lines.map(line=>h('tr',{},h('td',{},h('strong',{},name(line.name)),h('small',{},line.sku,' · ',line.recurring?t('annuel','annual'):t('ponctuel','one-time'))),h('td',{},['core','users','support'].includes(line.id)?line.quantity:field(t(`Quantité — ${name(line.name)}`,`Quantity — ${name(line.name)}`),numberInput(`quantity-${line.id}`,line.quantity,1,99,value=>{active().items.find(item=>item.id===line.id).quantity=value;}))),h('td',{},money(line.price)),h('td',{},money(line.amount)),h('td',{},['core','users','support'].includes(line.id)?h('span',{class:'auto-label'},t('Automatique','Automatic')):button(t('Retirer','Remove'),()=>update(()=>{active().items=active().items.filter(item=>item.id!==line.id);changed();}),'text-button',{'aria-label':t(`Retirer ${name(line.name)}`,`Remove ${name(line.name)}`)})))))));
}

function totalsPanel(variant){const current=isCurrent(state.context,variant),result=calculate(variant);return h('div',{class:'total-panel'},h('p',{class:'eyebrow'},t('VARIANTE ACTIVE','ACTIVE VARIANT')),h('h2',{},variant.name),h('div',{class:'total-main'},h('span',{},t(`Total HT · ${variant.config.months} mois`,`Total excl. VAT · ${variant.config.months} months`)),h('strong',{},current?money(result.net):'—'),h('small',{},current?t('Calcul lié à la configuration actuelle.','Calculated for the current configuration.'):t('Recalculez pour obtenir le montant courant.','Recalculate to obtain the current amount.'))),
  h('dl',{class:'total-lines'},amountRow(t('Abonnements / an','Subscriptions / year'),current?money(result.annual):'—'),amountRow(t('Services & équipements','Services & equipment'),current?money(result.once):'—'),amountRow(t(`Remise (${variant.config.discount} %)`,`Discount (${variant.config.discount}%)`),current?`− ${money(result.discount)}`:'—'),amountRow(t('TVA de simulation (20 %)','Simulation VAT (20%)'),current?money(result.tax):'—'),amountRow(t('Total TTC','Total incl. VAT'),current?money(result.total):'—')),
  button(current?t('Recalculer','Recalculate'):t('Calculer la variante','Calculate variant'),recalculate,'primary',{id:'calculate'}),button(t('Préparer le devis','Prepare quote'),saveQuote,'',{disabled:!current||issues(variant).length>0,id:'prepare'}),
  h('div',{class:'scope-summary'},h('span',{},t(`${variant.config.sites} sites · ${variant.config.users} utilisateurs`,`${variant.config.sites} sites · ${variant.config.users} users`)),h('span',{},t(`${result.lines.length} lignes dans l’offre`,`${result.lines.length} offer lines`))),h('p',{class:'fine-print'},t('Montants inventés. La préparation crée un devis dans ce navigateur uniquement.','Invented amounts. Preparation creates a quote only in this browser.')));
}
function amountRow(label,value){return h('div',{},h('dt',{},label),h('dd',{},value));}

function changeLabel(change){
  const label=change.kind==='item'?name(catalog.find(item=>item.id===change.key).name):({sites:t('Sites','Sites'),users:t('Utilisateurs','Users'),support:t('Assistance','Support')})[change.key];
  const value=input=>input==='priority'?t('Prioritaire','Priority'):input==='standard'?t('Standard','Standard'):input;
  return `${label} : ${value(change.before)} → ${value(change.after)}`;
}
function createAdapted(){try{
  const sourceId=state.active;
  update(()=>{adaptVariant(state,lang);compareId=sourceId;section='comparison';},t('Variante adaptée créée. La source est conservée. Recalculez la nouvelle variante avant de préparer le devis.','Adapted variant created. The source is retained. Recalculate the new variant before preparing the quote.'));
  focusSection();
}catch(error){say(error.message==='alreadyCovered'?t('Cette variante couvre déjà les minimums du brief.','This variant already meets the brief’s minimum requirements.'):errorText(error.message));}}
function showRecommendations(){if(location.hash!=='#assistant')location.hash='assistant';else openGuided();}
function guidedPanel(){const plan=recommendationPlan(state.context,active());return h('details',{id:'assistant',class:'guided-panel',open:guidedOpen,onToggle:event=>{if(event.target.isConnected)guidedOpen=event.target.open;}},h('summary',{},t('Actions guidées','Guided actions')),
  h('p',{class:'eyebrow'},t('À PARTIR DU BRIEF','BASED ON THE BRIEF')),h('h3',{},name(opportunity().name)),h('p',{},name(plan.brief.summary)),
  h('div',{class:'recommendation-list'},plan.rows.map((row,index)=>h('article',{class:'recommendation'},h('span',{class:'recommendation-ref'},row.dependency?t('Dépendance du catalogue','Catalogue dependency'):t(`Besoin ${index+1}`,`Requirement ${index+1}`)),h('h4',{},name(row.title)),h('p',{},name(row.reason)),row.changes.length?h('ul',{},row.changes.map(change=>h('li',{},changeLabel(change)))):h('p',{class:'covered'},t('Minimum déjà couvert · aucun changement','Minimum already covered · no change'))))),
  h('div',{class:'retained-scope'},h('strong',{},t('Source : ','Source: '),active().name),h('p',{},t('Relève les minimums du brief. Conserve les quantités supérieures, les autres articles, la durée, la remise et vos notes. Vérifiez ces choix avant de chiffrer.','Raises the brief’s minimums. Retains higher quantities, other items, term, discount and your notes. Review these choices before pricing.'))),
  button(t('Créer une variante adaptée','Create an adapted variant'),createAdapted,'primary',{id:'create-adapted',disabled:state.variants.length>=5||!plan.changed}),
  h('small',{},state.variants.length>=5?errorText('variantLimit'):!plan.changed?t('Cette variante couvre déjà tous les minimums du brief.','This variant already meets all the brief’s minimum requirements.'):t('Copie indépendante · calcul explicitement requis.','Independent copy · explicit calculation required.')),
  button(t('Lire le brief du projet','Read the project brief'),()=>navigate('context'),'text-button'),
  button(t('Comparer mes variantes','Compare my variants'),()=>navigate('comparison')),
  button(t('Ouvrir la synthèse calculée','Open the calculated summary'),()=>navigate('summary'),'',{disabled:!isCurrent(state.context,active())}),
  h('small',{},isCurrent(state.context,active())?t('La synthèse est prête à être vérifiée.','The summary is ready to review.'):t('Calculez la variante pour activer la synthèse.','Calculate the variant to enable the summary.')));
}

function briefCoverage(context,variant){const plan=recommendationPlan(context,variant);return h('div',{class:'brief-coverage'},h('h3',{},t('Lien avec le brief du projet','How this meets the project brief')),h('p',{},name(plan.brief.summary)),h('ul',{},plan.rows.map(row=>h('li',{},h('strong',{},name(row.title)),h('span',{},' — ',row.changes.length?t('À examiner : ','To review: ')+row.changes.map(changeLabel).join('; '):t('Minimum couvert','Minimum met'))))),h('p',{class:'fine-print'},t('Couverture du périmètre demandé, sans engagement de résultat. Des options supplémentaires peuvent être conservées dans l’offre.','Coverage of the requested scope, with no outcome commitment. The offer may retain additional options.')));}

function comparisonView(){const v=active(),alternatives=state.variants.filter(item=>item.id!==v.id);if(!alternatives.length)return h('section',{class:'panel'},h('h2',{},t('Comparer vos variantes','Compare variants')),h('div',{class:'empty'},h('h3',{},t('Une seconde approche à explorer ?','Want to explore a second approach?')),h('p',{},t('Dupliquez la variante active, modifiez son périmètre et recalculez les deux offres pour comparer les montants.','Duplicate the active variant, change its scope and calculate both offers to compare amounts.')),button(t('Créer une variante','Create a variant'),()=>update(()=>duplicate(state,t('Extension','Expansion'))),'primary')));
  if(!alternatives.some(item=>item.id===compareId))compareId=alternatives[0].id;
  const other=alternatives.find(item=>item.id===compareId),a=calculate(v),b=calculate(other),both=isCurrent(state.context,v)&&isCurrent(state.context,other);
  const rows=[[t('Sites','Sites'),v.config.sites,other.config.sites],[t('Utilisateurs','Users'),v.config.users,other.config.users],[t('Durée (mois)','Term (months)'),v.config.months,other.config.months],[t('Assistance','Support'),v.config.support==='priority'?t('Prioritaire','Priority'):t('Standard','Standard'),other.config.support==='priority'?t('Prioritaire','Priority'):t('Standard','Standard')],[t('Remise (%)','Discount (%)'),v.config.discount,other.config.discount],...catalog.filter(product=>v.items.some(item=>item.id===product.id)||other.items.some(item=>item.id===product.id)).map(product=>[name(product.name),v.items.find(item=>item.id===product.id)?.quantity||0,other.items.find(item=>item.id===product.id)?.quantity||0]),[t('Total HT','Total excl. VAT'),both?money(a.net):'—',both?money(b.net):'—']];
  return h('section',{class:'panel'},h('h2',{},t('Comparer vos variantes','Compare variants')),h('p',{class:'section-description'},t('Les lignes mettent en évidence les différences de périmètre et de quantité.','The rows highlight differences in scope and quantity.')),field(t('Comparer la variante active avec','Compare the active variant with'),select(alternatives.map(item=>[item.id,item.name]),compareId,value=>{compareId=value;render();},'compare-variant')),
    h('div',{class:'comparison-note'},both?h('p',{},t('Écart HT de la variante active : ','Active variant difference excl. VAT: '),h('strong',{},`${a.net>=b.net?'+ ': '− '}${money(Math.abs(a.net-b.net))}`)):h('p',{},t('Calculez chaque variante pour afficher des montants comparables.','Calculate both variants to display comparable amounts.'))),
    h('div',{class:'table-scroll',tabindex:0},h('table',{class:'comparison'},h('thead',{},h('tr',{},h('th',{scope:'col'},t('Critère','Criterion')),h('th',{scope:'col'},v.name),h('th',{scope:'col'},other.name))),h('tbody',{},rows.map(([label,left,right])=>h('tr',{class:left!==right?'difference':''},h('th',{scope:'row'},label),h('td',{},left),h('td',{},right)))))),
    h('div',{class:'section-bottom'},h('span',{},t('Les cellules colorées signalent une différence.','Highlighted cells indicate a difference.')),button(t('Ouvrir l’autre variante','Open other variant'),()=>{update(()=>{state.active=other.id;compareId=v.id;section='configuration';});focusSection();})));
}

function quoteDetails(context,variant){const result=calculate(variant);return h('div',{class:'quote-document'},h('div',{class:'document-context'},h('div',{},h('p',{class:'eyebrow'},t('PRÉPARÉ POUR','PREPARED FOR')),h('h3',{},customer(context).name),h('p',{},name(opportunity(context).name))),h('div',{},h('p',{class:'eyebrow'},t('PÉRIMÈTRE','SCOPE')),h('p',{},t(`${variant.config.sites} sites · ${variant.config.users} utilisateurs`,`${variant.config.sites} sites · ${variant.config.users} users`)),h('p',{},t(`Contrat de ${variant.config.months} mois`,`Contract term: ${variant.config.months} months`)))),
  briefCoverage(context,variant),h('div',{class:'table-scroll',tabindex:0},h('table',{},h('thead',{},h('tr',{},[t('Désignation','Description'),t('Qté','Qty'),t('Tarif HT','Price excl. VAT'),t('Montant HT','Amount excl. VAT')].map(label=>h('th',{scope:'col'},label)))),h('tbody',{},result.lines.map(line=>h('tr',{},h('td',{},name(line.name),h('small',{},line.recurring?t('Annuel · avant remise','Annual · before discount'):t('Ponctuel','One-time'))),h('td',{},line.quantity),h('td',{},money(line.price)),h('td',{},money(line.amount))))))),
  h('dl',{class:'document-totals'},amountRow(t(`Abonnements sur ${variant.config.months} mois`,`Subscriptions over ${variant.config.months} months`),money(result.subscription)),amountRow(t('Remise sur abonnements','Subscription discount'),`− ${money(result.discount)}`),amountRow(t('Services & équipements','Services & equipment'),money(result.once)),amountRow(t('Total HT','Total excl. VAT'),money(result.net)),amountRow(t('TVA de simulation (20 %)','Simulation VAT (20%)'),money(result.tax)),amountRow(t('Total TTC','Total incl. VAT'),money(result.total))),variant.config.notes?h('div',{class:'document-notes'},h('h3',{},t('Notes de la proposition','Proposal notes')),h('p',{},variant.config.notes)):null,h('p',{class:'fine-print'},t('Offre fictive en EUR. Paiement à 30 jours. Prix annuels fixes pendant la durée du contrat. Validité de la proposition : 30 jours.','Fictional offer in EUR. Payment within 30 days. Annual prices fixed throughout the contract term. Proposal valid for 30 days.')));
}
function summaryView(){const v=active();return h('section',{class:'panel'},h('div',{class:'section-heading'},h('div',{},h('h2',{},t('Synthèse du devis','Quote summary')),h('p',{class:'section-description'},t('Contrôlez le détail avant d’enregistrer une copie locale.','Review the details before saving a local copy.'))),h('span',{class:'section-index'},'03 / 03')),
  isCurrent(state.context,v)?quoteDetails(state.context,v):h('div',{class:'empty'},h('h3',{},t('Le calcul doit être actualisé.','The calculation needs updating.')),h('p',{},t('Le montant précédent ne représente plus la configuration. Cliquez sur Calculer la variante pour établir la synthèse.','The previous amount no longer represents this configuration. Select Calculate variant to generate the summary.')),button(t('Calculer la variante','Calculate variant'),recalculate,'primary')),
  h('div',{class:'section-bottom'},button(t('Comparer les variantes','Compare variants'),()=>navigate('comparison')),button(t('Préparer le devis','Prepare quote'),saveQuote,'primary',{disabled:!isCurrent(state.context,v)||issues(v).length>0})));
}
function saveQuote(){const invalid=app.querySelector('input:invalid,textarea:invalid');if(invalid){invalid.reportValidity();return;}try{const quote=prepare(state);persist();section='saved';render();openQuote(quote);say(storageOK?t('Devis enregistré dans ce navigateur.','Quote saved in this browser.'):t('Devis préparé en mémoire. Téléchargez-le : le stockage est indisponible.','Quote prepared in memory. Download it: storage is unavailable.'));}catch(error){say(errorText(error.message));}}
function savedView(){return h('section',{class:'panel'},h('h2',{},t('Devis enregistrés','Saved quotes')),h('p',{class:'section-description'},t('Chaque devis conserve le contexte, les options et les montants du moment de sa préparation.','Each quote retains its context, options and amounts at the time it was prepared.')),
  state.quotes.length?h('div',{class:'saved-list'},state.quotes.map(quote=>h('article',{class:'saved-row'},h('div',{},h('span',{class:'sku'},quote.reference),h('h3',{},quote.variant.name),h('p',{},customer(quote.context).name,' · ',name(opportunity(quote.context).name)),h('small',{},date(quote.created))),h('div',{class:'saved-amount'},h('strong',{},money(calculate(quote.variant).net)),h('small',{},t('HT','excl. VAT'))),h('div',{class:'saved-actions'},button(t('Consulter','View'),()=>openQuote(quote)),button(t('Reprendre','Resume'),()=>resumeQuote(quote),'text-button',{disabled:state.variants.length>=5,title:t('Crée une variante, cinq maximum','Creates a variant, maximum five')})))))
  :h('div',{class:'empty'},h('h3',{},t('Aucun devis enregistré','No saved quotes')),h('p',{},t('Calculez une variante, puis préparez le devis pour en conserver une copie.','Calculate a variant, then prepare the quote to keep a copy.')),button(t('Retour à la configuration','Back to configuration'),()=>navigate('configuration'),'primary')));
}

function dialog(title,content,actions=[]){
  const previous=document.activeElement;
  const modal=h('dialog',{'aria-labelledby':'dialog-title'},h('div',{class:'dialog-heading'},h('h2',{id:'dialog-title'},title),button(t('Fermer','Close'),()=>modal.close(),'text-button')),content,h('div',{class:'dialog-actions'},actions));
  modal.addEventListener('close',()=>{modal.remove();if(previous?.isConnected)previous.focus();});
  document.body.append(modal);modal.showModal();return modal;
}
function openQuote(quote){dialog(`${quote.reference} · ${quote.variant.name}`,h('div',{},h('p',{class:'section-description'},t('Enregistré localement le ','Saved locally on '),date(quote.created)),quoteDetails(quote.context,quote.variant)),[button(t('Télécharger le devis HTML','Download HTML quote'),()=>downloadQuote(quote),'primary'),button(t('Imprimer','Print'),()=>window.print())]);}
function resumeQuote(quote){if(state.variants.length>=5){say(errorText('variantLimit'));return;}
  const proceed=()=>{update(()=>{const v=structuredClone(quote.variant);v.id=uid();v.name=t('Reprise — ','Resumed — ')+v.name.slice(0,48);v.calculated=null;state.context=structuredClone(quote.context);state.variants.forEach(item=>item.calculated=null);state.variants.push(v);state.active=v.id;section='configuration';},t('Devis repris dans une nouvelle variante. Recalcul nécessaire.','Quote resumed in a new variant. Recalculation required.'));focusSection();};
  if(JSON.stringify(quote.context)!==JSON.stringify(state.context)){
    const modal=dialog(t('Reprendre ce projet ?','Resume this project?'),h('p',{},t('Le client et l’opportunité actifs seront remplacés par ceux de ce devis. Les variantes actuelles seront conservées, avec leur calcul invalidé.','The active customer and opportunity will be replaced by those in this quote. Current variants will be retained with their calculations invalidated.')),[button(t('Annuler','Cancel'),()=>modal.close()),button(t('Reprendre le devis','Resume quote'),()=>{modal.close();proceed();},'primary')]);
  }else proceed();
}
function resetDialog(){const modal=dialog(t('Réinitialiser cette démonstration ?','Reset this demonstration?'),h('p',{},t('Les variantes et devis enregistrés de cette démonstration seront supprimés de ce navigateur. Téléchargez les devis à conserver avant de continuer.','This demonstration’s variants and saved quotes will be removed from this browser. Download any quotes you wish to keep before continuing.')),[button(t('Annuler','Cancel'),()=>modal.close()),button(t('Réinitialiser','Reset'),()=>{modal.close();update(()=>{state=createState();section='configuration';query='';category='all';},t('Démonstration réinitialisée.','Demonstration reset.'));},'primary')]);}
function downloadQuote(quote){
  const doc=document.implementation.createHTMLDocument(`${quote.reference} — ${quote.variant.name}`);doc.documentElement.lang=lang;
  const charset=doc.createElement('meta');charset.setAttribute('charset','utf-8');doc.head.prepend(charset);
  const viewport=doc.createElement('meta');viewport.name='viewport';viewport.content='width=device-width,initial-scale=1';doc.head.append(viewport);
  const css=doc.createElement('style');css.textContent='body{font:15px/1.6 Arial,sans-serif;color:#17283f;max-width:920px;margin:40px auto;padding:24px}h1{font-size:28px}h2,h3{font-weight:500}table{width:100%;border-collapse:collapse;margin:24px 0}th,td{text-align:left;border-bottom:1px solid #e5eaf1;padding:10px}small{display:block;color:#5f6b7c}.document-context{display:flex;justify-content:space-between;gap:30px}.document-totals{max-width:450px;margin-left:auto}.document-totals div{display:flex;justify-content:space-between;gap:24px;padding:8px 0}.document-totals dd{margin:0;font-weight:bold}.document-notes p{white-space:pre-wrap}.fine-print,.eyebrow{color:#5f6b7c}.table-scroll{overflow:auto}@media(max-width:600px){body{margin:0;padding:16px}.document-context{display:block}}@media print{body{margin:0;padding:0}table{font-size:12px}}';doc.head.append(css);
  doc.body.append(h('p',{},t('Données de démonstration · TG Tech','Demonstration data · TG Tech')),h('h1',{},quote.reference,' · ',quote.variant.name),h('p',{},date(quote.created)),quoteDetails(quote.context,quote.variant));
  const blob=new Blob(['<!doctype html>\n',doc.documentElement.outerHTML],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),link=h('a',{href:url,download:`${quote.reference}.html`});document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  say(t('Le fichier HTML du devis a été téléchargé.','The HTML quote file has been downloaded.'));
}
function openGuided(){if(location.hash!=='#assistant')return;guidedOpen=true;const panel=document.getElementById('assistant');panel.open=true;const title=panel.querySelector('summary');title.scrollIntoView({block:'start',behavior:'instant'});title.focus({preventScroll:true});}
persist();render();if(restoreMessage)say(restoreMessage);
window.addEventListener('hashchange',openGuided);if(guidedOpen)requestAnimationFrame(openGuided);
