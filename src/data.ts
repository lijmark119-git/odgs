import {
  Code2, MonitorSmartphone, Smartphone, Camera, Network, Palette, Clapperboard, Megaphone,
  type LucideIcon,
} from 'lucide-react'

export const serviceIcons: LucideIcon[] = [
  Code2, MonitorSmartphone, Smartphone, Camera, Network, Palette, Clapperboard, Megaphone,
]

export const serviceSlugs = ['web-development', 'software-development', 'mobile-apps', 'security-systems', 'networking-it', 'graphic-design-branding', 'video-production', 'digital-marketing']

export const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'products', path: '/products' },
  { key: 'pos', path: '/orbital-pos' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'contact', path: '/contact' },
] as const
