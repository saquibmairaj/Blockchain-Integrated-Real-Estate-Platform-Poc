import { useEffect } from 'react'
import { Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/components/ui/utils'
import { formatAddress } from '@/lib/wallet/format-address'
import { useWallet } from '@/providers/wallet-provider'
import { useToast } from '@/providers/toast-provider'
import { MetaMaskInstallDialog } from '@/components/navigation/metamask-install-dialog'

const METAMASK_NOT_INSTALLED_ERROR = 'MetaMask is not installed.'
const WALLET_REJECTED_ERROR = 'Connection request was rejected.'

type WalletActionProps = {
  className?: string
}

export function WalletAction({ className }: WalletActionProps) {
  const { address, clearWalletError, connectWallet, error, status } = useWallet()
  const { showToast } = useToast()
  const isConnecting = status === 'connecting'
  const formattedAddress = address ? formatAddress(address) : null
  const isMetaMaskMissing = error === METAMASK_NOT_INSTALLED_ERROR
  const isWalletRejected = error === WALLET_REJECTED_ERROR
  const inlineError = error && !isMetaMaskMissing && !isWalletRejected ? error : null

  useEffect(() => {
    if (!isWalletRejected) {
      return
    }

    showToast({
      title: 'Wallet connection cancelled',
      description: 'No wallet was connected.',
      severity: 'error',
      role: 'status',
    })
    clearWalletError()
  }, [clearWalletError, isWalletRejected, showToast])

  return (
    <div className="relative">
      <Button
        type="button"
        disabled={isConnecting}
        aria-label={formattedAddress ? `Wallet connected: ${formattedAddress}` : 'Connect Wallet'}
        className={cn(
          'h-9 gap-1.5 rounded-full bg-brand px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70',
          formattedAddress &&
            'border border-success/40 bg-success/10 font-mono text-[12.5px] text-emerald-200 hover:bg-success/15',
          className,
        )}
        onClick={() => void connectWallet()}
      >
        {formattedAddress ? (
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
        ) : (
          <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {isConnecting ? 'Connecting…' : formattedAddress || 'Connect Wallet'}
      </Button>

      {inlineError ? (
        <p role="alert" className="absolute right-0 top-10 w-52 text-right text-xs text-red-300">
          {inlineError}
        </p>
      ) : null}

      <MetaMaskInstallDialog
        open={isMetaMaskMissing}
        onOpenChange={(open) => {
          if (!open) {
            clearWalletError()
          }
        }}
      />
    </div>
  )
}
