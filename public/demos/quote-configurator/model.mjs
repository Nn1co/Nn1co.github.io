export const STORAGE_KEY = 'tg-demo-quote-v1';
export const catalog = [
  {id:'workflow',sku:'DM-WF-01',name:['Circuits de validation','Approval workflows'],description:['Approbations et suivi des demandes.','Approvals and request tracking.'],type:'module',price:90000,recurring:true},
  {id:'reporting',sku:'DM-RP-01',name:['Analyses et rapports','Analytics and reports'],description:['Tableaux de bord et exports planifiés.','Dashboards and scheduled exports.'],type:'module',price:72000,recurring:true},
  {id:'portal',sku:'DM-PT-01',name:['Portail partenaires','Partner portal'],description:['Un espace partagé pour vos partenaires.','A shared workspace for your partners.'],type:'module',price:120000,recurring:true},
  {id:'connector',sku:'DM-CN-01',name:['Connecteur de données','Data connector'],description:['Une source connectée par licence.','One connected source per licence.'],type:'module',price:48000,recurring:true},
  {id:'archive',sku:'DM-AR-01',name:['Archivage documentaire','Document archive'],description:['Classement et historique des documents.','Document filing and history.'],type:'module',price:60000,recurring:true},
  {id:'kickoff',sku:'DM-SV-01',name:['Cadrage du projet','Project discovery'],description:['Un atelier de cadrage et un plan projet.','One discovery workshop and a project plan.'],type:'service',price:125000,recurring:false},
  {id:'migration',sku:'DM-SV-02',name:['Reprise des données','Data migration'],description:['Préparation et contrôle, par journée.','Preparation and checks, per day.'],type:'service',price:45000,recurring:false},
  {id:'training',sku:'DM-SV-03',name:['Formation des équipes','Team training'],description:['Une session pour huit participants.','One session for eight participants.'],type:'service',price:65000,recurring:false},
  {id:'delivery',sku:'DM-SV-04',name:['Accompagnement au lancement','Launch support'],description:['Assistance au démarrage, par journée.','Go-live support, per day.'],type:'service',price:55000,recurring:false},
  {id:'station',sku:'DM-EQ-01',name:['Terminal de saisie','Entry terminal'],description:['Poste dédié à la saisie sur site.','A dedicated on-site entry station.'],type:'equipment',price:89000,recurring:false},
  {id:'reader',sku:'DM-EQ-02',name:['Lecteur de documents','Document reader'],description:['Capture des documents au point d’accueil.','Document capture at the reception desk.'],type:'equipment',price:32000,recurring:false},
  {id:'setup',sku:'DM-SV-05',name:['Paramétrage d’un site','Site setup'],description:['Configuration et recette d’un site.','Configuration and acceptance for one site.'],type:'service',price:75000,recurring:false}
];
export const customers = [
  {id:'aurive',name:'Aurive Atelier',sector:['Fabrication & distribution','Manufacturing & distribution'],city:'Lyon',contact:'Camille Vernet',opportunities:[{id:'aurive-rollout',name:['Déploiement des opérations','Operations rollout']},{id:'aurive-partners',name:['Espace partenaires','Partner workspace']}]},
  {id:'norelle',name:'Norelle Services',sector:['Services aux entreprises','Business services'],city:'Namur',contact:'Alex Morel',opportunities:[{id:'norelle-hub',name:['Centralisation des équipes','Team centralisation']},{id:'norelle-extension',name:['Extension des sites','Site expansion']}]},
  {id:'velori',name:'Velori Distribution',sector:['Logistique & distribution','Logistics & distribution'],city:'Lille',contact:'Sacha Delcourt',opportunities:[{id:'velori-modern',name:['Modernisation des outils','Tool modernisation']}]}
];
export const briefs = {
  'aurive-rollout': {
    summary:['Les demandes des ateliers arrivent par fichiers séparés. Le projet réunit trois sites et 36 personnes autour d’un circuit de validation commun, avec un suivi mensuel pour les coordinateurs.','Workshop requests arrive in separate files. The project brings three sites and 36 people onto one approval process, with monthly reporting for coordinators.'],
    variant:['Déploiement coordonné','Coordinated rollout'],
    needs:[
      {title:['Équiper les trois ateliers','Equip all three workshops'],reason:['Le brief prévoit 36 utilisateurs nominatifs sur trois sites.','The brief calls for 36 named users across three sites.'],config:{sites:3,users:36}},
      {title:['Valider et suivre les demandes','Approve and track requests'],reason:['Les responsables valident les demandes ; les coordinateurs doivent consulter un rapport mensuel consolidé.','Managers approve requests; coordinators need a consolidated monthly report.'],items:[{id:'workflow',quantity:1},{id:'reporting',quantity:1}]},
      {title:['Préparer les données et les équipes','Prepare data and teams'],reason:['Une source de données est à raccorder et chaque site à paramétrer. Cinq sessions de huit places couvrent les 36 participants.','One data source needs connecting and each site needs setup. Five eight-person sessions cover the 36 participants.'],items:[{id:'connector',quantity:1},{id:'setup',quantity:3},{id:'training',quantity:5}]}
    ]
  },
  'aurive-partners': {
    summary:['L’équipe échange les dossiers de ses partenaires par courriel. Le projet prévoit un espace partagé sur deux sites, un historique documentaire et la reprise d’une source existante pour 16 référents.','The team exchanges partner files by email. The project calls for a shared workspace across two sites, document history and one existing data source for 16 coordinators.'],
    variant:['Collaboration partenaires','Partner collaboration'],
    needs:[
      {title:['Donner accès aux référents','Give coordinators access'],reason:['Les 16 référents internes travaillent sur deux sites. Les comptes partenaires ne sont pas chiffrés comme utilisateurs internes.','The 16 internal coordinators work across two sites. Partner accounts are not priced as internal users.'],config:{sites:2,users:16}},
      {title:['Partager et retrouver les dossiers','Share and retrieve files'],reason:['Le portail porte les échanges ; l’archivage conserve les documents du dossier partenaire.','The portal supports exchanges; the archive retains each partner’s documents.'],items:[{id:'portal',quantity:1},{id:'archive',quantity:1}]},
      {title:['Reprendre la source et former les référents','Connect the source and train coordinators'],reason:['Une source alimente le portail. Deux sites sont à paramétrer et deux sessions couvrent les 16 référents.','One source feeds the portal. Two sites need setup and two sessions cover the 16 coordinators.'],items:[{id:'connector',quantity:1},{id:'setup',quantity:2},{id:'training',quantity:2}]}
    ]
  },
  'norelle-hub': {
    summary:['Dix-huit collaborateurs d’un même bureau classent leurs dossiers dans des espaces distincts. Ils veulent centraliser les documents et faire valider les dossiers avant transmission.','Eighteen colleagues in one office store files in separate spaces. They want to centralise documents and approve files before handover.'],
    variant:['Dossiers centralisés','Centralised files'],
    needs:[
      {title:['Couvrir le bureau principal','Cover the main office'],reason:['Le périmètre exprimé est d’un site et 18 utilisateurs. Tout périmètre supérieur déjà choisi est conservé.','The stated scope is one site and 18 users. Any larger scope already selected is retained.'],config:{sites:1,users:18}},
      {title:['Classer et valider les dossiers','File and approve documents'],reason:['L’archivage fournit le classement ; un circuit de validation formalise la vérification avant transmission.','The archive provides filing; an approval workflow formalises checks before handover.'],items:[{id:'archive',quantity:1},{id:'workflow',quantity:1}]},
      {title:['Préparer la reprise et la formation','Prepare migration and training'],reason:['Deux journées de préparation des données sont prévues dans ce brief fictif. Trois sessions accueillent les 18 personnes.','This fictional brief includes two days of data preparation. Three sessions accommodate the 18 people.'],items:[{id:'migration',quantity:2},{id:'training',quantity:3}]}
    ]
  },
  'norelle-extension': {
    summary:['Deux nouveaux bureaux rejoignent deux sites existants. Le périmètre total passe à quatre sites et 48 utilisateurs ; les responsables demandent un suivi commun et un accompagnement au lancement.','Two new offices join two existing sites. Total scope increases to four sites and 48 users; managers want shared reporting and launch support.'],
    variant:['Extension quatre sites','Four-site expansion'],
    needs:[
      {title:['Étendre les licences','Extend licences'],reason:['Le besoin total porte sur quatre sites et 48 utilisateurs nominatifs.','The total requirement is four sites and 48 named users.'],config:{sites:4,users:48}},
      {title:['Piloter le lancement','Coordinate the launch'],reason:['Les responsables demandent des rapports communs et ont choisi un niveau d’assistance prioritaire.','Managers need shared reports and have requested priority support.'],config:{support:'priority'},items:[{id:'reporting',quantity:1},{id:'delivery',quantity:2}]},
      {title:['Préparer les nouveaux bureaux','Prepare the new offices'],reason:['Deux nouveaux sites sont à paramétrer. Six sessions de huit places couvrent les 48 utilisateurs.','Two new sites need setup. Six eight-person sessions cover the 48 users.'],items:[{id:'setup',quantity:2},{id:'training',quantity:6}]}
    ]
  },
  'velori-modern': {
    summary:['Les trois points d’accueil saisissent et classent leurs documents séparément. Le projet concerne 32 personnes, deux sources à raccorder et un poste de capture par site.','The three reception points enter and file documents separately. The project covers 32 people, two data sources and one capture station at each site.'],
    variant:['Accueil et données unifiés','Unified reception and data'],
    needs:[
      {title:['Équiper les points d’accueil','Equip reception points'],reason:['Trois sites et 32 personnes utilisent le socle. Un terminal et un lecteur sont prévus à chaque accueil.','Three sites and 32 people use the platform. Each reception needs one terminal and one reader.'],config:{sites:3,users:32},items:[{id:'station',quantity:3},{id:'reader',quantity:3}]},
      {title:['Centraliser les pièces et les données','Centralise documents and data'],reason:['Deux sources distinctes nécessitent deux connecteurs. L’archivage conserve les documents capturés et les trois sites sont à paramétrer.','Two separate sources require two connectors. The archive retains captured documents and all three sites need setup.'],items:[{id:'connector',quantity:2},{id:'archive',quantity:1},{id:'setup',quantity:3}]},
      {title:['Accompagner les équipes','Support the teams'],reason:['Quatre sessions couvrent les 32 personnes ; deux journées d’accompagnement au lancement figurent au brief.','Four sessions cover the 32 people; the brief includes two days of launch support.'],items:[{id:'training',quantity:4},{id:'delivery',quantity:2}]}
    ]
  }
};
export const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function createState() {
  const variant = {id:uid(),name:'Base',config:{sites:2,users:24,months:12,support:'standard',discount:0,notes:''},items:[{id:'workflow',quantity:1},{id:'kickoff',quantity:1},{id:'migration',quantity:2},{id:'training',quantity:2}],calculated:null};
  return {version:1,context:{customer:'aurive',opportunity:'aurive-rollout'},variants:[variant],active:variant.id,quotes:[]};
}
export const fingerprint = (context,variant) => JSON.stringify([context,variant.config,variant.items]);
export const isCurrent = (context,variant) => variant.calculated === fingerprint(context,variant);
export function issues(variant) {
  const errors=[];
  if(variant.config.users < variant.config.sites) errors.push('usersSites');
  if(variant.items.some(item=>item.id==='connector') && !variant.items.some(item=>item.id==='setup')) errors.push('connectorSetup');
  return errors;
}
export function calculate(variant) {
  const c=variant.config;
  const lines=[
    {id:'core',sku:'DM-LC-01',name:['Socle par site','Core platform per site'],quantity:c.sites,price:240000,recurring:true},
    {id:'users',sku:'DM-LC-02',name:['Licence utilisateur','User licence'],quantity:c.users,price:14400,recurring:true},
    ...variant.items.map(item=>({...catalog.find(product=>product.id===item.id),quantity:item.quantity}))
  ].map(line=>({...line,amount:line.price*line.quantity}));
  const licenceAnnual=lines.filter(line=>line.recurring).reduce((sum,line)=>sum+line.amount,0);
  if(c.support==='priority') lines.push({id:'support',sku:'DM-SP-01',name:['Assistance prioritaire (12 %)','Priority support (12%)'],quantity:1,price:Math.round(licenceAnnual*0.12),amount:Math.round(licenceAnnual*0.12),recurring:true});
  const annual=lines.filter(line=>line.recurring).reduce((sum,line)=>sum+line.amount,0);
  const once=lines.filter(line=>!line.recurring).reduce((sum,line)=>sum+line.amount,0);
  const subscription=annual*(c.months/12), discount=Math.round(subscription*c.discount/100);
  const net=subscription-discount+once, tax=Math.round(net*0.2);
  return {lines,annual,once,subscription,discount,net,tax,total:net+tax};
}
export function calculateVariant(context,variant) {
  if(issues(variant).length) return false;
  variant.calculated=fingerprint(context,variant);
  return true;
}
export function duplicate(state,name) {
  if(state.variants.length>=5) throw new Error('variantLimit');
  const copy=structuredClone(state.variants.find(variant=>variant.id===state.active));
  copy.id=uid();copy.name=name;copy.calculated=null;
  state.variants.push(copy);state.active=copy.id;
  return copy;
}
export function recommendationPlan(context,variant) {
  const brief=briefs[context.opportunity],config=structuredClone(variant.config),items=structuredClone(variant.items);
  const rows=[];
  function apply(need) {
    const changes=[];
    for(const [key,minimum] of Object.entries(need.config||{})) {
      const before=config[key],after=typeof minimum==='number'?Math.max(before,minimum):minimum;
      if(before!==after){config[key]=after;changes.push({kind:'config',key,before,after});}
    }
    for(const minimum of need.items||[]) {
      const existing=items.find(item=>item.id===minimum.id),before=existing?.quantity||0,after=Math.max(before,minimum.quantity);
      if(before!==after){if(existing)existing.quantity=after;else items.push({id:minimum.id,quantity:after});changes.push({kind:'item',key:minimum.id,before,after});}
    }
    rows.push({...need,changes});
  }
  brief.needs.forEach(apply);
  if(config.users<config.sites)apply({title:['Cohérence sites / utilisateurs','Site / user consistency'],reason:['Le périmètre déjà sélectionné est conservé : chaque site doit disposer d’au moins un utilisateur.','The selected scope is retained: every site needs at least one user.'],dependency:true,config:{users:config.sites}});
  if(items.some(item=>item.id==='connector')&&!items.some(item=>item.id==='setup'))apply({title:['Paramétrer le connecteur conservé','Set up the retained connector'],reason:['Un connecteur déjà sélectionné exige au moins une unité de paramétrage de site, même si ce brief n’ajoute pas de connexion.','A connector already selected requires at least one site setup unit, even when this brief adds no connection.'],dependency:true,items:[{id:'setup',quantity:1}]});
  return {brief,rows,config,items,changed:rows.some(row=>row.changes.length)};
}
export function adaptVariant(state,language='fr') {
  if(state.variants.length>=5)throw new Error('variantLimit');
  const source=state.variants.find(variant=>variant.id===state.active),plan=recommendationPlan(state.context,source);
  if(!plan.changed)throw new Error('alreadyCovered');
  const copy=duplicate(state,plan.brief.variant[language==='en'?1:0]);
  copy.config=plan.config;copy.items=plan.items;
  return copy;
}
export function prepare(state) {
  const variant=state.variants.find(item=>item.id===state.active);
  if(!isCurrent(state.context,variant)||issues(variant).length) throw new Error('stale');
  const previous=state.quotes.find(quote=>quote.variant.name===variant.name&&fingerprint(quote.context,quote.variant)===fingerprint(state.context,variant));
  if(previous) return previous;
  if(state.quotes.length>=15) throw new Error('quoteLimit');
  const quote={id:uid(),reference:`DEMO-${String(state.quotes.length+1).padStart(3,'0')}`,created:new Date().toISOString(),context:structuredClone(state.context),variant:structuredClone(variant)};
  state.quotes.unshift(quote);
  return quote;
}
function assert(condition) { if(!condition) throw new Error('invalidStorage'); }
function string(value,max=80) {assert(typeof value==='string'&&value.trim().length>0&&value.length<=max);return value;}
function integer(value,min,max) {assert(Number.isSafeInteger(value)&&value>=min&&value<=max);return value;}
function contextValue(value) {
  assert(value&&typeof value==='object');
  const customer=customers.find(item=>item.id===value.customer);
  assert(customer&&customer.opportunities.some(item=>item.id===value.opportunity));
  return {customer:customer.id,opportunity:value.opportunity};
}
function variantValue(value,context) {
  assert(value&&value.config&&Array.isArray(value.items)&&value.items.length<=catalog.length);
  const c=value.config;
  assert([12,24,36].includes(c.months)&&['standard','priority'].includes(c.support)&&typeof c.notes==='string'&&c.notes.length<=1000);
  const variant={id:string(value.id),name:string(value.name,60),config:{sites:integer(c.sites,1,20),users:integer(c.users,1,500),months:c.months,support:c.support,discount:integer(c.discount,0,15),notes:c.notes},items:value.items.map(item=>{assert(item&&catalog.some(product=>product.id===item.id));return {id:item.id,quantity:integer(item.quantity,1,99)};}),calculated:null};
  assert(new Set(variant.items.map(item=>item.id)).size===variant.items.length);
  if(value.calculated===fingerprint(context,variant)&&!issues(variant).length) variant.calculated=value.calculated;
  return variant;
}
export function decodeState(raw) {
  assert(typeof raw==='string'&&raw.length<200000);
  const data=JSON.parse(raw);
  assert(data&&data.version===1&&Array.isArray(data.variants)&&data.variants.length>=1&&data.variants.length<=5&&Array.isArray(data.quotes)&&data.quotes.length<=15);
  const context=contextValue(data.context),variants=data.variants.map(value=>variantValue(value,context));
  assert(new Set(variants.map(item=>item.id)).size===variants.length&&variants.some(item=>item.id===data.active));
  const quotes=data.quotes.map(value=>{assert(value&&typeof value.created==='string'&&Number.isFinite(Date.parse(value.created)));const savedContext=contextValue(value.context);const variant=variantValue(value.variant,savedContext);assert(isCurrent(savedContext,variant));return {id:string(value.id),reference:string(value.reference,30),created:value.created,context:savedContext,variant};});
  assert(new Set(quotes.map(item=>item.id)).size===quotes.length);
  return {version:1,context,variants,active:data.active,quotes};
}
