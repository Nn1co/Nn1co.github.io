'use client'

import { useState, type FormEvent } from 'react'

export type ContactFormMessages = {
  name: string
  email: string
  company: string
  workflow: string
  namePlaceholder: string
  emailPlaceholder: string
  companyPlaceholder: string
  workflowPlaceholder: string
  prepare: string
  copy: string
  copied: string
  copyFailed: string
  hint: string
  subject: string
  greeting: string
  labels: { name: string; email: string; company: string; workflow: string }
}

export function ContactComposer({ email, messages: m }: { email: string; messages: ContactFormMessages }) {
  const [status, setStatus] = useState<'copied' | 'copyFailed' | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    for (const field of Array.from(form.elements)) {
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.value = field.value.trim()
    }
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const body = [
      m.greeting,
      '',
      `${m.labels.name}: ${data.get('name')}`,
      `${m.labels.email}: ${data.get('email')}`,
      data.get('company') ? `${m.labels.company}: ${data.get('company')}` : '',
      '',
      `${m.labels.workflow}:`,
      data.get('workflow'),
    ].join('\n')
    setStatus(null)
    if (submitter?.value === 'copy') {
      try {
        await navigator.clipboard.writeText(`${m.subject}\n\n${body}`)
        setStatus('copied')
      } catch {
        setStatus('copyFailed')
      }
      return
    }
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="contact-composer" action={`mailto:${email}`} method="post" encType="text/plain" onSubmit={handleSubmit} onInput={() => setStatus(null)} aria-describedby="contact-form-hint">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">{m.name}</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder={m.namePlaceholder} maxLength={120} required />
        </div>
        <div className="field">
          <label htmlFor="contact-email">{m.email}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={m.emailPlaceholder} maxLength={254} required />
        </div>
        <div className="field field-wide">
          <label htmlFor="contact-company">{m.company}</label>
          <input id="contact-company" name="company" autoComplete="organization" placeholder={m.companyPlaceholder} maxLength={160} />
        </div>
        <div className="field field-wide">
          <label htmlFor="contact-workflow">{m.workflow}</label>
          <textarea id="contact-workflow" name="workflow" rows={5} placeholder={m.workflowPlaceholder} maxLength={3000} required />
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" name="intent" value="prepare">{m.prepare}</button>
        <button className="button button-outline" type="submit" name="intent" value="copy">{m.copy}</button>
      </div>
      <p id="contact-form-hint" className="form-hint">{m.hint}</p>
      <p className="form-status" role="status" aria-live="polite" aria-atomic="true">{status ? m[status] : ''}</p>
    </form>
  )
}
