import Link from "next/link"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold">
          <Share2 className="h-6 w-6" />
          <span className="text-xl">PostScheduler</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Schedule Your Social Media Posts with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Plan, create, and schedule your content across multiple platforms from one dashboard.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
