"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function BillingForm() {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Validate form
    if (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvc) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    // In a real app, this would call Stripe API to tokenize the card
    // and then send the token to your backend
    setTimeout(() => {
      setSuccess("Payment method updated successfully")
      setIsLoading(false)
    }, 1500)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input
          id="cardName"
          placeholder="John Doe"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            disabled={isLoading}
          />
          <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryMonth">Expiry Month</Label>
          <Select value={expiryMonth} onValueChange={setExpiryMonth} disabled={isLoading}>
            <SelectTrigger id="expiryMonth">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const month = (i + 1).toString().padStart(2, "0")
                return (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryYear">Expiry Year</Label>
          <Select value={expiryYear} onValueChange={setExpiryYear} disabled={isLoading}>
            <SelectTrigger id="expiryYear">
              <SelectValue placeholder="YY" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => {
                const year = (new Date().getFullYear() + i).toString().slice(-2)
                return (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="123"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
            maxLength={3}
            disabled={isLoading}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Updating..." : "Update Payment Method"}
      </Button>

      <div className="text-xs text-muted-foreground text-center">
        Your payment information is processed securely. We do not store your credit card details.
      </div>
    </form>
  )
}
