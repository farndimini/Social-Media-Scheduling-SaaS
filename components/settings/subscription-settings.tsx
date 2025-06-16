"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { format } from "date-fns"

interface Subscription {
  id: string
  status: string
  current_period_end: string | null
  plan: {
    name: string
    price: number
    interval: string
    features: string[]
  } | null
}

interface SubscriptionSettingsProps {
  initialSubscription: Subscription | null
}

export function SubscriptionSettings({ initialSubscription }: SubscriptionSettingsProps) {
  const [subscription, setSubscription] = useState(initialSubscription)
  const [isLoading, setIsLoading] = useState(false)

  // Mock plans
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 9,
      interval: "month",
      features: ["1 social media account", "30 scheduled posts per month", "Basic analytics"],
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: 29,
      interval: "month",
      features: [
        "5 social media accounts",
        "Unlimited scheduled posts",
        "Advanced analytics",
        "Content approval workflow",
        "2 team members",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      interval: "month",
      features: [
        "Unlimited social media accounts",
        "Unlimited scheduled posts",
        "Custom analytics and reporting",
        "Advanced approval workflows",
        "Unlimited team members",
        "Priority support",
      ],
      popular: false,
    },
  ]

  const handleUpgrade = (planId: string) => {
    setIsLoading(true)

    // In a real app, this would redirect to a payment page
    setTimeout(() => {
      alert(`In a real app, you would be redirected to upgrade to the ${planId} plan.`)
      setIsLoading(false)
    }, 1000)
  }

  const handleCancelSubscription = () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) return

    setIsLoading(true)

    // In a real app, this would call an API to cancel the subscription
    setTimeout(() => {
      alert("In a real app, your subscription would be canceled at the end of the billing period.")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {subscription ? (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Current Plan: {subscription.plan?.name || "Free"}</h3>
                {subscription.status === "active" && (
                  <p className="text-sm text-muted-foreground">
                    Your subscription renews on{" "}
                    {subscription.current_period_end
                      ? format(new Date(subscription.current_period_end), "MMMM d, yyyy")
                      : "N/A"}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                onClick={handleCancelSubscription}
                disabled={isLoading || subscription.status !== "active"}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>

          <Alert>
            <AlertDescription>Want to upgrade your plan? Choose from the options below.</AlertDescription>
          </Alert>
        </div>
      ) : (
        <Alert>
          <AlertDescription>You're currently on the free trial. Choose a plan below to upgrade.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-primary" : ""}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleUpgrade(plan.id)}
                disabled={isLoading || (subscription?.plan?.name === plan.name && subscription?.status === "active")}
              >
                {subscription?.plan?.name === plan.name && subscription?.status === "active"
                  ? "Current Plan"
                  : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
