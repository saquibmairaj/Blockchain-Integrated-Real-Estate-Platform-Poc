import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider, useToast } from '@/providers/toast-provider'

function ToastHarness() {
  const { showToast } = useToast()

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          showToast({
            title: 'Saved successfully',
            description: 'The change was stored.',
          })
        }
      >
        Show default toast
      </button>
      <button
        type="button"
        onClick={() =>
          showToast({
            title: 'Wallet connection cancelled',
            description: 'No wallet was connected.',
            severity: 'error',
            role: 'alert',
          })
        }
      >
        Show error toast
      </button>
    </div>
  )
}

function renderToastHarness() {
  return render(
    <ToastProvider>
      <ToastHarness />
    </ToastProvider>,
  )
}

describe('ToastProvider', () => {
  it('defaults to a status toast when no role or severity is provided', async () => {
    const user = userEvent.setup()

    renderToastHarness()
    await user.click(screen.getByRole('button', { name: /show default toast/i }))

    const notifications = await screen.findByRole('region', { name: /notifications/i })
    const toast = within(notifications).getByRole('status')

    expect(toast).toHaveAttribute('data-severity', 'info')
    expect(within(toast).getByText('Saved successfully')).toBeInTheDocument()
    expect(within(toast).getByText('The change was stored.')).toBeInTheDocument()
  })

  it('allows showToast to render an error toast as an alert', async () => {
    const user = userEvent.setup()

    renderToastHarness()
    await user.click(screen.getByRole('button', { name: /show error toast/i }))

    const notifications = await screen.findByRole('region', { name: /notifications/i })
    const toast = within(notifications).getByRole('alert')

    expect(toast).toHaveAttribute('data-severity', 'error')
    expect(toast).toHaveClass('border-l-8', 'border-red-500', 'bg-red-900/95')
    expect(within(toast).getByText('Wallet connection cancelled')).toHaveClass('text-red-100')
    expect(within(toast).getByText('No wallet was connected.')).toHaveClass('text-red-200/90')
    expect(within(notifications).queryByRole('status')).not.toBeInTheDocument()
  })
})
