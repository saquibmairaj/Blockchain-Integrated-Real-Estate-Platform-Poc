'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { EthereumProvider, WalletContextValue, WalletStatus } from '@/types/wallet'

const WalletContext = createContext<WalletContextValue | null>(null)

type EthereumWindow = Window & {
  ethereum?: EthereumProvider
}

type WalletProviderProps = {
  children: React.ReactNode
}

function getEthereumProvider() {
  if (typeof window === 'undefined') {
    return undefined
  }

  return (window as EthereumWindow).ethereum
}

function getWalletErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 4001) {
    return 'Connection request was rejected.'
  }

  return 'Unable to connect wallet.'
}

function getFirstAccount(accounts: unknown) {
  if (!Array.isArray(accounts)) {
    return null
  }

  const [firstAccount] = accounts

  if (typeof firstAccount !== 'string' || firstAccount.length === 0) {
    return null
  }

  return firstAccount
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [address, setAddress] = useState<string | null>(null)
  const [status, setStatus] = useState<WalletStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const connectWallet = useCallback(async () => {
    const ethereum = getEthereumProvider()

    if (!ethereum) {
      setStatus('error')
      setError('MetaMask is not installed.')
      return
    }

    setStatus('connecting')
    setError(null)

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const account = getFirstAccount(accounts)

      if (!account) {
        setAddress(null)
        setStatus('error')
        setError('No wallet account was returned.')
        return
      }

      setAddress(account)
      setStatus('connected')
    } catch (requestError) {
      setAddress(null)
      setStatus('error')
      setError(getWalletErrorMessage(requestError))
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setAddress(null)
    setStatus('idle')
    setError(null)
  }, [])

  const clearWalletError = useCallback(() => {
    setError(null)

    if (!address) {
      setStatus('idle')
    }
  }, [address])

  const value = useMemo(
    () => ({ address, status, error, connectWallet, disconnectWallet, clearWalletError }),
    [address, clearWalletError, connectWallet, disconnectWallet, error, status],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)

  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }

  return context
}
