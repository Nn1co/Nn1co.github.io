'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './CaseStudies.module.css'

type Demo = { path: string; title: string }
const ViewerContext = createContext<((demo: Demo, trigger: HTMLButtonElement | null) => void) | null>(null)
export const useCaseViewer = () => useContext(ViewerContext)

export function CaseViewer({ children, locale }: { children: ReactNode; locale: string }) {
  const [active, setActive] = useState<Demo | null>(null)
  const [visited, setVisited] = useState<Demo[]>([])
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const fr = locale === 'fr'
  useEffect(() => {
    if (active && !dialog.current?.open) dialog.current?.showModal()
  }, [active])

  function open(demo: Demo, button: HTMLButtonElement | null) {
    trigger.current = button
    setVisited(current => current.some(item => item.path === demo.path) ? current : [...current, demo])
    setActive(demo)
  }
  function close() {
    setActive(null)
    trigger.current?.focus()
  }

  return <ViewerContext.Provider value={open}>
    {children}
    <dialog ref={dialog} className={styles.viewer} aria-labelledby="case-viewer-title" onClose={close}>
      <header className={styles.viewerHeader}>
        <div><span>{fr ? 'Démo similaire · données fictives' : 'Similar demo · fictional data'}</span><h2 id="case-viewer-title">{active?.title}</h2></div>
        <button type="button" onClick={() => dialog.current?.close()}>{fr ? 'Fermer' : 'Close'} <span aria-hidden="true">×</span></button>
      </header>
      {visited.map(demo => <iframe key={demo.path} hidden={active?.path !== demo.path} className={styles.viewerFrame} title={demo.title} src={`/demos/${demo.path}/index.html?lang=${locale}&embed=1`} />)}
      <footer className={styles.liveFooter}><span>{fr ? 'Explorez les fonctions, vos changements restent dans ce navigateur.' : 'Explore the features. Changes stay in this browser.'}</span>{active && <a href={`/demos/${active.path}/index.html?lang=${locale}`}>{fr ? 'Ouvrir l’application ↗' : 'Open the application ↗'}</a>}</footer>
    </dialog>
  </ViewerContext.Provider>
}
