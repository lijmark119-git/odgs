const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://orbitaldigitalsolution.com').replace(/\/+$/, '')

export const siteConfig = {
  siteUrl,
  company: {
    name: 'ORBITAL DIGITAL SOLUTION',
    location: 'Addis Ababa, Ethiopia',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  contact: {
    email: '',
    phone: '',
    whatsapp: '',
    officeAddress: '',
    social: {
      facebook: 'https://facebook.com/orbitdigitalsolutions.et',
      telegram: 'https://t.me/Orbitdigitalsolutions',
      instagram: 'https://www.instagram.com/orbitdigitalsolutions_et',
      linkedIn: '',
      youTube: 'https://youtube.com/@orbitdigitalsolutions_Et',
      tikTok: 'https://tiktok.com/@orbitdigitalsolutions',
    },
  },
}
