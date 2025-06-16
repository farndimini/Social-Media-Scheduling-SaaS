"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || "Invalid email or password")
        setIsLoading(false)
        return
      }

      if (data?.user) {
        router.push(redirectPath)
        router.refresh()
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error("Unexpected error during login:", err)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillCredentials = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="flex items-center gap-2 font-bold">
                <Share2 className="h-6 w-6" />
                <span className="text-2xl">PostScheduler</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to sign in</p>
          </div>

          {/* Demo credentials info */}
          <div className="rounded-lg bg-blue-50 p-4 text-sm space-y-3">
            <p className="font-medium text-blue-900 mb-2">Available Demo Accounts:</p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillCredentials("farndimini@gmail.com", "pass;0600231590m")}
                className="w-full text-left p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <p className="text-blue-700 font-medium">Your Account</p>
                <p className="text-blue-600 text-xs">farndimini@gmail.com</p>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials("demo@example.com", "password123")}
                className="w-full text-left p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <p className="text-blue-700 font-medium">Demo Account</p>
                <p className="text-blue-600 text-xs">demo@example.com</p>
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="farndimini@gmail.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
