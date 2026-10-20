import { useId } from 'react'

type Props = {
  kind: 'orders' | 'portal' | 'supply' | 'assistant'
  locale: string
}

const copy = {
  en: {
    orders: {
      title: 'A focused sales-order interface',
      description: 'Illustration of a clear order form with selected items and an order ready to review. This is a concept, not a product screenshot.',
      heading: 'Sales order',
      status: 'Ready to review',
    },
    portal: {
      title: 'A tailored sales workspace in NetSuite',
      description: 'Concept illustration of an authenticated sales portal with a product catalogue and a saved cart. This is not a product screenshot and contains no customer data or prices.',
      heading: 'Sales portal',
      cart: 'Cart',
      saved: 'Saved',
    },
    supply: {
      title: 'Supply-chain information in one view',
      description: 'Illustration of a planning table that brings stock, demand and planning information together. The shapes are illustrative and contain no customer data.',
      heading: 'Stock planning',
      columns: ['Stock', 'Demand', 'Plan'],
    },
    assistant: {
      title: 'A conversation connected to business tools',
      description: 'Illustration of an employee asking a question and reviewing a suggested action inside an application.',
      question: 'Ask a question',
      action: 'Review an action',
    },
  },
  fr: {
    orders: {
      title: 'Une interface centrée sur la commande',
      description: 'Illustration d’un formulaire de commande clair avec des articles sélectionnés et une commande à vérifier. Ceci est un concept, pas une capture du produit.',
      heading: 'Commande client',
      status: 'Prête à vérifier',
    },
    portal: {
      title: 'Un espace de vente sur mesure dans NetSuite',
      description: 'Vue illustrative d’un portail de vente authentifié avec un catalogue de produits et un panier enregistré. Ceci n’est pas une capture du produit et ne contient aucune donnée client ni aucun prix.',
      heading: 'Portail de vente',
      cart: 'Panier',
      saved: 'Enregistré',
    },
    supply: {
      title: 'La supply chain dans une seule vue',
      description: 'Illustration d’un tableau de planification réunissant les stocks, la demande et les prévisions. Les formes sont illustratives et ne contiennent aucune donnée client.',
      heading: 'Prévisions de stock',
      columns: ['Stock', 'Demande', 'Plan'],
    },
    assistant: {
      title: 'Une conversation connectée aux outils métier',
      description: 'Illustration d’un employé qui pose une question et vérifie une action proposée dans une application.',
      question: 'Poser une question',
      action: 'Vérifier une action',
    },
  },
}

export function ProjectIllustration({ kind, locale }: Props) {
  const id = useId().replace(/:/g, '')
  const text = copy[locale === 'fr' ? 'fr' : 'en']
  const label = text[kind]
  const ink = 'var(--navy, #17283f)'
  const blue = 'var(--blue, #275be8)'
  const line = 'var(--line, #dce3ed)'
  const pale = '#edf3ff'

  return (
    <figure className={`illustration illustration-${kind}`}>
      <svg className="project-art" viewBox="0 0 480 340" role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>{label.title}</title>
        <desc id={`${id}-description`}>{label.description}</desc>
        <defs>
          <filter id={`${id}-shadow`} x="-25%" y="-25%" width="150%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#17283f" floodOpacity=".055" />
          </filter>
        </defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" fontFamily="inherit">
          {kind === 'orders' && (
            <>
              <path d="M128 32h272v252H128z" fill="#fff" stroke={line} opacity=".55" transform="rotate(5 264 158)" />
              <rect x="91" y="38" width="308" height="265" rx="13" fill="#fff" stroke={line} filter={`url(#${id}-shadow)`} />
              <text x="115" y="80" fill={ink} stroke="none" fontSize="25" fontWeight="500" letterSpacing="-.7">{text.orders.heading}</text>
              <path d="M115 99h260" stroke={line} />
              <circle cx="126" cy="126" r="7" fill={pale} />
              <path d="M145 126h99m58 0h46" stroke={line} strokeWidth="7" />
              {[164, 204].map((y, index) => (
                <g key={y}>
                  <rect x="115" y={y - 15} width="28" height="28" rx="6" fill={index ? '#f5f7fb' : pale} stroke={line} />
                  <path d={`M156 ${y - 4}h${index ? 79 : 108}`} stroke={ink} strokeOpacity=".23" strokeWidth="5" />
                  <path d={`M156 ${y + 8}h49`} stroke={line} strokeWidth="4" />
                  <path d={`M332 ${y}h26`} stroke={line} strokeWidth="5" />
                </g>
              ))}
              <path d="M115 233h260" stroke={line} />
              <circle cx="127" cy="268" r="12" fill={blue} />
              <path d="m122 268 3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" />
              <text x="149" y="275" fill={ink} stroke="none" fontSize="24" letterSpacing="-.6">{text.orders.status}</text>
              <rect x="40" y="166" width="91" height="94" rx="12" fill="#fff" stroke={line} filter={`url(#${id}-shadow)`} />
              <rect x="54" y="180" width="28" height="28" rx="6" fill={pale} />
              <rect x="90" y="180" width="27" height="28" rx="6" fill="#f6f8fc" />
              <rect x="54" y="216" width="28" height="28" rx="6" fill="#f6f8fc" />
              <rect x="90" y="216" width="27" height="28" rx="6" fill={pale} />
              <path d="m62 194 4 4 7-8m25 40 4 4 7-8" stroke={blue} strokeWidth="2" />
            </>
          )}
          {kind === 'portal' && (
            <>
              <rect x="34" y="41" width="370" height="248" rx="13" fill="#fff" stroke={line} filter={`url(#${id}-shadow)`} />
              <text x="60" y="83" fill={ink} stroke="none" fontSize="26" fontWeight="500" letterSpacing="-.8">{text.portal.heading}</text>
              <circle cx="370" cy="75" r="15" fill={pale} />
              <circle cx="370" cy="71" r="4" stroke={blue} strokeWidth="1.6" />
              <path d="M363 82c1-7 13-7 14 0M60 104h318" stroke={line} />
              {[60, 160, 260].map((x, index) => (
                <g key={x}>
                  <rect x={x} y="126" width="80" height="113" rx="8" fill="#fff" stroke={index === 0 ? blue : line} />
                  <rect x={x + 9} y="135" width="62" height="59" rx="5" fill={index === 0 ? pale : '#f6f8fc'} />
                  <path d={`m${x + 28} 156 12-7 12 7v15l-12 7-12-7zm0 0 12 7 12-7m-12 7v15`} stroke={index === 0 ? blue : '#9baabd'} strokeWidth="1.5" />
                  <path d={`M${x + 13} 208h42m-42 12h27`} stroke={line} strokeWidth="4" />
                </g>
              ))}
              <path d="M60 263h79m15 0h39" stroke={line} strokeWidth="5" />
              <rect x="277" y="166" width="169" height="143" rx="12" fill="#fff" stroke={line} filter={`url(#${id}-shadow)`} />
              <text x="298" y="203" fill={ink} stroke="none" fontSize="25" fontWeight="500" letterSpacing="-.7">{text.portal.cart}</text>
              <rect x="298" y="219" width="23" height="23" rx="5" fill={pale} />
              <path d="M334 225h73m-73 11h45M298 257h127" stroke={line} strokeWidth="4" />
              <circle cx="308" cy="282" r="10" fill={blue} />
              <path d="m304 282 3 3 5-6" stroke="#fff" strokeWidth="1.8" />
              <text x="326" y="289" fill={ink} stroke="none" fontSize="24" letterSpacing="-.7">{text.portal.saved}</text>
            </>
          )}
          {kind === 'supply' && (
            <>
              <rect x="34" y="40" width="412" height="259" rx="13" fill="#fff" stroke={line} filter={`url(#${id}-shadow)`} />
              <text x="60" y="83" fill={ink} stroke="none" fontSize="27" fontWeight="500" letterSpacing="-.8">{text.supply.heading}</text>
              <rect x="370" y="62" width="20" height="20" rx="5" fill={pale} />
              <path d="M376 69h8m-8 5h5M60 104h360" stroke={line} />
              {text.supply.columns.map((column, index) => <text key={column} x={158 + index * 92} y="135" fill={ink} stroke="none" fontSize="24" letterSpacing="-.7">{column}</text>)}
              <rect x="48" y="191" width="384" height="41" rx="6" fill={pale} />
              <path d="M49 200v23" stroke={blue} strokeWidth="3" />
              {[172, 212, 252].map((y, index) => (
                <g key={y}>
                  <circle cx="74" cy={y} r="6" stroke={index === 1 ? blue : line} strokeWidth="2" fill={index === 1 ? blue : '#fff'} />
                  <path d={`M92 ${y}h31`} stroke={ink} strokeOpacity={index === 1 ? '.5' : '.2'} strokeWidth="5" />
                  <path d={`M158 ${y}h${[48, 33, 55][index]}`} stroke={index === 1 ? blue : line} strokeWidth="7" />
                  <path d={`M250 ${y}h${[35, 53, 29][index]}`} stroke={index === 1 ? blue : line} strokeOpacity={index === 1 ? '.4' : '1'} strokeWidth="7" />
                  <circle cx="356" cy={y} r="9" fill={index === 1 ? blue : pale} />
                  <path d={`m352 ${y} 3 3 5-6`} stroke={index === 1 ? '#fff' : blue} strokeWidth="1.7" />
                </g>
              ))}
              <path d="M60 277h360" stroke={line} />
              <rect x="368" y="25" width="65" height="35" rx="8" fill="#fff" stroke={line} />
              <path d="M383 38v8m10-13v13m10-5v5m10-10v10" stroke={blue} strokeWidth="3" />
            </>
          )}
          {kind === 'assistant' && (
            <>
              <path d="M82 165v88c0 17 14 31 31 31h247" stroke={line} strokeDasharray="3 7" />
              <path d="M382 149V92c0-17-14-31-31-31H206" stroke={line} strokeDasharray="3 7" />
              <path d="M48 62c0-10 8-18 18-18h280c10 0 18 8 18 18v70c0 10-8 18-18 18H88l-25 17v-17c-8-1-15-8-15-18z" fill="#fff" stroke={line} filter={`url(#${id}-shadow)`} />
              <circle cx="79" cy="77" r="7" fill={blue} />
              <text x="99" y="85" fill={ink} stroke="none" fontSize="24" letterSpacing="-.7">{text.assistant.question}</text>
              <path d="M75 112h169m16 0h49" stroke={line} strokeWidth="6" />
              <path d="M123 194c0-10 8-18 18-18h272c10 0 18 8 18 18v71c0 10-8 18-18 18h-18v18l-25-18H141c-10 0-18-8-18-18z" fill="#fff" stroke={line} filter={`url(#${id}-shadow)`} />
              <rect x="144" y="198" width="28" height="28" rx="8" fill={pale} />
              <path d="m151 212 5 5 9-10" stroke={blue} strokeWidth="2" />
              <text x="184" y="220" fill={ink} stroke="none" fontSize="24" letterSpacing="-.7">{text.assistant.action}</text>
              <path d="M148 249h140" stroke={line} strokeWidth="6" />
              <rect x="345" y="238" width="61" height="23" rx="11.5" fill={pale} />
              <path d="m369 250 4 4 7-8" stroke={blue} strokeWidth="2" />
              <circle cx="82" cy="283" r="17" fill="#fff" stroke={line} />
              <path d="M76 277h12v12H76zm6 0v12m-6-6h12" stroke={blue} strokeWidth="1.5" />
            </>
          )}
        </g>
      </svg>
    </figure>
  )
}
