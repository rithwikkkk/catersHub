"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Leaf, Wheat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/dashboard-layout"
import { menuItems as initialMenuItems, type MenuItem } from "@/lib/data"

export default function CatererMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialMenuItems.filter((m) => m.catererId === "1")
  )
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const categories = [...new Set(menuItems.map((item) => item.category))]

  return (
    <DashboardLayout role="caterer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Menu Items</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your menu offerings
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setEditingItem(null)}>
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit Menu Item" : "Add Menu Item"}
                </DialogTitle>
                <DialogDescription>
                  {editingItem
                    ? "Update the details of this menu item"
                    : "Add a new item to your menu"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue={editingItem?.name}
                    placeholder="Dish name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={editingItem?.description}
                    placeholder="Describe the dish"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      defaultValue={editingItem?.price}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      defaultValue={editingItem?.category}
                      placeholder="Main Course"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    defaultValue={editingItem?.image}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-3">
                  <Label>Dietary Info</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="vegetarian"
                        defaultChecked={editingItem?.isVegetarian}
                      />
                      <Label htmlFor="vegetarian" className="font-normal">
                        Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="vegan"
                        defaultChecked={editingItem?.isVegan}
                      />
                      <Label htmlFor="vegan" className="font-normal">
                        Vegan
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="glutenFree"
                        defaultChecked={editingItem?.isGlutenFree}
                      />
                      <Label htmlFor="glutenFree" className="font-normal">
                        Gluten-Free
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  {editingItem ? "Save Changes" : "Add Item"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-4 text-lg font-semibold text-foreground">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="relative h-32 w-32 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <span className="font-bold text-primary">${item.price}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <div className="mt-2 flex gap-1">
                            {item.isVegetarian && (
                              <Badge variant="secondary" className="gap-1 text-xs">
                                <Leaf className="h-3 w-3" />
                                Veg
                              </Badge>
                            )}
                            {item.isGlutenFree && (
                              <Badge variant="secondary" className="gap-1 text-xs">
                                <Wheat className="h-3 w-3" />
                                GF
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setEditingItem(item)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
