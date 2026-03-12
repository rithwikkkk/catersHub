"use client"

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"

export function CartSidebar() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add items from the menu to get started
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Your Cart
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-muted-foreground hover:text-destructive"
        >
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.menuItem.id} className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{item.menuItem.name}</p>
              <p className="text-sm text-muted-foreground">
                ${item.menuItem.price} each
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => {
                  if (item.quantity === 1) {
                    removeItem(item.menuItem.id)
                  } else {
                    updateQuantity(item.menuItem.id, item.quantity - 1)
                  }
                }}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease</span>
              </Button>
              <span className="w-6 text-center text-sm font-medium text-foreground">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => removeItem(item.menuItem.id)}
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-4 pt-4">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-foreground">Total</span>
          <span className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}
