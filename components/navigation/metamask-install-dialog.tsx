import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type MetaMaskInstallDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MetaMaskInstallDialog({ open, onOpenChange }: MetaMaskInstallDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-gray-950 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>MetaMask is not installed</DialogTitle>
          <DialogDescription className="text-gray-300">
            Install MetaMask to connect your wallet and continue with blockchain-based investment
            features. After installing MetaMask, refresh this page and try again.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:justify-start sm:space-x-0">
          <Button asChild className="bg-brand text-white hover:bg-brand-hover">
            <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
              Install MetaMask
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
