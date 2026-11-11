export type PropertyType = 'Residential' | 'Commercial'

export type Property = {
  id: number
  title: string
  location: string
  price: number
  roi: number
  image: string
  type: PropertyType
  bedrooms?: number
  area: number
  yearBuilt: number
  tokensAvailable: number
  description: string
}

export const properties: Property[] = [
  {
    id: 1,
    title: 'Luxury Apartment in Downtown',
    location: 'Manhattan, New York',
    price: 250000,
    roi: 8.5,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    type: 'Residential',
    bedrooms: 2,
    area: 1200,
    yearBuilt: 2020,
    tokensAvailable: 68,
    description:
      'A bright two-bedroom apartment in the heart of Manhattan, blocks from Central Park and the financial district. Floor-to-ceiling windows, premium finishes and a doorman building with rooftop access. Strong long-term rental demand from finance and tech professionals keeps occupancy high year-round.',
  },
  {
    id: 2,
    title: 'Beachfront Villa',
    location: 'Miami Beach, Florida',
    price: 500000,
    roi: 7.2,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    type: 'Residential',
    bedrooms: 5,
    area: 3400,
    yearBuilt: 2018,
    tokensAvailable: 42,
    description:
      'Five-bedroom oceanfront villa with private beach access, infinity pool and panoramic Atlantic views. Operates on a luxury short-term rental model averaging 78% occupancy. Hurricane-grade construction and full property management included.',
  },
  {
    id: 3,
    title: 'Modern Office Building',
    location: 'SoMa, San Francisco',
    price: 750000,
    roi: 9.1,
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    type: 'Commercial',
    area: 8500,
    yearBuilt: 2015,
    tokensAvailable: 23,
    description:
      'Class A office building with anchor tenants in fintech and AI. Currently 91% leased on long-term contracts averaging 5.8 years. LEED Gold certified with on-site amenities and walking distance to Caltrain — strongest yields in the catalog.',
  },
  {
    id: 4,
    title: 'Industrial Brooklyn Loft',
    location: 'Williamsburg, Brooklyn',
    price: 180000,
    roi: 7.8,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80',
    type: 'Residential',
    bedrooms: 1,
    area: 850,
    yearBuilt: 2019,
    tokensAvailable: 55,
    description:
      'Converted-warehouse loft in the heart of Williamsburg, steps from the L train. Original exposed brick, 14ft ceilings and modernized utilities. A tested rental in the creative-class market with steady mid-term lease demand and minimal vacancy gaps.',
  },
  {
    id: 5,
    title: 'Tech Hub Office Suite',
    location: 'East Austin, Texas',
    price: 620000,
    roi: 8.9,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Commercial',
    area: 5200,
    yearBuilt: 2021,
    tokensAvailable: 81,
    description:
      'Modern office suite in East Austin, leased to a Series-B SaaS company through 2031. Built to spec with conference rooms, flex desks and rooftop terrace. Rent escalates 3% annually under the master lease — predictable yield with minimal management overhead.',
  },
  {
    id: 6,
    title: 'Mountain View Chalet',
    location: 'Aspen, Colorado',
    price: 890000,
    roi: 6.5,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Residential',
    bedrooms: 4,
    area: 2800,
    yearBuilt: 2017,
    tokensAvailable: 12,
    description:
      'Four-bedroom alpine chalet with ski-in/ski-out access in Aspen. Operates as a premium short-term rental during peak ski and summer seasons, with consistent 5-star guest reviews. Comes with full property management and a wait-list of returning renters.',
  },
  {
    id: 7,
    title: 'Riverside Modern Loft',
    location: 'River North, Chicago',
    price: 320000,
    roi: 8.2,
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'Residential',
    bedrooms: 2,
    area: 1450,
    yearBuilt: 2019,
    tokensAvailable: 64,
    description:
      'Two-bedroom riverside loft in River North with skyline and Chicago River views. Open-plan layout, in-unit laundry and dedicated parking. Located in one of the highest-demand rental submarkets in the Midwest, with sub-3% historical vacancy.',
  },
  {
    id: 8,
    title: 'Capitol Hill Townhome',
    location: 'Capitol Hill, Seattle',
    price: 410000,
    roi: 7.5,
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'Residential',
    bedrooms: 2,
    area: 1100,
    yearBuilt: 2020,
    tokensAvailable: 38,
    description:
      'Two-bedroom modern townhome in Capitol Hill, near downtown Seattle and Amazon HQ. Energy-efficient build with rooftop deck and private garage. Targets the steady young-professional rental market with strong long-term upside as the neighborhood densifies.',
  },
  {
    id: 9,
    title: 'Music Row Office Tower',
    location: 'Music Row, Nashville',
    price: 550000,
    roi: 8.7,
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'Commercial',
    area: 4200,
    yearBuilt: 2017,
    tokensAvailable: 71,
    description:
      'Boutique office tower on Nashville’s Music Row, leased to a mix of music labels and creative agencies. 100% occupied with weighted lease term of 4.2 years. Riding Nashville’s explosive commercial growth with built-in 4% annual rent step-ups.',
  },
  {
    id: 10,
    title: 'Highland Modern Cottage',
    location: 'Highland, Denver',
    price: 290000,
    roi: 6.8,
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'Residential',
    bedrooms: 3,
    area: 1850,
    yearBuilt: 2016,
    tokensAvailable: 49,
    description:
      'Three-bedroom craftsman cottage in Denver’s Highland neighborhood, walking distance to LoHi’s restaurant scene. Renovated kitchen, finished basement and a rentable backyard ADU. A diversified yield play between primary residence rental and ADU income.',
  },
  {
    id: 11,
    title: 'Beacon Hill Historic Townhouse',
    location: 'Beacon Hill, Boston',
    price: 680000,
    roi: 7.0,
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'Residential',
    bedrooms: 4,
    area: 2400,
    yearBuilt: 2014,
    tokensAvailable: 27,
    description:
      'Four-bedroom historic townhouse in the protected Beacon Hill district. Original detailing preserved alongside modern systems. Premium tenant pool from Boston’s academic and medical sectors keeps lease pricing 18% above neighborhood average.',
  },
  {
    id: 12,
    title: 'Pearl District Retail Suite',
    location: 'Pearl District, Portland',
    price: 475000,
    roi: 9.3,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'Commercial',
    area: 6800,
    yearBuilt: 2022,
    tokensAvailable: 86,
    description:
      'Ground-floor retail suite in Portland’s Pearl District, leased to an independent grocer with a 10-year corporate guarantee. Prime walkable corner with consistent foot traffic. Highest yield in the catalog and brand-new build with minimal capex risk.',
  },
]
