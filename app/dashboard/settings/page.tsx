import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountSettings } from "@/components/settings/account-settings"
import { SocialAccountsSettings } from "@/components/settings/social-accounts-settings"
import { SubscriptionSettings } from "@/components/settings/subscription-settings"
import { getSocialAccounts } from "@/lib/actions/social-accounts"
import { getUserProfile } from "@/lib/actions/user"
import { getUserSubscription } from "@/lib/actions/subscription"

export default async function SettingsPage() {
  // Fetch user data with better error handling
  const socialAccounts = await getSocialAccounts().catch(() => [])
  const userProfile = await getUserProfile().catch(() => null)
  const subscription = await getUserSubscription().catch(() => null)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">Manage your account and preferences</p>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="social-accounts">Social Accounts</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountSettings initialProfile={userProfile} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social-accounts">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Accounts</CardTitle>
              <CardDescription>Connect and manage your social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <SocialAccountsSettings initialAccounts={socialAccounts} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Manage your subscription plan and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionSettings initialSubscription={subscription} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
