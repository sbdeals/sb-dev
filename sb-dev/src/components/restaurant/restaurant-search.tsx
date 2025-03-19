"use client"

import React from 'react'
import { Search, X, Filter, MapPin, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'

interface FilterOptions {
  priceRange: [number, number]
  cuisines: string[]
  deliveryTime: number
  platforms: string[]
  features: string[]
  sort: 'rating' | 'price' | 'time' | 'distance'
}

const DEFAULT_FILTERS: FilterOptions = {
  priceRange: [0, 100],
  cuisines: [],
  deliveryTime: 60,
  platforms: [],
  features: [],
  sort: 'rating'
}

interface RestaurantSearchProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: FilterOptions) => void
  availableCuisines: {label: string, value: string}[]
  availablePlatforms: {label: string, value: string}[]
  availableFeatures: {label: string, value: string}[]
  totalResults?: number
}

export function RestaurantSearch({
  onSearch,
  onFilterChange,
  availableCuisines,
  availablePlatforms,
  availableFeatures,
  totalResults,
}: RestaurantSearchProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filters, setFilters] = React.useState<FilterOptions>(DEFAULT_FILTERS)
  const [activeFilters, setActiveFilters] = React.useState<string[]>([])
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false)
  const [location, setLocation] = React.useState('Current Location')

  const form = useForm<FilterOptions>({
    defaultValues: DEFAULT_FILTERS
  })

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    onFilterChange(newFilters)

    // Create list of active filter names for display
    const active: string[] = []

    if (newFilters.cuisines.length > 0) {
      active.push(`Cuisines (${newFilters.cuisines.length})`)
    }

    if (newFilters.platforms.length > 0) {
      active.push(`Platforms (${newFilters.platforms.length})`)
    }

    if (newFilters.features.length > 0) {
      active.push(`Features (${newFilters.features.length})`)
    }

    if (newFilters.deliveryTime < 60) {
      active.push(`Max ${newFilters.deliveryTime} min`)
    }

    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 100) {
      active.push(`$${newFilters.priceRange[0]} - $${newFilters.priceRange[1]}`)
    }

    if (newFilters.sort !== 'rating') {
      active.push(`Sort: ${newFilters.sort.charAt(0).toUpperCase() + newFilters.sort.slice(1)}`)
    }

    setActiveFilters(active)
    setIsFilterDialogOpen(false)
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
    form.reset(DEFAULT_FILTERS)
    setActiveFilters([])
    onFilterChange(DEFAULT_FILTERS)
  }

  const removeFilter = (filter: string) => {
    const newActiveFilters = activeFilters.filter(f => f !== filter)
    setActiveFilters(newActiveFilters)

    // Logic to update the actual filter values
    const newFilters = {...filters}

    if (filter.startsWith('Cuisines')) {
      newFilters.cuisines = []
    } else if (filter.startsWith('Platforms')) {
      newFilters.platforms = []
    } else if (filter.startsWith('Features')) {
      newFilters.features = []
    } else if (filter.startsWith('Max')) {
      newFilters.deliveryTime = 60
    } else if (filter.includes('-')) {
      newFilters.priceRange = [0, 100]
    } else if (filter.startsWith('Sort:')) {
      newFilters.sort = 'rating'
    }

    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSubmit = form.handleSubmit((data) => {
    applyFilters(data)
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for restaurants, cuisines, dishes..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="hidden sm:inline-block">{location}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Location</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setLocation('Current Location')}>
                  Current Location
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('Home')}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('Work')}>
                  Work
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setIsFilterDialogOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <span>{filter}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove filter</span>
                </Button>
              </Badge>
            ))}
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-muted-foreground hover:text-foreground"
                onClick={resetFilters}
              >
                Reset all
              </Button>
            )}
          </div>

          {totalResults !== undefined && (
            <p className="text-sm text-muted-foreground">
              {totalResults} {totalResults === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
      </div>

      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filter Restaurants</DialogTitle>
            <DialogDescription>
              Refine your search with these filter options
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort by</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sort order" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="price">Price (Low to High)</SelectItem>
                        <SelectItem value="time">Delivery Time</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${field.value[0]}</span>
                          <span>${field.value[1]}</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Delivery Time</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={10}
                          max={60}
                          step={5}
                          value={[field.value]}
                          onValueChange={(val) => field.onChange(val[0])}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{field.value} minutes or less</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuisines"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Cuisines</FormLabel>
                      <FormDescription>
                        Select the cuisines you're interested in
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2">
                      {availableCuisines.map((cuisine) => (
                        <FormField
                          key={cuisine.value}
                          control={form.control}
                          name="cuisines"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={cuisine.value}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(cuisine.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, cuisine.value])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== cuisine.value
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {cuisine.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platforms"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Delivery Platforms</FormLabel>
                      <FormDescription>
                        Select preferred delivery platforms
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2">
                      {availablePlatforms.map((platform) => (
                        <FormField
                          key={platform.value}
                          control={form.control}
                          name="platforms"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={platform.value}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(platform.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, platform.value])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== platform.value
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {platform.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button variant="outline" type="button" onClick={resetFilters}>
                  Reset
                </Button>
                <Button type="submit">Apply Filters</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
