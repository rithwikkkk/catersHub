import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CatererCard } from "@/components/caterer-card"
import { SearchFilters } from "@/components/search-filters"
import { supabase } from "@/lib/supabase"
interface CaterersPageProps {
  searchParams: Promise<{
    budget?: string
    cuisine?: string
    occasion?: string
    guests?: string
  }>
}

export default async function CaterersPage({ searchParams }: CaterersPageProps) {
  const params = await searchParams
  const { budget, cuisine, guests } = params

 const { data, error } = await supabase.from("caterers").select("*")

console.log("SUPABASE DATA:", data)
console.log("SUPABASE ERROR:", error)

let filteredCaterers = data || []

  if (budget) {
    const [min, max] = budget.split("-").map(Number)
    if (budget === "75+") {
      filteredCaterers = filteredCaterers.filter((c) => c.price_per_head >= 75)
    } else {
      filteredCaterers = filteredCaterers.filter(
        (c) => c.price_per_head >= min && c.price_per_head <= max
      )
    }
  }

 if (cuisine && cuisine !== "all") {
  filteredCaterers = filteredCaterers.filter((c) =>
    c.cuisine_types?.includes(cuisine.toLowerCase())
  )
}

  

  if (guests) {
    const guestCount = parseInt(guests, 10)
    filteredCaterers = filteredCaterers.filter(
      (c) => guestCount >= c.min_guests && guestCount <= c.max_guests
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Browse Caterers</h1>
            <p className="mt-2 text-muted-foreground">
              Find the perfect caterer for your next event
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-24 rounded-xl border bg-card p-6">
                <Suspense fallback={<div className="h-80 animate-pulse rounded-lg bg-muted" />}>
                  <SearchFilters variant="sidebar" />
                </Suspense>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filters */}
              <div className="mb-6 lg:hidden">
                <Suspense fallback={<div className="h-10 animate-pulse rounded-lg bg-muted" />}>
                  <SearchFilters />
                </Suspense>
              </div>

              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredCaterers.length}
                  </span>{" "}
                  {filteredCaterers.length === 1 ? "caterer" : "caterers"}
                </p>
              </div>

              {/* Caterer Grid */}
              {filteredCaterers.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredCaterers.map((caterer) => (
                    <CatererCard key={caterer.id} caterer={caterer} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border bg-card p-12 text-center">
                  <p className="text-lg font-medium text-foreground">
                    No caterers found
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
