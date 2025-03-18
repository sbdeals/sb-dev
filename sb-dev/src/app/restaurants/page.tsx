"use client"

import React, { useState } from 'react'
import { Shell } from '@/components/layout/shell'
import { RestaurantSearch } from '@/components/restaurant/restaurant-search'
import { RestaurantCard } from '@/components/restaurant/restaurant-card'
import {
  mockRestaurants,
  mockCuisines,
  mockPlatforms,
  mockFeatures
} from '@/lib/mock-data'

interface FilterOptions {
  priceRange: [number, number]
  cuisines: string[]
  deliveryTime: number
  platforms: string[]
  features: string[]
  sort: 'rating' | 'price' | 'time' | 'distance'
}

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants)

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query) {
      setFilteredRestaurants(mockRestaurants)
      return
    }

    const filtered = mockRestaurants.filter(restaurant => {
      const nameMatch = restaurant.name.toLowerCase().includes(query.toLowerCase())
      const cuisineMatch = restaurant.cuisine.some(c =>
        c.toLowerCase().includes(query.toLowerCase())
      )

      return nameMatch || cuisineMatch
    })

    setFilteredRestaurants(filtered)
  }

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...mockRestaurants]

    // Filter by cuisine
    if (filters.cuisines.length > 0) {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.some(c =>
          filters.cuisines.includes(c.toLowerCase())
        )
      )
    }

    // Filter by platform
    if (filters.platforms.length > 0) {
      filtered = filtered.filter(restaurant =>
        restaurant.platforms.some(p =>
          filters.platforms.includes(p.platform.toLowerCase())
        )
      )
    }

    // Filter by delivery time
    if (filters.deliveryTime < 60) {
      filtered = filtered.filter(restaurant =>
        restaurant.platforms.some(p => p.eta <= filters.deliveryTime)
      )
    }

    // Filter by price range
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) {
      filtered = filtered.filter(restaurant => {
        const bestPrice = Math.min(...restaurant.platforms.map(p => p.total))
        return bestPrice >= filters.priceRange[0] && bestPrice <= filters.priceRange[1]
      })
    }

    // Apply sorting
    if (filters.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (filters.sort === 'price') {
      filtered.sort((a, b) => {
        const aPrice = Math.min(...a.platforms.map(p => p.total))
        const bPrice = Math.min(...b.platforms.map(p => p.total))
        return aPrice - bPrice
      })
    } else if (filters.sort === 'time') {
      filtered.sort((a, b) => {
        const aTime = Math.min(...a.platforms.map(p => p.eta))
        const bTime = Math.min(...b.platforms.map(p => p.eta))
        return aTime - bTime
      })
    } else if (filters.sort === 'distance') {
      filtered.sort((a, b) => {
        const aDistance = parseFloat(a.distance.split(' ')[0])
        const bDistance = parseFloat(b.distance.split(' ')[0])
        return aDistance - bDistance
      })
    }

    setFilteredRestaurants(filtered)
  }

  return (
    <Shell>
      <div className="container py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
          <p className="text-muted-foreground">
            Find and compare prices across multiple food delivery platforms
          </p>
        </div>

        <RestaurantSearch
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          availableCuisines={mockCuisines}
          availablePlatforms={mockPlatforms}
          availableFeatures={mockFeatures}
          totalResults={filteredRestaurants.length}
        />

        {filteredRestaurants.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                platforms={restaurant.platforms}
                distance={restaurant.distance}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6">
              <svg
                className="h-10 w-10 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold">No restaurants found</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </Shell>
  )
}
