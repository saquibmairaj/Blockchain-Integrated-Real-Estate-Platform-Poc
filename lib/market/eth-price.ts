const ETH_PRICE_ENDPOINT =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'

type CoinGeckoEthPriceResponse = {
  ethereum?: {
    usd?: number
  }
}

export async function fetchEthPrice(): Promise<number> {
  const response = await fetch(ETH_PRICE_ENDPOINT)

  if (!response.ok) {
    throw new Error('Unable to fetch ETH price.')
  }

  const data = (await response.json()) as CoinGeckoEthPriceResponse
  const price = data.ethereum?.usd

  if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
    throw new Error('ETH price response is invalid.')
  }

  return price
}
