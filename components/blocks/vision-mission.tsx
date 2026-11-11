import Image from 'next/image'

const VISION_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
const MISSION_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'

export function VisionMission() {
  return (
    <section className="bg-surface-base py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Our Vision — text on top, image below */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our Vision
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-400 sm:text-base">
                Founded in 2023 by a team of real estate veterans and blockchain innovators,
                BlockEstate emerged from a simple yet powerful idea: make premium real estate
                investment accessible to everyone. Our vision is to redefine property ownership for
                a generation that values transparency, openness, and access.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={VISION_IMAGE}
                alt="A modern luxury home representing BlockEstate's vision"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Our Mission — image at top on desktop, text below; mobile flips so text comes first */}
          <div className="flex flex-col gap-8">
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl md:order-1">
              <Image
                src={MISSION_IMAGE}
                alt="A modern residential home illustrating accessible real estate ownership"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our Mission
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-400 sm:text-base">
                BlockEstate&apos;s mission is to democratize real estate investment by removing
                traditional barriers to entry while maintaining the highest standards of security
                and transparency. We believe everyone should have the opportunity to invest in
                premium real estate, regardless of their net worth or investment experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
