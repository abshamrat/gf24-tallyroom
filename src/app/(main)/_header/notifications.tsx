"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification } from "@/db/schema";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { markNotificationAsReadAction } from "./actions";
import { useServerAction } from "zsa-react";
import { getNotificationIcon, getNotificationLink } from "@/util/notifications";
import { useState } from "react";

export function Notifications({
  notifications,
}: {
  notifications: Notification[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { execute } = useServerAction(markNotificationAsReadAction, {
    onSuccess() {
      setIsOpen(false);
    },
  });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <div className="p-2 relative">
          <BellIcon className="w-6 h-6 text-foreground" />
          {notifications.length > 0 && (
            <div className="absolute top-1 right-[1px] w-2 h-2 bg-status-error dark:bg-status-error rounded-full flex items-center justify-center text-xs text-white"></div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 && (
          <div className="flex items-center gap-2 p-4 text-foreground">
            <div>No new notifications</div>
          </div>
        )}

        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} asChild>
            <Link
              onClick={async () => {
                await execute({ notificationId: notification.id });
              }}
              className="cursor-pointer"
              href={getNotificationLink(notification)}
            >
              <div className="flex items-center gap-2 p-4">
                {getNotificationIcon(notification)}
                <div>{notification.message}</div>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}

        <div className="flex justify-center py-4">
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            className="text-xs text-status-info dark:text-status-info hover:opacity-80 transition-opacity"
            href="/notifications"
          >
            View Notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
