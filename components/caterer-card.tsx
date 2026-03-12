import Link from "next/link"
import Image from "next/image"
import { Star, Users, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Caterer } from "@/lib/data"

interface CatererCardProps {
  caterer: Caterer
}

export function CatererCard({ caterer }: CatererCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={caterer.logo_url || "/placeholder.jpg"}
          alt={caterer.business_name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2 flex gap-1">
          {(caterer.cuisine_types || []).slice(0, 2).map((c) => (
            <Badge key={c} variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm">
              {c}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{caterer.business_name}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium text-foreground">{caterer.avg_rating}</span>
            <span>({caterer.total_reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{caterer.city},{caterer.state}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            {caterer.min_guests} - {caterer.max_guests}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {caterer.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t px-4 py-3">
        <div>
          <span className="text-lg font-bold text-primary">₹{caterer.price_per_head}</span>
          <span className="text-sm text-muted-foreground">/plate</span>
        </div>
        <Button asChild>
          <Link href={`/menu/₹{caterer.id}`}>View Menu</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
