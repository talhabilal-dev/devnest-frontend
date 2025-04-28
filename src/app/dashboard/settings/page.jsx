import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences."
      />

      <div className="grid gap-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription className="text-gray-400">
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Receive email notifications about your activity.
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comment-notifications">
                    Comment Notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Get notified when someone comments on your posts.
                  </p>
                </div>
                <Switch id="comment-notifications" defaultChecked />
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-gray-400">
                    Receive emails about new features and updates.
                  </p>
                </div>
                <Switch id="marketing-emails" />
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="social-notifications">
                    Social Notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Get notified when someone follows you or likes your post.
                  </p>
                </div>
                <Switch id="social-notifications" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription className="text-gray-400">
              Customize how the dashboard looks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-gray-400">
                    Use dark mode for the dashboard.
                  </p>
                </div>
                <Switch id="dark-mode" defaultChecked />
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-view">Compact View</Label>
                  <p className="text-sm text-gray-400">
                    Use a more compact layout for the dashboard.
                  </p>
                </div>
                <Switch id="compact-view" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Update Password
                </Button>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="text-lg font-medium mb-2">Sessions</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Manage your active sessions and sign out from other devices.
                  </p>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Sign Out From All Devices
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription className="text-gray-400">
              Irreversible actions for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-red-500 mb-2">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
