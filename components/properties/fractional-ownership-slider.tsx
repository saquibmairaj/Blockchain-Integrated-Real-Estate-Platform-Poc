'use client'

import { useEffect, useMemo, useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/components/ui/utils'
import { fetchEthPrice } from '@/lib/market/eth-price'

const ETH_PRICE_REFRESH_SECONDS = 60

type MarketPriceStatus = 'loading' | 'live' | 'fallback'

interface FractionalOwnershipSliderProps {
  tokenPrice: number
  totalTokens: number
  cryptoSymbol: string
  cryptoPrice: number
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function FractionalOwnershipSlider({
  tokenPrice,
  totalTokens,
  cryptoSymbol,
  cryptoPrice,
}: FractionalOwnershipSliderProps) {
  const [tokens, setTokens] = useState(1)
  const [liveEthPrice, setLiveEthPrice] = useState<number | null>(null)
  const [marketPriceStatus, setMarketPriceStatus] = useState<MarketPriceStatus>('loading')
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(ETH_PRICE_REFRESH_SECONDS)

  useEffect(() => {
    let isMounted = true

    async function refreshEthPrice() {
      try {
        const price = await fetchEthPrice()

        if (!isMounted) {
          return
        }

        setLiveEthPrice(price)
        setMarketPriceStatus('live')
        setSecondsUntilRefresh(ETH_PRICE_REFRESH_SECONDS)
      } catch {
        if (!isMounted) {
          return
        }

        setLiveEthPrice(null)
        setMarketPriceStatus('fallback')
        setSecondsUntilRefresh(ETH_PRICE_REFRESH_SECONDS)
      }
    }

    void refreshEthPrice()

    const refreshInterval = window.setInterval(refreshEthPrice, ETH_PRICE_REFRESH_SECONDS * 1000)
    const countdownInterval = window.setInterval(() => {
      setSecondsUntilRefresh((seconds) => (seconds > 1 ? seconds - 1 : ETH_PRICE_REFRESH_SECONDS))
    }, 1000)

    return () => {
      isMounted = false
      window.clearInterval(refreshInterval)
      window.clearInterval(countdownInterval)
    }
  }, [])

  const effectiveCryptoPrice = liveEthPrice ?? cryptoPrice
  const usdValue = tokens * tokenPrice
  const cryptoValue = usdValue / effectiveCryptoPrice
  const ownershipPercentage = (tokens / totalTokens) * 100

  const marketStatusCopy = useMemo(() => {
    if (marketPriceStatus === 'loading') {
      return {
        label: 'Loading live ETH price...',
        detail: `Fallback ${cryptoSymbol} price: ${usdFormatter.format(cryptoPrice)}`,
      }
    }

    if (marketPriceStatus === 'fallback') {
      return {
        label: 'Using fallback ETH price',
        detail: 'Live market pricing is temporarily unavailable.',
      }
    }

    return {
      label: 'Live ETH price',
      detail: `Updates in ${secondsUntilRefresh}s`,
    }
  }, [cryptoPrice, cryptoSymbol, marketPriceStatus, secondsUntilRefresh])

  return (
    <div>
      {/* Market price status — compact */}
      <div
        className="flex items-start justify-between gap-3 text-[12px]"
        role="status"
        aria-live="polite"
      >
        <div className="min-w-0">
          <p
            className={cn(
              'flex items-center gap-2 font-semibold',
              marketPriceStatus === 'live' && 'text-emerald-300',
              marketPriceStatus === 'loading' && 'text-gray-400',
              marketPriceStatus === 'fallback' && 'text-amber-300',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'h-1.5 w-1.5 shrink-0 rounded-full',
                marketPriceStatus === 'live' && 'animate-pulse bg-emerald-400',
                marketPriceStatus === 'loading' && 'bg-gray-500',
                marketPriceStatus === 'fallback' && 'bg-amber-400',
              )}
            />
            <span className="truncate">{marketStatusCopy.label}</span>
          </p>
          <p className="mt-1 text-[11px] text-gray-500">{marketStatusCopy.detail}</p>
        </div>
        <p className="shrink-0 font-mono text-sm font-bold text-white">
          {usdFormatter.format(effectiveCryptoPrice)}
        </p>
      </div>

      {/* Slider */}
      <div className="mt-6">
        <Slider
          min={1}
          max={totalTokens}
          step={1}
          value={[tokens]}
          onValueChange={(value) => setTokens(value[0])}
        />
      </div>

      {/* Stats grid */}
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-500">
            Tokens
          </p>
          <p className="mt-1 text-base font-bold text-white">{tokens}</p>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-500">
            USD Value
          </p>
          <p className="mt-1 text-base font-bold text-white">{usdFormatter.format(usdValue)}</p>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-500">
            {cryptoSymbol} Equivalent
          </p>
          <p className="mt-1 text-base font-bold text-white">
            {cryptoValue.toFixed(4)} {cryptoSymbol}
          </p>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-500">
            Ownership Percentage
          </p>
          <p className="mt-1 text-base font-bold text-emerald-300">
            {ownershipPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Ownership progress */}
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-soft transition-all duration-300 ease-in-out"
          style={{ width: `${ownershipPercentage}%` }}
        />
      </div>
    </div>
  )
}
