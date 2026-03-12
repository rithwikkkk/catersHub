import { DashboardLayout } from "@/components/dashboard-layout"
import { OrderCard } from "@/components/order-card"
import { orders } from "@/lib/data"

export default function UserOrdersPage() {
  const userOrders = orders.filter((o) => o.userId === "u1")

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
          <p className="mt-1 text-muted-foreground">
            View and track all your catering orders
          </p>
        </div>

        {userOrders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {userOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-12 text-center">
            <p className="text-lg font-medium text-foreground">No orders yet</p>
            <p className="mt-2 text-muted-foreground">
              Start browsing caterers to place your first order
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
