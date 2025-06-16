import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BillingForm } from "@/components/billing/billing-form"
import { SubscriptionDetails } from "@/components/billing/subscription-details"
import { PaymentHistory } from "@/components/billing/payment-history"
import { getUserSubscription } from "@/lib/actions/subscription"

export default async function BillingPage() {
  const subscription = await getUserSubscription().catch(() => null)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p className="text-muted-foreground">Manage your subscription and payment methods</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionDetails subscription={subscription} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Update your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <BillingForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentHistory />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
