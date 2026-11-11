import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '@/components/navigation/navbar'
import { AuthProvider } from '@/providers/auth-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { WalletProvider } from '@/providers/wallet-provider'

type EthereumMock = {
  request: jest.Mock<Promise<unknown>, [{ method: string }]>
}

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

function setEthereum(ethereum?: EthereumMock) {
  Object.defineProperty(window, 'ethereum', {
    configurable: true,
    value: ethereum,
  })
}

function renderNavbar() {
  return render(
    <ToastProvider>
      <AuthProvider>
        <WalletProvider>
          <Navbar />
        </WalletProvider>
      </AuthProvider>
    </ToastProvider>,
  )
}

async function signIn(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /sign in/i }))

  const dialog = screen.getByRole('dialog', { name: /sign in/i })
  await user.type(within(dialog).getByLabelText(/email/i), 'investor@example.com')
  await user.type(within(dialog).getByLabelText(/password/i), 'password123')
  await user.click(within(dialog).getByRole('button', { name: /^sign in$/i }))
}

afterEach(() => {
  Reflect.deleteProperty(window, 'ethereum')
})

describe('Navbar authentication', () => {
  it('opens and closes the mobile navigation menu with an accessible trigger', async () => {
    const user = userEvent.setup()

    renderNavbar()

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }))

    expect(screen.getByRole('button', { name: /close navigation menu/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /properties/i })).toHaveLength(2)

    await user.click(screen.getByRole('button', { name: /close navigation menu/i }))

    expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument()
  })

  it('shows validation errors when sign in fields are invalid', async () => {
    const user = userEvent.setup()

    renderNavbar()

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    const dialog = screen.getByRole('dialog', { name: /sign in/i })
    await user.click(within(dialog).getByRole('button', { name: /^sign in$/i }))

    expect(await within(dialog).findByText('Enter a valid email address.')).toBeInTheDocument()
    expect(within(dialog).getByText('Password must be at least 6 characters.')).toBeInTheDocument()
    expect(screen.queryByText('investor@example.com')).not.toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: /sign in/i })).toBeInTheDocument()
  })

  it('lets an investor sign in with email and sign out from the navbar', async () => {
    const user = userEvent.setup()

    renderNavbar()
    await signIn(user)

    expect(screen.queryByRole('dialog', { name: /sign in/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument()
    const userMenuButton = screen.getByRole('button', { name: /demo investor account menu/i })
    expect(userMenuButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByLabelText('Demo Investor profile')).toBeInTheDocument()
    expect(screen.queryByText('investor@example.com')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^sign in$/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('menuitem', { name: /sign out/i })).not.toBeInTheDocument()

    await user.click(userMenuButton)

    expect(userMenuButton).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByRole('menuitem', { name: /sign out/i }))

    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument()
    expect(screen.queryByText('Demo Investor')).not.toBeInTheDocument()
  })

  it('connects a wallet and lets the investor disconnect it from the account menu', async () => {
    const user = userEvent.setup()
    const request = jest
      .fn<Promise<unknown>, [{ method: string }]>()
      .mockResolvedValue(['0x1234567890abcdef1234567890abcdef12345678'])
    setEthereum({ request })

    renderNavbar()
    await signIn(user)
    await user.click(screen.getByRole('button', { name: /connect wallet/i }))

    expect(request).toHaveBeenCalledWith({ method: 'eth_requestAccounts' })
    expect(
      await screen.findByRole('button', { name: /wallet connected: 0x1234...5678/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /demo investor account menu/i }))

    const accountMenu = screen.getByRole('menu')
    expect(within(accountMenu).getByText('Connected wallet')).toBeInTheDocument()
    expect(within(accountMenu).getByText('0x1234...5678')).toBeInTheDocument()
    await user.click(within(accountMenu).getByRole('menuitem', { name: /disconnect wallet/i }))

    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument()
    expect(screen.queryByText('Connected wallet')).not.toBeInTheDocument()
  })

  it('opens a MetaMask install modal when wallet is unavailable', async () => {
    const user = userEvent.setup()

    renderNavbar()
    await signIn(user)
    await user.click(screen.getByRole('button', { name: /connect wallet/i }))

    const dialog = await screen.findByRole('dialog', { name: /metamask is not installed/i })
    expect(
      within(dialog).getByText(/after installing metamask, refresh this page and try again/i),
    ).toBeInTheDocument()
    expect(within(dialog).getByRole('link', { name: /install metamask/i })).toHaveAttribute(
      'href',
      'https://metamask.io/download/',
    )
  })
})
