"use client"

import Image from "next/image"
import { Plus, Minus, Leaf, Wheat } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import type { MenuItem } from "@/lib/data"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addItem, updateQuantity, removeItem } = useCartStore()

  const cartItem = items.find((i) => i.menuItem.id === item.id)
  const quantity = cartItem?.quantity || 0

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-square w-full sm:h-32 sm:w-32 shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground">{item.name}</h3>
              <span className="text-lg font-bold text-primary">${item.price}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {item.isVegetarian && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Leaf className="h-3 w-3" />
                  Vegetarian
                </Badge>
              )}
              {item.isVegan && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Leaf className="h-3 w-3" />
                  Vegan
                </Badge>
              )}
              {item.isGlutenFree && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Wheat className="h-3 w-3" />
                  Gluten-Free
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end">
            {quantity > 0 ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    if (quantity === 1) {
                      removeItem(item.id)
                    } else {
                      updateQuantity(item.id, quantity - 1)
                    }
                  }}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-8 text-center font-medium text-foreground">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            ) : (
              <Button onClick={() => addItem(item)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
