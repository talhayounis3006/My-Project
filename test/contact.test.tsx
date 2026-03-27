/// <reference types="vitest" />
import { render, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ContactPage from '@/app/contact/page'
import { mockPush } from './setup'

describe('ContactPage', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('redirects to /login when not authenticated', async () => {
    ;(globalThis as any).fetch = vi.fn(async () => ({ ok: false }))
    render(<ContactPage />)
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?next=/contact')
    })
  })

  it('does not redirect when authenticated', async () => {
    ;(globalThis as any).fetch = vi.fn(async () => ({ ok: true }))
    render(<ContactPage />)
    await waitFor(() => {
      expect((globalThis as any).fetch).toHaveBeenCalled()
    })
    expect(mockPush).not.toHaveBeenCalled()
  })
})

