"use client"

import React, { useState } from 'react'
import { Shell } from '@/components/layout/shell'
import { Button } from '@/components/ui/button'
import { PlatformComparison } from '@/components/restaurant/platform-comparison'
import { PaymentOptimizer } from '@/components/payment/payment-optimizer'
import { PromoFinder } from '@/components/discount/promo-finder'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

interface RestaurantCompareClientProps {
  restaurant: any
  platformComparison: any
  paymentMethods: any
  promoCodes: any
}

export default function RestaurantCompareClient({
  restaurant,
  platformComparison,
  paymentMethods,
  promoCodes
}: RestaurantCompareClientProps) {
  // Selected platform for showing promo codes and payment options
  const [selectedPlatform, setSelectedPlatform] = useState('UberEats')
  const [orderTotal, setOrderTotal] = useState<number>(platformComparison.platforms[0].total)

  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform)

    // Update order total based on selected platform
    const platformData = platformComparison.platforms.find((p: any) => p.name === platform)
    if (platformData) {
      setOrderTotal(platformData.total)
    }

    toast.success(`Selected ${platform} as your delivery platform`)
  }

  const handleSelectPayment = (paymentId: string) => {
    const paymentMethod = paymentMethods.find((p: any) => p.id === paymentId)

    if (paymentMethod) {
      toast.success(`Selected ${paymentMethod.name} as your payment method`)
    }
  }

  const handleApplyPromo = (code: string) => {
    toast.success(`Applied promo code: ${code}`)
  }

  const handlePlaceOrder = () => {
    toast.success('Redirecting to checkout...', {
      description: 'You would now be redirected to complete your order.',
      duration: 5000,
    })
  }

  return (
    <Shell>
      <div className="container py-6 space-y-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/restaurants">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Restaurants
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{restaurant.name}</h1>
            <p className="text-muted-foreground">
              Compare prices across {restaurant.platforms.length} food delivery platforms
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/restaurants/${restaurant.id}`}>
                View Menu
              </Link>
            </Button>
            <Button onClick={handlePlaceOrder}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Place Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-full lg:col-span-2 space-y-8">
            <div className="relative w-full overflow-hidden rounded-lg">
              <div className="aspect-[16/9] relative">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <PlatformComparison
              platforms={platformComparison.platforms}
              onSelectPlatform={handleSelectPlatform}
            />
          </div>

          <div className="col-span-full lg:col-span-1 space-y-8">
            <PaymentOptimizer
              paymentMethods={paymentMethods}
              orderTotal={orderTotal}
              onSelectPayment={handleSelectPayment}
              platform={selectedPlatform}
            />

            <PromoFinder
              promoCodes={promoCodes}
              selectedPlatform={selectedPlatform}
              onApplyPromo={handleApplyPromo}
            />
          </div>
        </div>
      </div>
    </Shell>
  )
}
