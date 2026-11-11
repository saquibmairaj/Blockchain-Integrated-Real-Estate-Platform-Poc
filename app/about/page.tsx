import type { Metadata } from 'next'
import Image from 'next/image'
import { Manifesto } from '@/components/blocks/manifesto'
import { VisionMission } from '@/components/blocks/vision-mission'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SectionHeader } from '@/components/ui/section-header'
import { aboutStats, leadershipTeam } from '@/data/about'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The team and mission behind BlockEstate — making premium real estate investment open to everyone through tokenized fractional ownership.',
}

const ORIGIN_IMAGE =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-base text-gray-100">
      {/* 1 — Editorial intro */}
      <section className="pb-20 pt-28 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Eyebrow>About BlockEstate</Eyebrow>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                Premium real estate,{' '}
                <span className="font-display italic font-medium text-brand">
                  open to everyone.
                </span>
              </h1>
            </div>
            <div className="space-y-5 text-[15px] leading-relaxed text-gray-400 sm:text-base md:col-span-6 md:col-start-7">
              <p>
                Founded in 2023 by a team of real estate veterans and blockchain innovators,
                BlockEstate emerged from a simple yet powerful idea: make premium real estate
                investment accessible to everyone.
              </p>
              <p>
                A chance meeting between our founders — real estate investment expert Ruslan
                Chukhrai and business expert Jan Strandberg — changed the future of real estate
                investing. Jan had spent years watching talented investors being priced out of
                premium real estate markets, while Harrison was exploring ways to use blockchain to
                democratize traditional investment structures.
              </p>
              <p>
                Together, they envisioned a platform that would combine the security of traditional
                real estate investment with the accessibility of blockchain technology. After months
                of development and legal consultation, BlockEstate was born.
              </p>
            </div>
          </div>

          <div className="relative mt-16 aspect-[16/7] overflow-hidden rounded-3xl lg:mt-24">
            <Image
              src={ORIGIN_IMAGE}
              alt="A premium residential property representing BlockEstate's portfolio"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2 — Manifesto */}
      <Manifesto />

      {/* 3 — Vision & Mission */}
      <VisionMission />

      {/* 4 — Stats inline strip */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 border-y border-white/10 py-16 sm:grid-cols-3 sm:gap-6">
            {aboutStats.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                  {item.stat}
                </p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Team */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Leadership"
            title={
              <>
                The team behind{' '}
                <span className="font-display italic font-medium text-brand">BlockEstate</span>
              </>
            }
            description="Blending decades of real estate expertise with deep blockchain innovation."
          />

          <div className="mx-auto mt-16 grid max-w-4xl gap-12 sm:grid-cols-3 sm:gap-8">
            {leadershipTeam.map((member) => (
              <article key={member.name} className="text-center">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
