import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

const platformLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/marcos-antonio-579370160/?locale=en',
    icon: Linkedin,
  },
  { label: 'GitHub', href: 'https://github.com/Marcos-An', icon: Github },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-surface-base">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top — brand + Platform column */}
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-16 lg:py-20">
          <div className="md:col-span-7">
            <Link
              href="/"
              aria-label="BlockEstate home"
              className="text-[22px] font-semibold tracking-tight text-white"
            >
              Block<span className="font-display italic font-medium text-brand">Estate</span>
            </Link>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-400">
              Premium real estate, tokenized and fractional. Own a verified slice from $100, settled
              on-chain.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-5 md:text-right">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Platform
            </h3>
            <ul className="mt-5 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom — copyright + socials */}
        <div className="flex flex-col-reverse items-start gap-6 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-gray-500">
            © {currentYear} BlockEstate. All rights reserved.
          </p>
          <ul className="flex items-center gap-1.5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
