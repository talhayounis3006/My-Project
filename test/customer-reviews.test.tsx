/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import { CustomerReviews } from '@/components/customer-reviews'

describe('CustomerReviews', () => {
  it('renders visible reviews and navigation buttons', () => {
    render(<CustomerReviews />)
    // should find section heading
    expect(screen.getByText(/What Our/i)).toBeInTheDocument()
    // navigation buttons exist
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
})
