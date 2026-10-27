'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './CaseStudies.module.css'
import { useCaseViewer } from './CaseViewer'

export function CasePreview({ image, path, locale, title }: { image: string; path: string; locale: string; title: string }) {
  const [live, setLive] = useState(false)
  const viewer = useCaseViewer()
  const [opened, setOpened] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const preview = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (opened) (live ? frame.current : preview.current)?.focus()
  }, [live, opened])
  const fr = locale === 'fr'
  const url = `/demos/${path}/index.html?lang=${locale}`
  return <div className={styles.preview}>
    <div className={styles.previewToolbar}>
      <span><i aria-hidden="true" />{fr ? 'Démo similaire · données fictives' : 'Similar demo · fictional data'}</span>
      {live ? <button onClick={() => setLive(false)}>{fr ? 'Revenir à l’aperçu' : 'Back to preview'}</button> : <span className={styles.previewHint}>{fr ? 'Une vraie interface à explorer' : 'A working interface to explore'}</span>}
    </div>
    {opened && <iframe ref={frame} hidden={!live} className={styles.live} src={`${url}&embed=1`} title={title} />}
    {!live && <button ref={preview} className={styles.imageButton} onClick={() => { if (viewer) viewer({ path, title }, preview.current); else { setOpened(true); setLive(true) } }} aria-label={`${fr ? 'Essayer la démonstration similaire' : 'Try the similar demo'} — ${title}`}>
      <Image src={image} alt={title} width={1440} height={900} sizes="(max-width: 1440px) 100vw, 1360px" />
      <span className={styles.play}><span aria-hidden="true">↗</span>{fr ? 'Prenez la main' : 'Take the controls'}</span>
    </button>}
    {live && <div className={styles.liveFooter}><span>{fr ? 'Vous manipulez la démonstration.' : 'You are using the demonstration.'}</span><a href={url}>{fr ? 'Ouvrir l’application ↗' : 'Open the application ↗'}</a></div>}
  </div>
}
