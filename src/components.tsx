import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Circle, Code2, Command, LoaderCircle, Menu, Orbit, Palette, X } from 'lucide-react'
import { copy, type Language } from './translations'
import { navItems, serviceIcons, serviceSlugs } from './data'
import { siteConfig } from './siteConfig'

type Props = { lang: Language; setLang: (lang: Language) => void }

export function Logo({ lang = 'en' }: { lang?: Language }) {
  return <Link aria-label={`ORBITAL DIGITAL SOLUTION — ${copy[lang].nav.home}`} className="brand" to="/"><span className="brand-mark"><Orbit size={24} strokeWidth={1.7} aria-hidden="true" /></span><span className="brand-type"><strong>ORBITAL</strong><small>DIGITAL SOLUTION</small></span></Link>
}

export function Header({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false)
  const c = copy[lang]
  const location = useLocation()
  const toggleLanguage = () => setLang(lang === 'en' ? 'am' : 'en')
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])
  return <header className="site-header"><div className="header-inner"><Logo lang={lang} />
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? c.common.closeMenu : c.common.openMenu} aria-expanded={open} aria-controls="primary-navigation">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    <nav id="primary-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label={c.common.mainNavigation}>
      {navItems.map(item => <NavLink key={item.key} to={item.path} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive && (item.path === '/' ? location.pathname === '/' : true) ? 'active' : ''}`}>{c.nav[item.key]}</NavLink>)}
      <button className="language-toggle" onClick={toggleLanguage} aria-label={lang === 'en' ? c.common.switchToAmharic : c.common.switchToEnglish}>{lang === 'en' ? 'አማ' : 'EN'}<ChevronDown size={13} aria-hidden="true" /></button>
      <Link to="/contact" className="button button-small nav-cta" onClick={() => setOpen(false)}>{c.common.getInTouch}<ArrowUpRight size={15} /></Link>
    </nav>
  </div></header>
}

export function Footer({ lang }: { lang: Language }) {
  const c = copy[lang]
  return <footer className="site-footer"><div className="container"><div className="footer-main">
    <div className="footer-brand"><Logo lang={lang} /><p>{c.footer.description}</p><p className="footer-place">{c.footer.location}</p></div>
    <div className="footer-col"><h3>{c.footer.explore}</h3>{navItems.slice(0, 5).map(item => <Link key={item.key} to={item.path}>{c.nav[item.key]}</Link>)}</div>
    <div className="footer-col"><h3>{c.footer.services}</h3>{copy[lang].serviceNames.map((name, i) => <Link key={serviceSlugs[i]} to={`/services/${serviceSlugs[i]}`}>{name}</Link>)}</div>
    <div className="footer-col"><h3>{c.footer.contact}</h3><span>{c.footer.location}</span>{siteConfig.contact.email && <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>}{siteConfig.contact.phone && <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>}{Object.entries(siteConfig.contact.social).filter(([, url]) => /^https:\/\//i.test(url)).map(([key, url]) => <a href={url} key={key} target="_blank" rel="noreferrer">{key === 'linkedIn' ? 'LinkedIn' : key === 'youTube' ? 'YouTube' : key[0].toUpperCase() + key.slice(1)}<ArrowUpRight size={13} aria-hidden="true" /></a>)}<Link to="/contact">{c.nav.contact}<ArrowUpRight size={13} aria-hidden="true" /></Link><span className="footer-note">{c.footer.placeholders}</span></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} ORBITAL DIGITAL SOLUTION. {c.footer.rights}</span><span>{c.footer.tagline}</span></div></div></footer>
}

export function Layout({ children, lang, setLang }: Props & { children: ReactNode }) {
  return <><a className="skip-link" href="#main-content">{copy[lang].common.skipToContent}</a><Header lang={lang} setLang={setLang} /><main id="main-content" tabIndex={-1}>{children}</main><Footer lang={lang} /></>
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  const { pathname } = useLocation()
  const art = pageArtwork[pathname] ?? pageArtwork[`/services/${pathname.split('/').pop()}`] ?? pageArtwork['/about']
  return <section className="page-intro"><div className="container page-intro-layout"><div className="page-intro-copy"><span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{eyebrow}</span><h1><RichText text={title} /></h1><p>{text}</p></div><figure className={`page-intro-art page-art-${art.theme}`}><img className="page-photo" src={`/images/${art.image}.jpg`} alt={`${eyebrow} technology`} loading="lazy" decoding="async" /><span className="page-photo-shade" aria-hidden="true" /><figcaption className="page-art-label"><span className="page-art-pulse" aria-hidden="true" />{eyebrow}</figcaption></figure></div></section>
}

const pageArtwork: Record<string, { theme: number; image: string }> = {
  '/about': { theme: 0, image: 'about-team' },
  '/services': { theme: 1, image: 'services-network' },
  '/services/web-development': { theme: 2, image: 'web-development' },
  '/services/software-development': { theme: 3, image: 'software-development' },
  '/services/mobile-apps': { theme: 4, image: 'mobile-apps' },
  '/services/security-systems': { theme: 5, image: 'security-systems' },
  '/services/networking-it': { theme: 6, image: 'networking-it' },
  '/services/graphic-design-branding': { theme: 7, image: 'graphic-design' },
  '/services/video-production': { theme: 0, image: 'video-production' },
  '/services/digital-marketing': { theme: 1, image: 'digital-marketing' },
  '/products': { theme: 2, image: 'products' },
  '/orbital-pos': { theme: 3, image: 'orbital-pos' },
  '/portfolio': { theme: 4, image: 'portfolio' },
  '/contact': { theme: 5, image: 'contact-office' },
}

export function HeroIllustration() {
  return <div className="hero-illustration" role="img" aria-label="Digital technology and software"><img src="/images/home-circuit.jpg" alt="" /><span className="hero-photo-shade" aria-hidden="true" /><div className="hero-photo-panel" aria-hidden="true"><span className="hero-photo-panel-dot" /><span className="hero-photo-panel-dot" /><span className="hero-photo-panel-dot" /><div className="hero-photo-panel-mark" /><i /><i /><i /><b /></div><div className="hero-photo-caption"><span className="page-art-pulse" />DIGITAL INNOVATION</div></div>
}

export function SectionHeading({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}><span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{eyebrow}</span><h2><RichText text={title} /></h2>{text && <p>{text}</p>}</div>
}

export function RichText({ text }: { text: string }) {
  const tokens = /<br\s*\/?>|<em>(.*?)<\/em>/gs
  const parts: ReactNode[] = []
  let previousIndex = 0
  for (const match of text.matchAll(tokens)) {
    const index = match.index ?? 0
    if (index > previousIndex) parts.push(text.slice(previousIndex, index))
    parts.push(match[0].startsWith('<br') ? <br key={index} /> : <em key={index}>{match[1]}</em>)
    previousIndex = index + match[0].length
  }
  if (previousIndex < text.length) parts.push(text.slice(previousIndex))
  return <>{parts}</>
}

export function ServiceCards({ lang, limit }: { lang: Language; limit?: number }) {
  const c = copy[lang]
  return <div className="service-grid">{c.serviceNames.slice(0, limit ?? c.serviceNames.length).map((name, i) => {
    const Icon = serviceIcons[i]
    return <Link className="service-card" to={`/services/${serviceSlugs[i]}`} key={name}>
      <div className="service-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></div><h3>{name}</h3><p>{c.serviceDescriptions[i]}</p><span className="card-link">{c.common.learnMore}<ArrowUpRight size={15} aria-hidden="true" /></span>
    </Link>
  })}</div>
}

export function ProductMockup({ lang }: { lang: Language }) {
  const t = copy[lang].dashboard
  return <div className="dashboard-art" role="img" aria-label={t.productPreview}><div className="dashboard-window">
    <div className="dash-top"><div className="dash-brand"><Orbit size={15} aria-hidden="true" /> ORBITAL <span>POS</span></div><div className="dash-actions" aria-hidden="true"><i /><i /><i /></div></div>
    <div className="dash-content"><aside className="dash-side" aria-hidden="true"><b /><i /><i /><i /><i /><i /></aside><div className="dash-main"><div className="dash-title"><span>{t.overview}</span><small>{t.preview} <ChevronDown size={11} aria-hidden="true" /></small></div>
      <div className="dash-stats"><div><small>{t.totalSales}</small><strong>—</strong><span>{t.previewData}</span></div><div><small>{t.transactions}</small><strong>—</strong><span>{t.previewData}</span></div><div><small>{t.products}</small><strong>—</strong><span>{t.previewData}</span></div></div>
      <div className="dash-lower"><div className="dash-chart"><div className="chart-label">{t.salesOverview} <small>{t.last7Days}</small></div><div className="chart-grid" aria-hidden="true"><span /><span /><span /><div className="chart-line" /></div><div className="chart-days">{t.days.map(day => <small key={day}>{day}</small>)}</div></div><div className="dash-orders"><small>{t.recentActivity}</small><div /><div /><div /></div></div>
    </div></div></div><div className="mockup-chip"><span className="status-dot" />{t.productPreview}</div><div className="art-glow" /></div>
}

export function ProductCard({ lang }: { lang: Language }) {
  const c = copy[lang]
  return <div className="product-card"><div className="product-copy"><span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{c.home.productEyebrow}</span><h2><RichText text={c.home.productTitle} /></h2><p>{c.home.productText}</p><div className="product-badges"><span><span className="status-dot" aria-hidden="true" />{c.common.inDevelopment}</span><span>{c.home.productAudience}</span></div><Link className="button" to="/orbital-pos">{c.common.discover}<ArrowRight size={16} aria-hidden="true" /></Link></div><ProductMockup lang={lang} /></div>
}

export function CtaBanner({ lang }: { lang: Language }) {
  const c = copy[lang]
  return <section className="cta-section"><div className="container"><div className="cta-card"><div className="cta-orbit orbit-one" aria-hidden="true" /><div className="cta-orbit orbit-two" aria-hidden="true" /><span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{c.common.getInTouch}</span><h2><RichText text={c.home.ctaTitle} /></h2><Link className="button button-light" to="/contact">{c.common.contactUs}<ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
}

export function ContactForm({ lang }: { lang: Language }) {
  const c = copy[lang]
  const t = c.pages.contact
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'unconfigured'>('idle')
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (String(data.get('website') ?? '').trim()) return
    if (!siteConfig.contactEndpoint) {
      setStatus('unconfigured')
      return
    }
    setStatus('loading')
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      })
      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`)
      const result: unknown = await response.json()
      if (typeof result !== 'object' || result === null || !('received' in result) || result.received !== true) {
        throw new Error('Contact endpoint did not confirm receipt')
      }
      form.reset()
      setStatus('success')
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('error')
    }
  }
  return <form className="contact-form" onSubmit={onSubmit}><h2>{t.formTitle}</h2>
    <label>{t.name}<input name="name" autoComplete="name" required maxLength={100} minLength={2} placeholder={lang === 'en' ? 'e.g. Alex Morgan' : 'ለምሳሌ አለም'} /></label>
    <label>{t.email}<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
    <label>{t.phone}<input name="phone" type="tel" autoComplete="tel" required maxLength={40} onChange={event => { const digits = event.currentTarget.value.replace(/\D/g, ''); event.currentTarget.setCustomValidity(event.currentTarget.value && digits.length < 7 ? (lang === 'en' ? 'Enter at least 7 phone digits.' : 'ቢያንስ 7 የስልክ ቁጥሮችን ያስገቡ።') : '') }} placeholder="+251 ..." /></label>
    <label>{t.serviceRequired}<select name="service" required defaultValue=""><option value="" disabled>{t.selectService}</option>{c.serviceNames.map(service => <option key={service} value={service}>{service}</option>)}</select></label>
    <label>{t.subject}<input name="subject" required maxLength={150} /></label>
    <label>{t.message}<textarea name="message" rows={5} required maxLength={2000} minLength={10} /></label>
    <div className="form-honeypot" aria-hidden="true"><label>{lang === 'en' ? 'Leave this field empty' : 'ይህን መስክ ባዶ ይተዉ'}<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <><LoaderCircle className="loading-icon" size={16} aria-hidden="true" />{t.sending}</> : <>{t.send}<ArrowRight size={16} aria-hidden="true" /></>}</button>
    <p className="form-note">{t.formNote}</p>
    {status !== 'idle' && <p className={`form-notice form-notice-${status}`} role={status === 'error' ? 'alert' : 'status'}>{status === 'success' && <Check size={16} aria-hidden="true" />}{status === 'loading' && <LoaderCircle className="loading-icon" size={16} aria-hidden="true" />}{t[status]}</p>}
  </form>
}

export function ServiceDetail({ lang, serviceIndex }: { lang: Language; serviceIndex: number }) {
  const c = copy[lang]
  const Icon = serviceIcons[serviceIndex]
  return <><div className="detail-head"><div className="service-icon large"><Icon size={28} /></div><h2>{c.serviceNames[serviceIndex]}</h2><p>{c.serviceDescriptions[serviceIndex]}</p></div><div className="detail-list">{c.serviceDetails[serviceIndex].map(detail => <div key={detail}><Check size={17} />{detail}</div>)}</div><Link className="button" to="/contact">{c.serviceCta}<ArrowRight size={16} /></Link></>
}

export function ProcessSteps({ lang }: { lang: Language }) {
  return <div className="process-grid">{copy[lang].home.process.map((step, i) => <div className="process-step" key={step}><span className="process-index">0{i + 1}</span><div className="process-icon">{[<Circle />, <Command />, <Palette />, <Code2 />, <Check />, <ArrowUpRight />][i]}</div><h3>{step}</h3><span className="process-line" /></div>)}</div>
}

export function ScrollHint({ lang }: { lang: Language }) {
  return <a className="scroll-hint" href="#intro" aria-label={copy[lang].common.scrollToExplore}><ArrowDown size={16} aria-hidden="true" /></a>
}
