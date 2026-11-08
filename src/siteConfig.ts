const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://orbitaldigitalsolution.com').replace(/\/+$/, '')

export const siteConfig = {
  siteUrl,
  contactEndpoint: import.meta.env.VITE_CONTACT_API_URL || '',
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
      facebook: '',
      telegram: '',
      linkedIn: '',
      youTube: '',
    },
  },
}
