import { act, render, screen, waitFor } from '@testing-library/react'

import { FractionalOwnershipSlider } from '@/components/properties/fractional-ownership-slider'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock

const renderCalculator = () =>
  render(
    <FractionalOwnershipSlider
      tokenPrice={100}
      totalTokens={1000}
      cryptoSymbol="ETH"
      cryptoPrice={2000}
    />,
  )

describe('FractionalOwnershipSlider', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('uses the live ETH price when the market request succeeds', async () => {
    jest.useFakeTimers()
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ethereum: { usd: 2500 } }),
    } as Response)

    renderCalculator()

    expect(screen.getByText('Loading live ETH price...')).toBeInTheDocument()

    await screen.findByText('Live ETH price')

    expect(screen.getByText('$2,500')).toBeInTheDocument()
    expect(screen.getByText('0.0400 ETH')).toBeInTheDocument()
    expect(screen.getByText('Updates in 60s')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Updates in 59s')).toBeInTheDocument()
  })

  it('keeps the fallback ETH price visible when the market request fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network failed'))

    renderCalculator()

    await screen.findByText('Using fallback ETH price')

    expect(screen.getByText('$2,000')).toBeInTheDocument()
    expect(screen.getByText('0.0500 ETH')).toBeInTheDocument()
  })

  it('polls the market endpoint when the refresh interval elapses', async () => {
    jest.useFakeTimers()
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ethereum: { usd: 2500 } }),
    } as Response)

    renderCalculator()

    await screen.findByText('Live ETH price')

    await act(async () => {
      jest.advanceTimersByTime(60_000)
    })

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })
})
