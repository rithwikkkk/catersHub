import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { caterers } from "@/lib/data"

export default function CatererSettingsPage() {
  const caterer = caterers.find((c) => c.id === "1")!

  return (
    <DashboardLayout role="caterer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your catering business settings
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Update your catering business details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Business Name</Label>
                <Input id="name" defaultValue={caterer.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue={caterer.location} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={caterer.description} rows={4} />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing & Capacity</CardTitle>
            <CardDescription>
              Set your pricing and guest capacity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price per Plate (₹)</Label>
                <Input id="price" type="number" defaultValue={caterer.pricePerPlate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minGuests">Minimum Guests</Label>
                <Input id="minGuests" type="number" defaultValue={caterer.minGuests} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxGuests">Maximum Guests</Label>
                <Input id="maxGuests" type="number" defaultValue={caterer.maxGuests} />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cuisines & Occasions</CardTitle>
            <CardDescription>
              Specify the cuisines you offer and occasions you cater to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cuisines">Cuisines (comma-separated)</Label>
              <Input id="cuisines" defaultValue={caterer.cuisine.join(", ")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occasions">Occasions (comma-separated)</Label>
              <Input id="occasions" defaultValue={caterer.occasions.join(", ")} />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
