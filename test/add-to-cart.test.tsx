/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import AddToCartButton from '@/components/add-to-cart'
import { mockPush } from './setup'

describe('AddToCartButton', () => {
  beforeEach(() => {
    mockPush.mockClear()
    ;(globalThis as any).alert = vi.fn()
  })

  it('redirects to login when not signed in', async () => {
    ;(globalThis as any).fetch = vi.fn(async () => ({ ok: false }))
    render(<AddToCartButton productId={1} />)
    const button = screen.getByRole('button', { name: /add to cart/i })
    await userEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/login?next=/menu')
  })

  it('routes to contact when signed in', async () => {
    ;(globalThis as any).fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true })
    render(<AddToCartButton productId={1} />)
    const button = screen.getByRole('button', { name: /add to cart/i })
    await userEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/contact')
  })
})
