import React from 'react'
import { Shell } from '@/components/layout/shell'
import { Button } from '@/components/ui/button'
import {
  mockRestaurants,
  mockPlatformComparison,
  mockPaymentMethods,
  mockPromoCodes
} from '@/lib/mock-data'
import Link from 'next/link'
import RestaurantCompareClient from './client'

export async function generateStaticParams() {
  return mockRestaurants.map(restaurant => ({
    id: restaurant.id,
  }))
}

type Props = {
  params: { id: string }
}

export default function RestaurantComparePage({ params }: Props) {
  const { id } = params

  // Find the restaurant by ID
  const restaurant = mockRestaurants.find(r => r.id === id)

  if (!restaurant) {
    return (
      <Shell>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold">Restaurant not found</h2>
          <p className="text-muted-foreground mt-2">The restaurant you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/restaurants">Back to Restaurants</Link>
          </Button>
        </div>
      </Shell>
    )
  }

  return (
    <RestaurantCompareClient
      restaurant={restaurant}
      platformComparison={mockPlatformComparison}
      paymentMethods={mockPaymentMethods}
      promoCodes={mockPromoCodes}
    />
  )
}
