import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Star, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuItemCard } from "@/components/menu-item-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { caterers, menuItems } from "@/lib/data"

interface MenuPageProps {
  params: Promise<{ id: string }>
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { id } = await params
  const caterer = caterers.find((c) => c.id === id)

  if (!caterer) {
    notFound()
  }

  const catererMenuItems = menuItems.filter((item) => item.catererId === id)
  const categories = [...new Set(catererMenuItems.map((item) => item.category))]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80">
          <Image
            src={caterer.image}
            alt={caterer.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <div className="container mx-auto">
              <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
                <Link href="/caterers" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to caterers
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                {caterer.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium text-foreground">{caterer.rating}</span>
                  <span className="text-muted-foreground">
                    ({caterer.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{caterer.location}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {caterer.minGuests} - {caterer.maxGuests} guests
                  </span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {caterer.cuisine.map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Menu Items */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Menu</h2>
                <div className="text-sm text-muted-foreground">
                  Starting at{" "}
                  <span className="font-medium text-primary">
                    ₹{caterer.pricePerPlate}/plate
                  </span>
                </div>
              </div>

              <Tabs defaultValue={categories[0] || "all"} className="w-full">
                <TabsList className="mb-6 h-auto flex-wrap justify-start gap-2">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="rounded-full px-4"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    {catererMenuItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Cart Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <CartSidebar />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
