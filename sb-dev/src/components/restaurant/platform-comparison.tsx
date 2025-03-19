"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  BarChart3,
  ExternalLink,
  Clock,
  Zap,
  CheckCircle,
  CreditCard
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PlatformData {
  name: string
  logo: string
  itemPrice: number
  serviceFee: number
  deliveryFee: number
  tax: number
  total: number
  eta: number
  promoCode?: string
  promoDiscount?: number
  paymentDiscount?: number
  paymentMethod?: string
}

interface PlatformComparisonProps {
  platforms: PlatformData[]
  onSelectPlatform: (platform: string) => void
}

export function PlatformComparison({ platforms, onSelectPlatform }: PlatformComparisonProps) {
  // Sort platforms by total price, lowest first
  const sortedPlatforms = React.useMemo(() => {
    return [...platforms].sort((a, b) => a.total - b.total)
  }, [platforms])

  // Calculate savings from best option to worst
  const savings = React.useMemo(() => {
    if (sortedPlatforms.length < 2) return 0
    return sortedPlatforms[sortedPlatforms.length - 1].total - sortedPlatforms[0].total
  }, [sortedPlatforms])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Platform Comparison</h2>
          <p className="text-muted-foreground">Compare prices across {platforms.length} food delivery platforms</p>
        </div>
        <div className="flex items-center rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
          <BarChart3 className="mr-2 h-4 w-4" />
          <span className="text-sm font-medium">Potential savings: ${savings.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPlatforms.map((platform, index) => (
          <Card
            key={platform.name}
            className={
              index === 0
                ? "border-green-500 dark:border-green-700 ring-1 ring-green-500 dark:ring-green-700"
                : ""
            }
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative h-8 w-8 mr-2">
                    <Image
                      src={platform.logo}
                      alt={platform.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold">{platform.name}</h3>
                </div>
                {index === 0 && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400">
                    Best Deal
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item price:</span>
                  <span>${platform.itemPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee:</span>
                  <span>${platform.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery fee:</span>
                  <span>${platform.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax:</span>
                  <span>${platform.tax.toFixed(2)}</span>
                </div>

                {platform.promoDiscount && platform.promoCode && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span className="flex items-center">
                      <Zap className="mr-1 h-3 w-3" />
                      Promo code:
                    </span>
                    <span>-${platform.promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                {platform.paymentDiscount && platform.paymentMethod && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span className="flex items-center">
                      <CreditCard className="mr-1 h-3 w-3" />
                      {platform.paymentMethod}:
                    </span>
                    <span>-${platform.paymentDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold">${platform.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Estimated delivery: {platform.eta} min</span>
                </div>
              </div>

              {platform.promoCode && (
                <div className="mt-4 p-2 bg-muted rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <div>
                      <p className="text-xs font-medium">Promo code: <span className="font-mono bg-background px-1 py-0.5 rounded">{platform.promoCode}</span></p>
                      <p className="text-xs text-muted-foreground">Automatically applied at checkout</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full mt-4"
                onClick={() => onSelectPlatform(platform.name)}
              >
                Order on {platform.name}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
