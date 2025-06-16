"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Subscription {
  id: string
  status: string
  current_period_end: string | null
  cancel_at_period_end: boolean | null
  plan: {
    id: string
    name: string
    price: number
    interval: string
    features: string[]
  } | null
}

interface SubscriptionDetailsProps {
  subscription: Subscription | null
}

export function SubscriptionDetails({ subscription }: SubscriptionDetailsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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

    // In a real app, this would redirect to a Stripe checkout page
    setTimeout(() => {
      alert(`In a real app, you would be redirected to upgrade to the ${planId} plan.`)
      setIsLoading(false)
      setIsDialogOpen(false)
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

  if (!subscription || !subscription.plan) {
    return (
      <div className="space-y-4">
        <Alert>
          <AlertDescription>You're currently on the free trial. Choose a plan below to upgrade.</AlertDescription>
        </Alert>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className={plan.popular ? "border-primary" : ""}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Popular
                </div>
              )}
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="mt-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleUpgrade(plan.id)} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{subscription.plan.name} Plan</h3>
            <Badge variant={subscription.status === "active" ? "default" : "outline"}>
              {subscription.status === "active" ? "Active" : "Inactive"}
            </Badge>
            {subscription.cancel_at_period_end && (
              <Badge variant="outline" className="text-destructive border-destructive">
                Cancels at period end
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            ${subscription.plan.price}/{subscription.plan.interval}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Change Plan</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Change Subscription Plan</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-3 py-4">
                {plans.map((plan) => (
                  <Card key={plan.id} className={plan.id === subscription.plan?.id ? "border-primary" : ""}>
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                        <div className="mt-1">
                          <span className="text-3xl font-bold">${plan.price}</span>
                          <span className="text-muted-foreground">/{plan.interval}</span>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm mb-6">
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
                        disabled={isLoading || plan.id === subscription.plan?.id}
                      >
                        {plan.id === subscription.plan?.id ? "Current Plan" : "Switch Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          {subscription.status === "active" && !subscription.cancel_at_period_end && (
            <Button
              variant="outline"
              className="text-destructive"
              onClick={handleCancelSubscription}
              disabled={isLoading}
            >
              Cancel Subscription
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-medium">Subscription Details</h4>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-medium">
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Billing Period:</span>
            <span className="font-medium">
              {subscription.plan.interval.charAt(0).toUpperCase() + subscription.plan.interval.slice(1)}ly
            </span>
          </div>
          {subscription.current_period_end && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next billing date:</span>
              <span className="font-medium">{format(new Date(subscription.current_period_end), "MMMM d, yyyy")}</span>
            </div>
          )}
          {subscription.cancel_at_period_end && (
            <div className="flex items-center gap-2 mt-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>
                Your subscription will end on {format(new Date(subscription.current_period_end!), "MMMM d, yyyy")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
