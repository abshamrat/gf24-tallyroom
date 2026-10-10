"use client";

import { updateNotificationsMutedAction } from "@/app/(main)/dashboard/settings/notifications/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from "zsa-react";

export function NotificationsSwitch({
  notificationsMuted,
}: {
  notificationsMuted: boolean;
}) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(
    updateNotificationsMutedAction,
    {
      onSuccess() {
        toast({
          title: "Update successful",
          description: "Notification preferences updated.",
        });
      },
      onError({ err }) {
        toast({
          title: "Something went wrong",
          description: err.message,
          variant: "destructive",
        });
      },
    }
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Switch
          checked={notificationsMuted}
          onCheckedChange={(checked) => {
            execute(checked);
          }}
          disabled={isPending}
          id="notifications-muted"
        />
        <Label htmlFor="notifications-muted">Turn off notifications</Label>
      </div>
      <p className="text-sm text-muted-foreground">
        When turned on, you will not receive any new notifications.
      </p>
    </div>
  );
}
