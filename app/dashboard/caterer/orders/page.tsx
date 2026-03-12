"use client"

import { useState } from "react"
import { Calendar, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"
import { orders as initialOrders, type Order } from "@/lib/data"
import { cn } from "@/lib/utils"

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  preparing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const statusOptions: Order["status"][] = [
  "pending",
  "confirmed",
  "preparing",
  "delivered",
  "cancelled",
]

export default function CatererOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(
    initialOrders.filter((o) => o.catererId === "1")
  )

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  return (
    <DashboardLayout role="caterer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track all your catering orders
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-base font-semibold text-foreground">
                    Order #{order.id}
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Created on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Badge className={cn("capitalize", statusColors[order.status])}>
                        {order.status}
                      </Badge>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {statusOptions.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => updateOrderStatus(order.id, status)}
                        className="capitalize"
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Event:{" "}
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

                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.menuItem.name} x {item.quantity}
                        </span>
                        <span className="text-foreground">
                          ₹{(item.menuItem.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="font-medium text-foreground">Total Amount</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
