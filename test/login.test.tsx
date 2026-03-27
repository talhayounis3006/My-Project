/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/app/login/page'

describe('LoginPage', () => {
  beforeEach(() => {
    ;(globalThis as any).fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({ ok: true }),
    }))
  })

  it('calls API login and navigates home', async () => {
    render(<LoginPage />)
    const email = screen.getByPlaceholderText(/name@example.com/i)
    const password = screen.getByPlaceholderText(/•{4,}/i) || screen.getByPlaceholderText(/••••••••/) // handle placeholder
    await userEvent.type(email, 'test@example.com')
    await userEvent.type(password, 'password')

    const button = screen.getByRole('button', { name: /sign in/i })

    // Prevent actual navigation
    const originalLocation = window.location.href
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: originalLocation },
    })

    await userEvent.click(button)

    expect((globalThis as any).fetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({ method: 'POST' })
    )
    expect(window.location.href).toBe('/')
  })
})
