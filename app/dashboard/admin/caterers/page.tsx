"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, MoreHorizontal, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"
import { caterers } from "@/lib/data"

export default function AdminCaterersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCaterers = caterers.filter(
    (caterer) =>
      caterer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caterer.cuisine.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Caterers</h1>
          <p className="mt-1 text-muted-foreground">
            Manage all registered caterers
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search caterers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caterer</TableHead>
                <TableHead>Cuisine</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCaterers.map((caterer) => (
                <TableRow key={caterer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                        <Image
                          src={caterer.image}
                          alt={caterer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{caterer.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {caterer.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {caterer.cuisine.map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium text-foreground">{caterer.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({caterer.reviewCount})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-primary">
                      ${caterer.pricePerPlate}/plate
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {caterer.minGuests} - {caterer.maxGuests} guests
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>View Menu</DropdownMenuItem>
                        <DropdownMenuItem>Edit Caterer</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend Caterer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
