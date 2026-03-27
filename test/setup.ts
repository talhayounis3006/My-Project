/// <reference types="vitest" />
import '@testing-library/jest-dom'

// Provide vi in node environment typings
declare const vi: any

// Mock next/image to a simple img for tests
// ensure vi is available when running under vitest
const _vi = typeof vi !== 'undefined' ? vi : require('vitest').vi
_vi.mock('next/image', () => ({
  default: (props: any) => {
    const { priority, ...rest } = props || {}
    return require('react').createElement('img', rest)
  },
}))

// Mock next/link to render children directly
_vi.mock('next/link', () => ({
  default: ({ children }: any) => children,
}))

// Mock next/navigation useRouter
const mockPush = _vi.fn()
_vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Provide a helper to access the mock in tests
export { mockPush }
