"use client";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
            <CardTitle className={"text-lg font-medium text-purple-600"}>
              Security
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-zinc-100">
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
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className={"text-lg font-medium text-red-500"}>
              Danger Zone
            </CardTitle>
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className={"cursor-pointer"}>
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 border border-gray-800 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          // TODO: Call your delete API here
                          console.log("Account deletion triggered");
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                      >
                        Yes, delete it
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
