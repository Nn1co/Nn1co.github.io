'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import styles from './DemoStage.module.css'

const demos = [
  { id: 'order', path: 'order-portal' },
  { id: 'stock', path: 'stock-workbench' },
  { id: 'quote', path: 'quote-configurator' },
] as const

const copy = {
  fr: {
    title: 'Essayez nos applications pour NetSuite.', intro: 'Préparez une commande, simulez un arrivage ou composez un devis.',
    tabs: 'Choisir une démonstration', open: 'Plein écran', openLabel: 'Ouvrir en plein écran', data: 'Données fictives · Sans connexion NetSuite',
    items: [
      { name: 'Commandes', task: 'Ajoutez un produit. Le panier suit.', frame: 'Portail de commandes — démonstration interactive' },
      { name: 'Stocks', task: 'Ouvrez un article. Testez un arrivage.', frame: 'Tableau de stocks — démonstration interactive' },
      { name: 'Devis', task: 'Changez les options. Comparez les devis.', frame: 'Configurateur de devis — démonstration interactive' },
    ],
  },
  en: {
    title: 'Try our applications for NetSuite.', intro: 'Prepare an order, simulate incoming stock or put together a quote.',
    tabs: 'Choose a demonstration', open: 'Full screen', openLabel: 'Open full screen', data: 'Fictional data · No NetSuite connection',
    items: [
      { name: 'Orders', task: 'Add a product. The cart updates.', frame: 'Order portal — interactive demonstration' },
      { name: 'Stock', task: 'Open an item. Test an incoming delivery.', frame: 'Stock workbench — interactive demonstration' },
      { name: 'Quotes', task: 'Change the options. Compare the quotes.', frame: 'Quote configurator — interactive demonstration' },
    ],
  },
}

export function DemoStage({ locale }: { locale: string }) {
  const language = locale === 'fr' ? 'fr' : 'en'
  const text = copy[language]
  const [active, setActive] = useState(0)
  const [visited, setVisited] = useState(() => new Set([0]))
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function activate(index: number) {
    setActive(index)
    setVisited(current => current.has(index) ? current : new Set(current).add(index))
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % demos.length
      : event.key === 'ArrowLeft' ? (index + demos.length - 1) % demos.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? demos.length - 1 : null
    if (next === null) return
    event.preventDefault()
    activate(next)
    tabs.current[next]?.focus()
  }

  return <div className={styles.page}>
    <header className={styles.intro}>
      <h1>{text.title}</h1>
      <div><p className={styles.description}>{text.intro}</p><p className={styles.data}>{text.data}</p></div>
    </header>
    <div className={styles.stage}>
      <div className={styles.tabs} role="tablist" aria-label={text.tabs}>
        {demos.map((demo, index) => <button key={demo.id} ref={node => { tabs.current[index] = node }}
          id={`demo-tab-${demo.id}`} type="button" role="tab" aria-selected={active === index}
          aria-controls={`demo-panel-${demo.id}`} tabIndex={active === index ? 0 : -1}
          onClick={() => activate(index)} onKeyDown={event => navigate(event, index)}>
          <span className={styles.number}>0{index + 1}</span>
          <span className={styles.tabName}>{text.items[index].name}</span>
          <span className={styles.tabArrow} aria-hidden="true">↘</span>
        </button>)}
      </div>
      {demos.map((demo, index) => <section key={demo.id} id={`demo-panel-${demo.id}`} role="tabpanel"
        aria-labelledby={`demo-tab-${demo.id}`} hidden={active !== index}>
        {visited.has(index) && <>
          <div className={styles.brief}>
            <p className={styles.task}>{text.items[index].task}</p>
            <a className={styles.open} aria-label={text.openLabel} href={`/demos/${demo.path}/index.html?lang=${language}`}>{text.open}<span aria-hidden="true">↗</span></a>
          </div>
          <iframe className={styles.frame} title={text.items[index].frame} src={`/demos/${demo.path}/index.html?lang=${language}&embed=1`} />
        </>}
      </section>)}
    </div>
  </div>
}
