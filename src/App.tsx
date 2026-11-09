import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Layout, PageIntro, SectionHeading, ServiceCards, ProductCard, ProductMockup, ProcessSteps, CtaBanner, ContactForm, ServiceDetail, ScrollHint, RichText, HeroIllustration } from './components'
import { serviceIcons, serviceSlugs } from './data'
import { copy, type Language } from './translations'
import { ArrowRight, ArrowUpRight, Check, MapPin, Orbit, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from './siteConfig'

function Seo({ lang, title, description, noIndex = false }: { lang: Language; title: string; description?: string; noIndex?: boolean }) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = `${title} | ORBITAL DIGITAL SOLUTION`
    document.documentElement.lang = lang
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = lang === 'en'
      ? 'ORBITAL DIGITAL SOLUTION transforms business ideas into digital solutions through software, technology, creativity, and innovation in Addis Ababa, Ethiopia.'
      : 'ORBITAL DIGITAL SOLUTION በአዲስ አበባ፣ ኢትዮጵያ ሶፍትዌር፣ ቴክኖሎጂና ፈጠራን ያጣመሩ ዲጂታል መፍትሄዎችን ያቀርባል።'
  }, [lang, title])
  useEffect(() => {
    const fullTitle = `${title} | ${siteConfig.company.name}`
    const pageDescription = description ?? copy[lang].home.sub
    const canonicalUrl = `${siteConfig.siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`
    const setMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        document.head.append(element)
      }
      for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value)
    }
    document.title = fullTitle
    setMeta('meta[name="description"]', { name: 'description', content: pageDescription })
    setMeta('meta[name="robots"]', { name: 'robots', content: noIndex ? 'noindex,follow' : 'index,follow' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: pageDescription })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteConfig.company.name })
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: lang === 'am' ? 'am_ET' : 'en_ET' })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: pageDescription })
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = canonicalUrl
    const schema = document.getElementById('business-schema')
    if (schema) {
      const socials = Object.values(siteConfig.contact.social).filter(Boolean)
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.company.name,
        url: siteConfig.siteUrl,
        description: pageDescription,
        areaServed: { '@type': 'City', name: siteConfig.company.addressLocality },
        address: { '@type': 'PostalAddress', addressLocality: siteConfig.company.addressLocality, addressCountry: siteConfig.company.addressCountry },
        ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
        ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
        ...(socials.length ? { sameAs: socials } : {}),
      })
    }
  }, [description, lang, noIndex, pathname, title])
  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function HomePage({ lang }: { lang: Language }) {
  const c = copy[lang]
  return <>
    <Seo lang={lang} title={lang === 'en' ? 'Home' : 'መነሻ'} description={c.home.sub} />
    <section className="hero"><div className="hero-grid" /><div className="hero-glow hero-glow-a" /><div className="hero-glow hero-glow-b" /><div className="hero-orbit"><div className="orbit-core"><Orbit size={42} strokeWidth={1.2} /></div><span className="orbit-dot" /><span className="orbit-dot orbit-dot-two" /></div><HeroIllustration />
      <div className="container hero-content"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{c.home.eyebrow}</span><h1><RichText text={c.home.headline} /></h1><p>{c.home.sub}</p><div className="hero-actions"><a className="button" href="#services">{c.common.explore}<ArrowRight size={16} aria-hidden="true" /></a><Link className="button button-outline" to="/contact">{c.common.contactUs}<ArrowUpRight size={16} aria-hidden="true" /></Link></div><div className="hero-footnote"><span className="hero-footnote-line" aria-hidden="true" />{c.home.trust}</div></div></div><ScrollHint lang={lang} />
    </section>
    <section id="intro" className="section about-preview"><div className="container about-layout"><SectionHeading eyebrow={c.home.aboutEyebrow} title={c.home.aboutTitle} /><div className="about-copy"><p>{c.home.aboutText}</p><Link className="text-link" to="/about">{c.common.learnAbout}<ArrowRight size={15} /></Link><div className="about-location"><MapPin size={16} aria-hidden="true" /> {c.footer.location}</div></div></div></section>
    <section id="services" className="section services-section"><div className="container"><SectionHeading eyebrow={c.home.servicesEyebrow} title={c.home.servicesTitle} text={c.home.servicesText} /><ServiceCards lang={lang} /><div className="section-more"><Link className="text-link" to="/services">{c.common.viewAll}<ArrowRight size={15} /></Link></div></div></section>
    <section className="section product-section"><div className="container"><ProductCard lang={lang} /></div></section>
    <section className="section why-section"><div className="container why-layout"><div><SectionHeading eyebrow={c.home.whyEyebrow} title={c.home.whyTitle} /><p className="why-intro">{c.home.aboutText}</p></div><div className="why-grid">{c.home.whyItems.map((item, i) => <div className="why-item" key={item}><span className="why-number">0{i + 1}</span><span className="why-check"><Check size={15} /></span><h3>{item}</h3></div>)}</div></div></section>
    <section className="section process-section"><div className="container"><SectionHeading eyebrow={c.home.processEyebrow} title={c.home.processTitle} centered /><ProcessSteps lang={lang} /></div></section>
    <CtaBanner lang={lang} />
  </>
}

function AboutPage({ lang }: { lang: Language }) {
  const c = copy[lang].pages.about
  const items = [
    { title: c.mission, text: c.missionText, icon: <Orbit /> },
    { title: c.vision, text: c.visionText, icon: <Sparkles /> },
  ]
  return <><Seo lang={lang} title={copy[lang].nav.about} description={c.intro} /><PageIntro eyebrow={c.eyebrow} title={c.title} text={c.intro} />
    <section className="section"><div className="container"><div className="about-values-grid">{items.map(item => <article className="value-card" key={item.title}><div className="service-icon">{item.icon}</div><h2>{item.title}</h2><p>{item.text}</p></article>)}</div><div className="values-band"><span className="eyebrow"><span className="eyebrow-dot" />{lang === 'en' ? 'WHAT GUIDES US' : 'መመሪያችን'}</span><h2>{c.valuesText}</h2><div className="value-tags">{c.values.map((value, i) => <span key={value}><b>0{i + 1}</b>{value}</span>)}</div></div></div></section><CtaBanner lang={lang} /></>
}

function ServicesPage({ lang }: { lang: Language }) {
  const c = copy[lang].pages.services
  return <><Seo lang={lang} title={copy[lang].nav.services} description={c.intro} /><PageIntro eyebrow={c.eyebrow} title={c.title} text={c.intro} /><section className="section services-page-section"><div className="container"><ServiceCards lang={lang} /></div></section><CtaBanner lang={lang} /></>
}

function ServicePage({ lang }: { lang: Language }) {
  const location = useLocation()
  const index = serviceSlugs.indexOf(location.pathname.split('/').pop() ?? '')
  if (index < 0) return <Navigate to="/services" replace />
  const Icon = serviceIcons[index]
  return <><Seo lang={lang} title={copy[lang].serviceNames[index]} description={copy[lang].serviceDescriptions[index]} /><PageIntro eyebrow={copy[lang].pages.services.eyebrow} title={`${copy[lang].serviceNames[index]}<em>.</em>`} text={copy[lang].serviceDescriptions[index]} /><section className="section"><div className="container detail-layout"><div className="detail-aside"><div className="detail-icon-art"><Icon size={56} strokeWidth={1.1} aria-hidden="true" /><span>0{index + 1}</span></div><p>{copy[lang].pages.services.detailNote}</p></div><div className="detail-content"><ServiceDetail lang={lang} serviceIndex={index} /></div></div></section><CtaBanner lang={lang} /></>
}

function ProductsPage({ lang }: { lang: Language }) {
  const c = copy[lang].pages.products
  return <><Seo lang={lang} title={copy[lang].nav.products} description={c.intro} /><PageIntro eyebrow={c.eyebrow} title={c.title} text={c.intro} /><section className="section product-section"><div className="container"><ProductCard lang={lang} /></div></section><CtaBanner lang={lang} /></>
}

function PosPage({ lang }: { lang: Language }) {
  const c = copy[lang].pages.pos
  return <><Seo lang={lang} title="ORBITAL POS" description={c.intro} /><PageIntro eyebrow={c.eyebrow} title={c.title} text={c.intro} />
    <section className="section pos-page"><div className="container"><div className="pos-feature"><div className="pos-feature-copy"><span className="product-badges"><span><span className="status-dot" aria-hidden="true" />{copy[lang].common.inDevelopment}</span></span><h2>{c.productPitch}</h2><p>{c.intro}</p></div><ProductMockup lang={lang} /></div>
      <div className="pos-notice"><span>i</span><p>{c.note}</p></div>
      <div className="pos-features"><div><span className="eyebrow"><span className="eyebrow-dot" />{c.availableTitle}</span><div className="pos-feature-list">{c.available.map(item => <div key={item}><Check size={16} /><span>{item}</span></div>)}</div></div><div className="planned-panel"><span className="eyebrow">{copy[lang].common.planned}</span><h3>{c.plannedTitle}</h3>{c.planned.map(item => <p key={item}><span className="planned-dot" />{item}</p>)}</div></div>
      <div className="pos-bottom-cta"><p>{c.cta}</p><Link className="button" to="/contact">{copy[lang].common.contactUs}<ArrowRight size={16} /></Link></div>
    </div></section><CtaBanner lang={lang} /></>
}

function PortfolioPage({ lang }: { lang: Language }) {
  const c = copy[lang].pages.portfolio
  return <><Seo lang={lang} title={copy[lang].nav.portfolio} description={c.intro} /><PageIntro eyebrow={c.eyebrow} title={c.title} text={c.intro} /><section className="section"><div className="container"><article className="portfolio-placeholder"><div className="placeholder-art" aria-hidden="true"><div className="placeholder-orbit"><Orbit size={58} strokeWidth={1} /></div><span className="placeholder-label">{c.placeholder}</span></div><div className="placeholder-copy"><span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{c.placeholderEyebrow}</span><h2>{c.placeholderTitle}</h2><p>{c.placeholderText}</p><Link className="text-link" to="/contact">{copy[lang].common.contactUs}<ArrowRight size={15} /></Link></div></article></div></section><CtaBanner lang={lang} /></>
}

function ContactPage({ lang }: { lang: Language }) {
  const c = copy[lang].pages.contact
  const socialLabels: Record<string, string> = { facebook: 'Facebook', telegram: 'Telegram', instagram: 'Instagram', linkedIn: 'LinkedIn', youTube: 'YouTube', tikTok: 'TikTok' }
  const socialChannels = Object.entries(siteConfig.contact.social)
    .filter(([, url]) => /^https:\/\//i.test(url))
    .map(([key, url]) => ({ name: socialLabels[key] ?? key, url }))
  const address = siteConfig.contact.officeAddress || c.addressPlaceholder
  const email = siteConfig.contact.email
  const phone = siteConfig.contact.phone
  const whatsapp = siteConfig.contact.whatsapp
  return <>  <Seo lang={lang} title={copy[lang].nav.contact} description={c.intro} /><PageIntro eyebrow={c.eyebrow} title={c.title} text={c.intro} /><section className="section contact-section"><div className="container contact-layout"><ContactForm lang={lang} /><aside className="contact-aside"><span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{c.contactDetails}</span><h2>{lang === 'en' ? 'We’re based in Addis Ababa.' : 'አድራሻችን አዲስ አበባ ነው።'}</h2><div className="contact-detail"><MapPin size={17} aria-hidden="true" /><div><small>{c.location}</small><span>{c.locationValue}</span><span>{address}</span></div></div><div className="contact-detail"><ArrowUpRight size={17} aria-hidden="true" /><div><small>{lang === 'en' ? 'Business email' : 'የንግድ ኢሜይል'}</small>{email ? <a href={`mailto:${email}`}>{email}</a> : <span>{c.emailPlaceholder}</span>}</div></div><div className="contact-detail"><ArrowUpRight size={17} aria-hidden="true" /><div><small>{lang === 'en' ? 'Phone number' : 'ስልክ ቁጥር'}</small>{phone ? <a href={`tel:${phone}`}>{phone}</a> : <span>{c.phonePlaceholder}</span>}</div></div><div className="contact-detail"><ArrowUpRight size={17} aria-hidden="true" /><div><small>WhatsApp</small>{whatsapp ? <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">{whatsapp}</a> : <span>{c.whatsappPlaceholder}</span>}</div></div><div className="contact-detail"><ArrowUpRight size={17} aria-hidden="true" /><div><small>{c.social}</small>{socialChannels.map(channel => <span key={channel.name}><a href={channel.url} target="_blank" rel="noreferrer">{channel.name}</a></span>)}</div></div></aside></div></section></>
}

function NotFoundPage({ lang }: { lang: Language }) {
  return <><Seo lang={lang} title={copy[lang].notFound.title} description={copy[lang].notFound.description} noIndex /><section className="not-found"><div className="container"><div className="not-found-art" aria-hidden="true"><Orbit size={58} strokeWidth={1} /></div><span className="eyebrow">{copy[lang].notFound.eyebrow}</span><h1>{copy[lang].notFound.heading}</h1><Link className="button" to="/">{copy[lang].common.backHome}<ArrowRight size={16} /></Link></div></section></>
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try { return localStorage.getItem('orbital-language') === 'am' ? 'am' : 'en' } catch { return 'en' }
  })
  const changeLang = (next: Language) => {
    setLang(next)
    try { localStorage.setItem('orbital-language', next) } catch { /* Language choice still applies for this visit. */ }
  }
  return <><ScrollToTop /><Layout lang={lang} setLang={changeLang}><Routes>
    <Route path="/" element={<HomePage lang={lang} />} />
    <Route path="/about" element={<AboutPage lang={lang} />} />
    <Route path="/services" element={<ServicesPage lang={lang} />} />
    <Route path="/services/:slug" element={<ServicePage lang={lang} />} />
    <Route path="/products" element={<ProductsPage lang={lang} />} />
    <Route path="/orbital-pos" element={<PosPage lang={lang} />} />
    <Route path="/portfolio" element={<PortfolioPage lang={lang} />} />
    <Route path="/contact" element={<ContactPage lang={lang} />} />
    <Route path="*" element={<NotFoundPage lang={lang} />} />
  </Routes></Layout></>
}
