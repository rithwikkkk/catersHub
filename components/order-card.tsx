import { Calendar, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/data"
import { cn } from "@/lib/utils"

interface OrderCardProps {
  order: Order
  showCaterer?: boolean
}

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  preparing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function OrderCard({ order, showCaterer = true }: OrderCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold text-foreground">
            Order #{order.id}
          </CardTitle>
          {showCaterer && (
            <p className="mt-1 text-sm text-muted-foreground">{order.catererName}</p>
          )}
        </div>
        <Badge className={cn("capitalize", statusColors[order.status])}>
          {order.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(order.eventDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{order.guestCount} guests</span>
          </div>
        </div>

        <div className="space-y-1">
          {order.items.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">
                {item.menuItem.name} x{item.quantity}
              </span>
              <span className="text-foreground">
                ${(item.menuItem.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-sm text-muted-foreground">
              +{order.items.length - 3} more items
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="font-medium text-foreground">Total</span>
          <span className="text-lg font-bold text-primary">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
