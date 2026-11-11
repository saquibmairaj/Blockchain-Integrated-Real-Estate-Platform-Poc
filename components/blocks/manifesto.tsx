import { Eyebrow } from '@/components/ui/eyebrow'

export function Manifesto() {
  return (
    <section className="bg-surface-base py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Eyebrow>What we believe</Eyebrow>
        <p className="mt-6 font-display text-3xl font-medium italic leading-snug text-white sm:text-4xl md:text-[2.75rem]">
          &ldquo;Everyone should have the opportunity to invest in premium real estate.&rdquo;
        </p>
      </div>
    </section>
  )
}
