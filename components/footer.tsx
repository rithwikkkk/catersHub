import Link from "next/link"
import { ChefHat } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">catersHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting you with the best caterers for every occasion.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">For Customers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/caterers" className="hover:text-foreground">
                  Browse Caterers
                </Link>
              </li>
              <li>
                <Link href="/dashboard/user" className="hover:text-foreground">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">For Caterers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard/caterer" className="hover:text-foreground">
                  Caterer Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Join as Caterer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} catersHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
