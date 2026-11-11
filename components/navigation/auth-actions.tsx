import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/components/ui/utils'
import { useAuth } from '@/providers/auth-provider'
import { UserMenu } from '@/components/navigation/user-menu'
import { WalletAction } from '@/components/navigation/wallet-action'

type AuthActionsProps = {
  onSignIn: () => void
  onSignedOut?: () => void
  variant?: 'desktop' | 'mobile'
}

export function AuthActions({ onSignIn, onSignedOut, variant = 'desktop' }: AuthActionsProps) {
  const { isAuthenticated, signOut, user } = useAuth()
  const isMobile = variant === 'mobile'

  function handleSignOut() {
    signOut()
    onSignedOut?.()
  }

  if (!isAuthenticated || !user) {
    return (
      <Button
        type="button"
        className={cn(
          'h-9 gap-1.5 rounded-full bg-brand px-4 text-[13px] font-semibold text-white transition-colors hover:bg-brand-hover',
          isMobile && 'mt-3 h-10 w-full justify-center',
        )}
        onClick={onSignIn}
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
        Sign In
      </Button>
    )
  }

  return (
    <div className={cn('flex items-center gap-2', isMobile && 'flex-col items-stretch gap-3 pt-3')}>
      <WalletAction className={cn(isMobile && 'h-10 w-full')} />
      <UserMenu user={user} onSignOut={handleSignOut} />
    </div>
  )
}
