import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Layers, type LucideIcon, ShieldCheck, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const HERO_BACKGROUND =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'

type HeroFeature = {
  icon: LucideIcon
  title: string
  description: string
}

const heroFeatures: HeroFeature[] = [
  {
    icon: Layers,
    title: 'Fractional Ownership',
    description: 'Own a verified slice from $100. No gatekeepers, no minimums.',
  },
  {
    icon: ShieldCheck,
    title: 'Vetted On-Chain',
    description: 'Every asset is audited and tokenized with transparent settlement.',
  },
  {
    icon: TrendingUp,
    title: 'Curated Yields',
    description: 'Hand-picked properties averaging 8.5% annual returns.',
  },
]

function FeatureCard({ feature }: { feature: HeroFeature }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-black/60">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <feature.icon className="h-[18px] w-[18px] text-brand" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-white">{feature.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-gray-400">{feature.description}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
      />
    </div>
  )
}

export function HeroBanner() {
  return (
    <section className="relative isolate -mt-[68px] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_BACKGROUND}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-base/30 via-surface-base/45 to-surface-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-base/60 via-surface-base/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_35%,theme(colors.surface.base)_92%)]" />
      </div>

      <div className="mx-auto flex min-h-[78vh] w-full max-w-[92rem] flex-col px-6 pb-10 sm:px-10 lg:px-14 xl:px-20">
        <div className="mt-auto pt-[100px]">
          <h1 className="max-w-5xl text-[2.5rem] leading-[1.02] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5.25rem]">
            <span className="block text-white/85">Own a slice of</span>
            <span className="block">
              <span className="font-display italic font-medium text-brand">premium</span>{' '}
              <span className="text-white/85">real estate,</span>
            </span>
            <span className="block">tokenized and fractional.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-300/90 sm:text-lg">
            BlockEstate revolutionizes property investment through fractional ownership. Buy a
            verified share of premium real estate with crypto, starting from just{' '}
            <span className="font-semibold text-white">$100</span>.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              <Link href="#featured-properties">
                Start Investing
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-full border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
            >
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </div>

          <div className="mt-14">
            {/* Mobile + tablet: CSS marquee with duplicated cards */}
            <div className="-mx-6 overflow-hidden sm:-mx-10 lg:hidden">
              <div className="hero-marquee flex w-max">
                {heroFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="w-[78vw] shrink-0 pl-3 sm:w-[44vw] md:w-[36vw]"
                  >
                    <FeatureCard feature={feature} />
                  </div>
                ))}
                {heroFeatures.map((feature) => (
                  <div
                    key={`dup-${feature.title}`}
                    aria-hidden="true"
                    className="w-[78vw] shrink-0 pl-3 sm:w-[44vw] md:w-[36vw]"
                  >
                    <FeatureCard feature={feature} />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: static grid */}
            <div className="hidden gap-3 lg:grid lg:grid-cols-3">
              {heroFeatures.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
