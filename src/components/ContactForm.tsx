import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { site } from '../data/site'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; msg: string } | { kind: 'error'; msg: string }
const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [locked, setLocked] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (locked) return
    const f = e.currentTarget
    const data = new FormData(f)
    const name = String(data.get('name') ?? '').trim(), email = String(data.get('email') ?? '').trim(), message = String(data.get('message') ?? '').trim()
    const errs: Record<string, string> = {}
    if (name.length < 2) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address.'
    if (message.length < 10) errs.message = 'Please write at least 10 characters.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLocked(true)
    if (formspreeId) {
      setStatus({ kind: 'sending' })
      try {
        const r = await fetch(`https://formspree.io/f/${formspreeId}`, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) })
        if (!r.ok) throw new Error('Request failed')
        setStatus({ kind: 'sent', msg: 'Message sent. Thank you — I will reply by email.' }); f.reset()
      } catch { setLocked(false); setStatus({ kind: 'error', msg: `Could not send the message. Please email ${site.email} directly.` }) }
    } else {
      const body = `${message}\n\n— ${name} (${email})`
      window.setTimeout(() => setLocked(false), 5000)
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(body)}`
      setStatus({ kind: 'sent', msg: 'Your email app should now open with the message ready to send. Nothing has been sent until you press send there.' })
    }
  }
  const field = 'w-full rounded-xl border border-soft/15 bg-void/60 px-4 py-3 text-soft placeholder:text-soft/40 focus:border-electric'
  return (
    <form onSubmit={onSubmit} noValidate className="glass space-y-4 rounded-3xl p-6" aria-label="Contact form">
      {(['name', 'email'] as const).map((k) => (
        <div key={k}>
          <label htmlFor={k} className="mono mb-1 block !text-soft/70">{k}</label>
          <input id={k} name={k} type={k === 'email' ? 'email' : 'text'} autoComplete={k} className={field} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} />
          {errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-red-300">{errors[k]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mono mb-1 block !text-soft/70">message</label>
        <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} />
        {errors.message && <p id="message-err" className="mt-1 text-sm text-red-300">{errors.message}</p>}
      </div>
      <button type="submit" className="btn-primary" disabled={locked || status.kind === 'sending'}><Send size={16} />{status.kind === 'sending' ? 'Sending…' : formspreeId ? 'Send message' : 'Compose email'}</button>
      <p role="status" aria-live="polite" className={`text-sm ${status.kind === 'error' ? 'text-red-300' : 'text-electric'}`}>{status.kind === 'sent' || status.kind === 'error' ? status.msg : ''}</p>
      {!formspreeId && <p className="text-xs text-soft/50">This site has no mail server, so the form opens your email app addressed to {site.email}.</p>}
    </form>
  )
}
