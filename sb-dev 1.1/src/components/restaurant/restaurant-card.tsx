"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Clock, DollarSign, Zap } from 'lucide-react'

interface PlatformPrice {
  platform: string
  price: number
  fees: number
  delivery: number
  total: number
  eta: number
  promoAvailable: boolean
}

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  cuisine: string[]
  rating: number
  platforms: PlatformPrice[]
  distance: string
}

export function RestaurantCard({
  id,
  name,
  image,
  cuisine,
  rating,
  platforms,
  distance,
}: RestaurantCardProps) {
  // Find the platform with the lowest total price
  const bestDeal = React.useMemo(() => {
    return platforms.reduce((prev, current) =>
      prev.total < current.total ? prev : current
    )
  }, [platforms])

  // Calculate the potential savings compared to the most expensive option
  const maxPrice = React.useMemo(() => {
    return Math.max(...platforms.map(p => p.total))
  }, [platforms])

  const savings = React.useMemo(() => {
    return (maxPrice - bestDeal.total).toFixed(2)
  }, [maxPrice, bestDeal])

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        {bestDeal.promoAvailable && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary text-primary-foreground">
              <Zap className="mr-1 h-3 w-3" />
              Promo Available
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex flex-wrap gap-1 mt-1">
              {cuisine.map((type) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-sm font-medium">{rating}</span>
              <span className="ml-1 text-yellow-500">★</span>
            </div>
            <span className="text-xs text-muted-foreground">{distance}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Best Deal on {bestDeal.platform}</span>
            <span className="text-xl font-bold">${bestDeal.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Item total: ${bestDeal.price.toFixed(2)}</span>
            <span>Fees: ${(bestDeal.fees + bestDeal.delivery).toFixed(2)}</span>
          </div>
          <div className="flex items-center mt-2">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{bestDeal.eta} min</span>
            <div className="ml-auto flex items-center text-emerald-600 font-medium">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>Save up to ${savings}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/restaurants/${id}/compare`}>
            <span>Compare All ({platforms.length})</span>
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/restaurants/${id}/order?platform=${bestDeal.platform.toLowerCase()}`}>
            <span>Order With Best Deal</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
