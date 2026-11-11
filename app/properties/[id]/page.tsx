import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Building2, Home, MapPin, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Stat } from '@/components/ui/stat'
import { FractionalOwnershipSlider } from '@/components/properties/fractional-ownership-slider'
import { properties } from '@/data/properties'
import { CRYPTO_SYMBOL, FALLBACK_ETH_PRICE_USD, TOKEN_PRICE_USD } from '@/lib/properties/config'

type Props = {
  params: Promise<{ id: string }>
}

function getPropertyById(id: string) {
  const propertyId = Number.parseInt(id, 10)

  if (!Number.isInteger(propertyId)) {
    return undefined
  }

  return properties.find((property) => property.id === propertyId)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    return {
      title: 'Property not found',
    }
  }

  return {
    title: property.title,
    description: `Invest in ${property.title} located in ${property.location}. Expected ROI: ${property.roi}%.`,
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    notFound()
  }

  const TypeIcon = property.type === 'Commercial' ? Building2 : Home
  const layoutLabel =
    property.type === 'Residential' && property.bedrooms ? `${property.bedrooms} BR` : 'Office'
  const fundedPercent = 100 - property.tokensAvailable
  const availableUSD = property.price * (property.tokensAvailable / 100)

  return (
    <div className="min-h-screen bg-surface-base text-gray-100">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all properties
        </Link>

        {/* Header */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-white ring-1 ring-white/10">
              <TypeIcon className="h-3 w-3" aria-hidden="true" />
              {property.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-400/30">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              On-Chain
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {property.title}
          </h1>
          <p className="mt-3 inline-flex items-center gap-1.5 text-base text-gray-400">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {property.location}
          </p>
        </div>

        {/* Main grid — mobile: image → panel → funding → details → about; desktop: image+details+about+funding on left, sticky panel on right */}
        <div className="mt-10 grid gap-y-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-x-12 lg:gap-y-12">
          {/* 1. Image */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 2. Investment panel (Asset value + Funding + Slider + CTA) — sticky on lg */}
          <aside className="lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white/[0.03] p-7 backdrop-blur-sm">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Asset value
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                    ${property.price.toLocaleString('en-US')}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-success/12 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
                  {property.roi}% ROI
                </span>
              </div>

              <div className="mt-5" aria-labelledby="funding-status-heading">
                <div className="flex items-center justify-between text-[12px]">
                  <span id="funding-status-heading" className="font-semibold text-white">
                    {fundedPercent}% funded
                  </span>
                  <span className="text-gray-400">
                    ${availableUSD.toLocaleString('en-US')} left
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
                  role="progressbar"
                  aria-valuenow={fundedPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${fundedPercent}% funded`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-brand-soft"
                    style={{ width: `${fundedPercent}%` }}
                  />
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <FractionalOwnershipSlider
                tokenPrice={TOKEN_PRICE_USD}
                totalTokens={property.price / TOKEN_PRICE_USD}
                cryptoSymbol={CRYPTO_SYMBOL}
                cryptoPrice={FALLBACK_ETH_PRICE_USD}
              />

              <Button className="mt-7 h-11 w-full rounded-full bg-brand text-sm font-semibold text-white hover:bg-brand-hover">
                Invest Now
              </Button>

              <p className="mt-4 text-center text-[11px] text-gray-500">
                Settled on-chain · From ${TOKEN_PRICE_USD} / share
              </p>
            </div>
          </aside>

          {/* 3. Property Details — desktop row 2 */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <Eyebrow>Property details</Eyebrow>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              <Stat label="Layout" value={layoutLabel} />
              <Stat label="Area" value={`${property.area.toLocaleString('en-US')} sqft`} />
              <Stat label="Built" value={String(property.yearBuilt)} />
              <Stat label="Type" value={property.type} />
            </div>
          </div>

          {/* 4. About — desktop row 3 */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-3">
            <Eyebrow>About this property</Eyebrow>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-400 sm:text-base">
              <p>{property.description}</p>
              <p>
                Each share is fully tokenized on-chain via a dedicated LLC structure, giving you
                direct ownership rights and automated rental income distribution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
