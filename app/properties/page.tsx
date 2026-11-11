import type { Metadata } from 'next'
import { PropertyCard } from '@/components/properties/property-card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { properties } from '@/data/properties'

export const metadata: Metadata = {
  title: 'Properties',
  description:
    'Browse the BlockEstate catalog of premium real estate available for fractional ownership.',
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-surface-base text-gray-100">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <header className="max-w-3xl">
          <Eyebrow>Catalog</Eyebrow>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Browse the <span className="font-display italic font-medium text-brand">premium</span>{' '}
            catalog
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Hand-picked residential and commercial properties — vetted, tokenized and ready for
            fractional ownership starting at $100.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}
