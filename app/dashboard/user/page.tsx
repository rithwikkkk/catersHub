import Link from "next/link"
import { ArrowRight, ShoppingBag, UtensilsCrossed, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CatererCard } from "@/components/caterer-card"
import { OrderCard } from "@/components/order-card"
import { caterers, orders } from "@/lib/data"

export default function UserDashboardPage() {
  const userOrders = orders.filter((o) => o.userId === "u1")
  const recentOrders = userOrders.slice(0, 2)
  const featuredCaterers = caterers.slice(0, 3)

  return (
    <DashboardLayout role="user">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="mt-2 text-muted-foreground">
            Discover new caterers and manage your orders
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{userOrders.length}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Favorite Cuisine
              </CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Indian</div>
              <p className="text-xs text-muted-foreground">Most ordered cuisine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reviews Given
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">5</div>
              <p className="text-xs text-muted-foreground">Caterers reviewed</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/dashboard/user/orders">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Browse Caterers */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Discover Caterers</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/caterers">
                Browse all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCaterers.map((caterer) => (
              <CatererCard key={caterer.id} caterer={caterer} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
