import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  Check,
  Coins,
  FileCheck,
  Layers,
  Shield,
  Sparkles,
  Split,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SectionHeader } from '@/components/ui/section-header'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'How BlockEstate turns premium real estate into tokenized fractional ownership — from property selection to on-chain settlement.',
}

const processSteps = [
  {
    title: 'Property Selection',
    description:
      'Our team identifies and acquires premium real estate properties with strong potential for appreciation and rental income. Every asset goes through a rigorous due-diligence process before joining the catalog.',
  },
  {
    title: 'Tokenization',
    description:
      'Each property is held by a dedicated LLC, and the membership interests are tokenized on the blockchain — creating verifiable, transferable digital ownership records that map 1:1 to real-world equity.',
  },
  {
    title: 'Fractional Ownership',
    description:
      'Investors can purchase any percentage of the property through our platform, starting from as little as $100. Settlement happens on-chain, with returns and rental income distributed automatically.',
  },
]

const legalCards = [
  {
    icon: Shield,
    title: 'LLC ownership structure',
    description:
      'Each property is owned by a dedicated LLC, which is then subdivided into membership interests. A legally compliant structure that protects investor rights while enabling true fractional ownership.',
  },
  {
    icon: FileCheck,
    title: 'Regulatory compliance',
    description:
      'Our structure complies with SEC regulations as a direct property interest rather than a security, allowing for simplified investment without extensive securities-law overhead.',
  },
]

const investorBenefits = [
  { icon: Coins, label: 'Low minimum investment threshold' },
  { icon: Shield, label: 'Direct property ownership rights' },
  { icon: Building2, label: 'Access to premium real estate' },
  { icon: Sparkles, label: 'Vetted, hand-picked deal flow' },
]

const platformBenefits = [
  { icon: Shield, label: 'Secure blockchain records' },
  { icon: Users, label: 'Automated distribution of rental income' },
  { icon: Split, label: 'Professional property management' },
  { icon: Layers, label: 'Transparent on-chain settlement' },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-surface-base text-gray-100">
      {/* 1 — Editorial intro */}
      <section className="pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                From property to{' '}
                <span className="font-display italic font-medium text-brand">your wallet</span>.
              </h1>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-gray-400 sm:text-base">
              <p>
                BlockEstate turns premium real estate into something anyone can own a slice of. Each
                property is acquired, legally structured into an LLC, and tokenized on-chain so that
                ownership is verifiable, transferable and transparent.
              </p>
              <p>
                Investors browse a curated catalog, buy fractional shares with crypto starting at
                $100, and earn returns from rental income and appreciation — settled on-chain, with
                no gatekeepers between you and the asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Investment process — numbered list with dividers */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Investment process"
            title={
              <>
                Three steps from acquisition to{' '}
                <span className="font-display italic font-medium text-brand">ownership</span>
              </>
            }
          />

          <div className="mx-auto mt-14 max-w-5xl border-t border-white/10">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-10"
              >
                <div className="font-display text-4xl font-medium italic leading-none text-brand/80 sm:w-20 sm:text-5xl">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-400 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Legal structure */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Legal structure"
            title={
              <>
                Built on a{' '}
                <span className="font-display italic font-medium text-brand">compliance-first</span>{' '}
                foundation
              </>
            }
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
            {legalCards.map((card) => (
              <article key={card.title} className="rounded-2xl bg-white/[0.025] p-7">
                <card.icon className="h-9 w-9 text-brand" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-400 sm:text-base">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Benefits */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What you unlock"
            title={
              <>
                Real ownership.{' '}
                <span className="font-display italic font-medium text-brand">Real</span> returns.
              </>
            }
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
            <article className="rounded-2xl bg-white/[0.025] p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                For investors
              </h3>
              <ul className="mt-6 space-y-4">
                {investorBenefits.map((benefit) => (
                  <li key={benefit.label} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-[15px] text-gray-200">{benefit.label}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl bg-white/[0.025] p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Platform features
              </h3>
              <ul className="mt-6 space-y-4">
                {platformBenefits.map((benefit) => (
                  <li key={benefit.label} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-[15px] text-gray-200">{benefit.label}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 5 — CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to{' '}
            <span className="font-display italic font-medium text-brand">own your slice</span>?
          </h2>
          <p className="mt-4 text-base text-gray-400 sm:text-lg">
            Browse the catalog and buy fractional shares from $100, settled on-chain.
          </p>
          <div className="mt-8">
            <Link href="/properties">
              <Button
                size="lg"
                className="h-11 rounded-full bg-brand px-7 text-sm font-semibold text-white hover:bg-brand-hover"
              >
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
