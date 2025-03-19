"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Shell } from '@/components/layout/shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart3,
  Clock,
  Heart,
  ArrowRight,
  Utensils,
  Search,
  TrendingUp,
  Repeat,
  Calendar,
  Info
} from 'lucide-react'
import { mockRestaurants } from '@/lib/mock-data'

export default function DashboardPage() {
  const recentOrders = [
    {
      id: 'order1',
      date: 'March 15, 2025',
      restaurant: mockRestaurants[0],
      items: ['Double Cheeseburger', 'Large Fries', 'Milkshake'],
      total: 23.97,
      platform: 'UberEats',
      status: 'Delivered',
      savedAmount: 5.50
    },
    {
      id: 'order2',
      date: 'March 12, 2025',
      restaurant: mockRestaurants[1],
      items: ['Pepperoni Pizza', 'Garlic Bread', 'Soda'],
      total: 28.97,
      platform: 'DoorDash',
      status: 'Delivered',
      savedAmount: 8.25
    },
    {
      id: 'order3',
      date: 'March 9, 2025',
      restaurant: mockRestaurants[2],
      items: ['Sushi Platter', 'Miso Soup', 'Green Tea'],
      total: 45.97,
      platform: 'GrubHub',
      status: 'Delivered',
      savedAmount: 10.00
    }
  ]

  const favoriteRestaurants = mockRestaurants.slice(0, 3)

  const totalSavings = recentOrders.reduce((total, order) => total + order.savedAmount, 0)

  return (
    <Shell>
      <div className="container py-6 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSavings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                From {recentOrders.length} orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Cuisines</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">American</Badge>
                <Badge variant="secondary">Italian</Badge>
                <Badge variant="secondary">Japanese</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32 minutes</div>
              <p className="text-xs text-muted-foreground">
                Across all platforms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Restaurants</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{favoriteRestaurants.length}</div>
              <p className="text-xs text-muted-foreground">
                With best deals tracked
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Your recent food deliveries and savings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={order.restaurant.image}
                        alt={order.restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{order.restaurant.name}</p>
                        <Badge variant="outline">{order.platform}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        <span>{order.date}</span>
                        <span className="mx-2">•</span>
                        <span>${order.total.toFixed(2)}</span>
                        <div className="ml-auto text-green-600 font-medium flex items-center">
                          <BarChart3 className="mr-1 h-3.5 w-3.5" />
                          Saved ${order.savedAmount.toFixed(2)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {order.items.join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/profile/orders">
                  View All Orders
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Saved Restaurants</CardTitle>
              <CardDescription>
                Your favorite places to order from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{restaurant.name}</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm">{restaurant.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{restaurant.cuisine.slice(0, 2).join(', ')}</span>
                        <span className="mx-2">•</span>
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/restaurants">
                  Browse Restaurants
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Deal Finder</CardTitle>
              <CardDescription>
                Find the best deals on food delivery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Search & Compare</h4>
                    <p className="text-sm text-muted-foreground">
                      Find the best prices across multiple delivery platforms
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Track Trends</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor price changes and find the best time to order
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Repeat className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Reorder Made Easy</h4>
                    <p className="text-sm text-muted-foreground">
                      Quickly reorder from your favorite restaurants with the best deals
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/restaurants">
                  Find Deals Now
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Breakdown</CardTitle>
              <CardDescription>
                How you've saved on food delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Promo Codes</p>
                      <p className="text-2xl font-bold">$12.50</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Price Diff</p>
                      <p className="text-2xl font-bold">$8.75</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rewards</p>
                      <p className="text-2xl font-bold">$2.50</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="monthly" className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Promo Codes</p>
                      <p className="text-2xl font-bold">$45.75</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Price Diff</p>
                      <p className="text-2xl font-bold">$32.50</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rewards</p>
                      <p className="text-2xl font-bold">$10.25</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="yearly" className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Promo Codes</p>
                      <p className="text-2xl font-bold">$520.50</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Price Diff</p>
                      <p className="text-2xl font-bold">$375.25</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rewards</p>
                      <p className="text-2xl font-bold">$124.75</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Info className="mr-1 h-4 w-4" />
                Based on your order history
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile/savings">
                  Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Shell>
  )
}
