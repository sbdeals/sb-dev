"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Shell } from '@/components/layout/shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  Tag,
  ArrowRight,
  Gift,
  Zap,
  Star,
  ExternalLink,
  TrendingUp
} from 'lucide-react'
import { mockRestaurants, mockPromoCodes } from '@/lib/mock-data'

export default function DealsPage() {
  // Combine restaurant data with deals for UI display
  const featuredDeals = [
    {
      id: 'deal1',
      restaurantId: 'r1',
      title: '25% Off Your First Order',
      description: 'Enjoy 25% off your first order at Burger Kingdom on UberEats',
      code: 'WELCOME25',
      platform: 'UberEats',
      expiry: 'March 31, 2025',
      savings: '15.00',
      restaurant: mockRestaurants[0],
      isHot: true
    },
    {
      id: 'deal2',
      restaurantId: 'r2',
      title: 'Free Delivery',
      description: 'Free delivery on any order over $15 at Pizza Paradise',
      code: 'FREEDEL',
      platform: 'DoorDash',
      expiry: 'March 25, 2025',
      savings: '5.99',
      restaurant: mockRestaurants[1],
      isHot: false
    },
    {
      id: 'deal3',
      restaurantId: 'r3',
      title: '$10 Off Premium Sushi',
      description: 'Save $10 on any premium sushi platter at Sushi Supreme',
      code: 'SUSHI10',
      platform: 'GrubHub',
      expiry: 'April 5, 2025',
      savings: '10.00',
      restaurant: mockRestaurants[2],
      isHot: true
    },
    {
      id: 'deal4',
      restaurantId: 'r4',
      title: 'BOGO Tacos',
      description: 'Buy one get one free on all tacos at Taco Fiesta',
      code: 'BOGOTACO',
      platform: 'UberEats',
      expiry: 'March 28, 2025',
      savings: '8.99',
      restaurant: mockRestaurants[3],
      isHot: false
    }
  ]

  const exclusiveDeals = featuredDeals.slice(0, 2)
  const trendingDeals = featuredDeals.slice(2, 4)

  return (
    <Shell>
      <div className="container py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exclusive Deals</h1>
          <p className="text-muted-foreground">
            Hand-picked promotions to save you money on food delivery
          </p>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 overflow-hidden">
          <div className="grid md:grid-cols-2 p-6 md:p-8 gap-8">
            <div className="space-y-4 text-white">
              <div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm">
                Limited Time
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Save on Every Order</h2>
              <p className="text-white/80 md:text-lg max-w-md">
                SwiftBurst automatically finds and applies the best deals across all major food delivery platforms, so you never overpay.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Badge className="bg-white text-emerald-700 hover:bg-white/90">UberEats</Badge>
                <Badge className="bg-white text-emerald-700 hover:bg-white/90">DoorDash</Badge>
                <Badge className="bg-white text-emerald-700 hover:bg-white/90">GrubHub</Badge>
                <Badge className="bg-white text-emerald-700 hover:bg-white/90">+More</Badge>
              </div>
              <Button className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/restaurants">
                  Find Deals Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative h-64 w-64">
                <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-8 bg-white rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift className="h-24 w-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Exclusive Offers</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {exclusiveDeals.map(deal => (
              <Card key={deal.id} className="overflow-hidden border-2 border-primary">
                <div className="relative">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={deal.restaurant.image}
                      alt={deal.restaurant.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Zap className="mr-1 h-3 w-3" />
                      Exclusive
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white">
                      {deal.platform}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{deal.title}</CardTitle>
                    {deal.isHot && (
                      <Badge variant="destructive">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Hot Deal
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{deal.restaurant.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">{deal.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-mono bg-muted p-1 rounded">
                      {deal.code}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      Expires {deal.expiry}
                    </div>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold mt-1">
                    <Tag className="mr-1 h-4 w-4" />
                    Save up to ${deal.savings}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/restaurants/${deal.restaurantId}/compare`}>
                      View Details
                    </Link>
                  </Button>
                  <Button asChild>
                    <a href="#" className="flex items-center">
                      Redeem Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Trending Deals</h2>
            <Button variant="link" asChild size="sm">
              <Link href="/deals/all">
                See All Deals
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingDeals.map(deal => (
              <Card key={deal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{deal.title}</CardTitle>
                    <Badge variant="outline">{deal.platform}</Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <div className="flex items-center">
                      {deal.restaurant.name}
                      <div className="ml-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 text-xs">{deal.restaurant.rating}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="font-mono text-sm bg-muted p-1 rounded text-center">
                    {deal.code}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Expires {deal.expiry}
                    </div>
                    <div className="flex items-center text-green-600 font-medium">
                      <Tag className="mr-1 h-3 w-3" />
                      Save ${deal.savings}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="sm" asChild>
                    <Link href={`/restaurants/${deal.restaurantId}/compare`}>
                      View Deal
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Get Personalized Deals</h2>
              <p className="text-muted-foreground">
                Sign up to receive deals tailored to your food preferences and favorite restaurants.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild>
                  <Link href="/auth/signup">
                    Create Account
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/signin">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted h-32"></div>
                <div className="rounded-lg bg-muted h-32 translate-y-4"></div>
                <div className="rounded-lg bg-muted h-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
