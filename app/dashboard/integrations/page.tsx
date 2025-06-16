import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialIntegrations } from "@/components/integrations/social-integrations"
import { getSocialAccounts } from "@/lib/actions/social-accounts"

export default async function IntegrationsPage() {
  const socialAccounts = await getSocialAccounts().catch(() => [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Integrations</h1>
      <p className="text-muted-foreground">Connect your social media accounts</p>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Platforms</CardTitle>
          <CardDescription>Connect your accounts to schedule and publish content</CardDescription>
        </CardHeader>
        <CardContent>
          <SocialIntegrations initialAccounts={socialAccounts} />
        </CardContent>
      </Card>
    </div>
  )
}
