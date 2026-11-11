import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PropertyCard } from '@/components/properties/property-card'
import { properties } from '@/data/properties'

const FEATURED_LIMIT = 6

export function FeaturedProperties() {
  const featured = properties.slice(0, FEATURED_LIMIT)

  return (
    <section className="scroll-mt-24 bg-surface-base py-28 sm:py-36" id="featured-properties">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 text-base text-gray-400">
              Hand-picked deals available for fractional ownership today.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/properties">
            <Button
              size="lg"
              variant="outline"
              className="h-11 gap-2 rounded-full border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
            >
              See More Properties
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
