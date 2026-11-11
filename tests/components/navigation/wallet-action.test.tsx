import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WalletAction } from '@/components/navigation/wallet-action'
import { ToastProvider } from '@/providers/toast-provider'
import { WalletProvider } from '@/providers/wallet-provider'

type EthereumMock = {
  request: jest.Mock<Promise<unknown>, [{ method: string }]>
}

function setEthereum(ethereum?: EthereumMock) {
  Object.defineProperty(window, 'ethereum', {
    configurable: true,
    value: ethereum,
  })
}

function renderWalletAction() {
  return render(
    <ToastProvider>
      <WalletProvider>
        <WalletAction />
      </WalletProvider>
    </ToastProvider>,
  )
}

afterEach(() => {
  Reflect.deleteProperty(window, 'ethereum')
})

describe('WalletAction', () => {
  it('connects to MetaMask and shows the connected address', async () => {
    const user = userEvent.setup()
    const request = jest
      .fn<Promise<unknown>, [{ method: string }]>()
      .mockResolvedValue(['0x1234567890abcdef1234567890abcdef12345678'])
    setEthereum({ request })

    renderWalletAction()

    await user.click(screen.getByRole('button', { name: /connect wallet/i }))

    expect(request).toHaveBeenCalledWith({ method: 'eth_requestAccounts' })
    expect(
      await screen.findByRole('button', { name: /wallet connected: 0x1234...5678/i }),
    ).toBeInTheDocument()
  })

  it('opens an install modal when MetaMask is not installed', async () => {
    const user = userEvent.setup()

    renderWalletAction()
    await user.click(screen.getByRole('button', { name: /connect wallet/i }))

    const dialog = await screen.findByRole('dialog', { name: /metamask is not installed/i })
    expect(
      within(dialog).getByText(/after installing metamask, refresh this page and try again/i),
    ).toBeInTheDocument()

    const installLink = within(dialog).getByRole('link', { name: /install metamask/i })
    expect(installLink).toHaveAttribute('href', 'https://metamask.io/download/')
    expect(installLink).toHaveAttribute('target', '_blank')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows a toast when the user rejects the connection request', async () => {
    const user = userEvent.setup()
    const request = jest
      .fn<Promise<unknown>, [{ method: string }]>()
      .mockRejectedValue({ code: 4001 })
    setEthereum({ request })

    renderWalletAction()
    await user.click(screen.getByRole('button', { name: /connect wallet/i }))

    const notifications = await screen.findByRole('region', { name: /notifications/i })
    const toast = within(notifications).getByRole('status')

    expect(toast).toHaveAttribute('data-severity', 'error')
    expect(within(toast).getByText('Wallet connection cancelled')).toBeInTheDocument()
    expect(within(toast).getByText('No wallet was connected.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
