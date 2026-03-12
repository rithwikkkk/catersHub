import Link from "next/link"
import { ArrowRight, Users, UtensilsCrossed, ShoppingBag, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OrderCard } from "@/components/order-card"
import { users, caterers, orders } from "@/lib/data"

export default function AdminDashboardPage() {
  const totalUsers = users.filter((u) => u.role === "user").length
  const totalCaterers = caterers.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)
  const recentOrders = orders.slice(0, 3)

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Platform overview and management tools
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Caterers
              </CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalCaterers}</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Platform earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/dashboard/admin/orders">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link href="/dashboard/admin/users">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link href="/dashboard/admin/caterers">
                <UtensilsCrossed className="h-6 w-6" />
                <span>Manage Caterers</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link href="/dashboard/admin/orders">
                <ShoppingBag className="h-6 w-6" />
                <span>View All Orders</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
