import { DashboardLayout } from "@/components/dashboard-layout"
import { OrderCard } from "@/components/order-card"
import { orders } from "@/lib/data"

export default function AdminOrdersPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Orders</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage all platform orders
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
