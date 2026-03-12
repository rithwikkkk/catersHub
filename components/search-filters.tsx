"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cuisineTypes, occasionTypes } from "@/lib/data"

interface SearchFiltersProps {
  variant?: "hero" | "sidebar"
}

export function SearchFilters({ variant = "hero" }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [budget, setBudget] = useState(searchParams.get("budget") || "")
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "")
  const [occasion, setOccasion] = useState(searchParams.get("occasion") || "")
  const [guests, setGuests] = useState(searchParams.get("guests") || "")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (budget) params.set("budget", budget)
    if (cuisine) params.set("cuisine", cuisine)
    if (occasion) params.set("occasion", occasion)
    if (guests) params.set("guests", guests)
    router.push(`/caterers?${params.toString()}`)
  }

  const clearFilters = () => {
    setBudget("")
    setCuisine("")
    setOccasion("")
    setGuests("")
    router.push("/caterers")
  }

  if (variant === "sidebar") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget-sidebar">Budget per plate</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger id="budget-sidebar">
                <SelectValue placeholder="Any budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-30">Under $30</SelectItem>
                <SelectItem value="30-50">$30 - $50</SelectItem>
                <SelectItem value="50-75">$50 - $75</SelectItem>
                <SelectItem value="75+">$75+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine-sidebar">Cuisine type</Label>
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger id="cuisine-sidebar">
                <SelectValue placeholder="All cuisines" />
              </SelectTrigger>
              <SelectContent>
                {cuisineTypes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occasion-sidebar">Occasion</Label>
            <Select value={occasion} onValueChange={setOccasion}>
              <SelectTrigger id="occasion-sidebar">
                <SelectValue placeholder="All occasions" />
              </SelectTrigger>
              <SelectContent>
                {occasionTypes.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests-sidebar">Number of guests</Label>
            <Input
              id="guests-sidebar"
              type="number"
              placeholder="Enter guest count"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min={1}
            />
          </div>

          <Button className="w-full" onClick={handleSearch}>
            Apply Filters
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Filters */}
      <div className="hidden rounded-xl border bg-card p-4 shadow-lg md:block">
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget per plate</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger id="budget">
                <SelectValue placeholder="Any budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-30">Under $30</SelectItem>
                <SelectItem value="30-50">$30 - $50</SelectItem>
                <SelectItem value="50-75">$50 - $75</SelectItem>
                <SelectItem value="75+">$75+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine">Cuisine type</Label>
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger id="cuisine">
                <SelectValue placeholder="All cuisines" />
              </SelectTrigger>
              <SelectContent>
                {cuisineTypes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Select value={occasion} onValueChange={setOccasion}>
              <SelectTrigger id="occasion">
                <SelectValue placeholder="All occasions" />
              </SelectTrigger>
              <SelectContent>
                {occasionTypes.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Number of guests</Label>
            <Input
              id="guests"
              type="number"
              placeholder="Guest count"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min={1}
            />
          </div>

          <div className="flex items-end">
            <Button className="w-full gap-2" onClick={handleSearch}>
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Search Filters</SheetTitle>
              <SheetDescription>
                Find the perfect caterer for your event
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget-mobile">Budget per plate</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger id="budget-mobile">
                    <SelectValue placeholder="Any budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-30">Under $30</SelectItem>
                    <SelectItem value="30-50">$30 - $50</SelectItem>
                    <SelectItem value="50-75">$50 - $75</SelectItem>
                    <SelectItem value="75+">$75+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisine-mobile">Cuisine type</Label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger id="cuisine-mobile">
                    <SelectValue placeholder="All cuisines" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineTypes.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion-mobile">Occasion</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion-mobile">
                    <SelectValue placeholder="All occasions" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasionTypes.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests-mobile">Number of guests</Label>
                <Input
                  id="guests-mobile"
                  type="number"
                  placeholder="Enter guest count"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min={1}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={clearFilters}>
                  Clear
                </Button>
                <Button className="flex-1 gap-2" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
