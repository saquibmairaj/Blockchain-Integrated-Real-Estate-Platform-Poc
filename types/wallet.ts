export type WalletStatus = 'idle' | 'connecting' | 'connected' | 'error'

export type EthereumRequest = {
  method: string
  params?: unknown[] | Record<string, unknown>
}

export type EthereumProvider = {
  request: (request: EthereumRequest) => Promise<unknown>
}

export type WalletContextValue = {
  address: string | null
  status: WalletStatus
  error: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  clearWalletError: () => void
}
