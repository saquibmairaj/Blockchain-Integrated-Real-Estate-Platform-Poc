import { FeaturedProperties } from '@/components/blocks/featured-properties'
import { HeroBanner } from '@/components/blocks/hero-banner'
import { HowItWorks } from '@/components/blocks/how-it-works'
import { Manifesto } from '@/components/blocks/manifesto'
import { VisionMission } from '@/components/blocks/vision-mission'

export default function Page() {
  return (
    <div className="min-h-screen bg-surface-base text-gray-100">
      <HeroBanner />
      <FeaturedProperties />
      <HowItWorks />
      <Manifesto />
      <VisionMission />
    </div>
  )
}
