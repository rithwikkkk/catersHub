import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Star, Users, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CatererCard } from "@/components/caterer-card"
import { SearchFilters } from "@/components/search-filters"
import { caterers } from "@/lib/data"

export default function HomePage() {
  const featuredCaterers = caterers.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background px-4 py-20 md:py-32">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Find the Perfect Caterer for Your Event
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
                Browse top-rated caterers, explore diverse cuisines, and book with ease.
                From intimate gatherings to grand celebrations, we have got you covered.
              </p>
              <div className="mt-10">
                <Suspense fallback={<div className="h-24 animate-pulse rounded-xl bg-muted" />}>
                  <SearchFilters />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </section>

        {/* Stats Section */}
        <section className="border-y bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">500+</p>
                <p className="mt-1 text-sm text-muted-foreground">Professional Caterers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">10k+</p>
                <p className="mt-1 text-sm text-muted-foreground">Events Catered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">4.8</p>
                <p className="mt-1 text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">50+</p>
                <p className="mt-1 text-sm text-muted-foreground">Cuisine Types</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Caterers Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Featured Caterers</h2>
                <p className="mt-2 text-muted-foreground">
                  Top-rated caterers trusted by thousands
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden gap-2 md:flex">
                <Link href="/caterers">
                  View all caterers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCaterers.map((caterer) => (
                <CatererCard key={caterer.id} caterer={caterer} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" asChild className="gap-2">
                <Link href="/caterers">
                  View all caterers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-secondary/50 px-4 py-20">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground">Why Choose catersHub</h2>
              <p className="mt-2 text-muted-foreground">
                We make catering simple, reliable, and delicious
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Verified Reviews</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Real reviews from verified customers to help you choose
                </p>
              </div>

              <div className="rounded-xl bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Any Event Size</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  From 20 to 500+ guests, find caterers for any occasion
                </p>
              </div>

              <div className="rounded-xl bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Quick Booking</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Book your caterer in minutes with our easy process
                </p>
              </div>

              <div className="rounded-xl bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Secure Payments</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Safe and secure payment processing for peace of mind
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center md:px-12 md:py-20">
              <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to Find Your Perfect Caterer?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                Join thousands of happy customers who found their ideal catering partner through catersHub.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/caterers">Browse Caterers</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
