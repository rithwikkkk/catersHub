import Link from "next/link"
import { ArrowRight, ShoppingBag, UtensilsCrossed, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OrderCard } from "@/components/order-card"
import { orders, menuItems } from "@/lib/data"

export default function CatererDashboardPage() {
  const catererOrders = orders.filter((o) => o.catererId === "1")
  const recentOrders = catererOrders.slice(0, 2)
  const catererMenuItems = menuItems.filter((m) => m.catererId === "1")
  const totalRevenue = catererOrders.reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <DashboardLayout role="caterer">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Royal Feast Catering</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your menu, orders, and business analytics
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{catererOrders.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Menu Items
              </CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{catererMenuItems.length}</div>
              <p className="text-xs text-muted-foreground">Active items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rating
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.8</div>
              <p className="text-xs text-muted-foreground">234 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/dashboard/caterer/orders">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} showCaterer={false} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link href="/dashboard/caterer/menu">
                <UtensilsCrossed className="h-6 w-6" />
                <span>Manage Menu</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link href="/dashboard/caterer/orders">
                <ShoppingBag className="h-6 w-6" />
                <span>View Orders</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link href="/dashboard/caterer/settings">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
