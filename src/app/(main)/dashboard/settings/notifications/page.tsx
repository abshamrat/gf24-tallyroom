import { NotificationsSwitch } from "@/app/(main)/dashboard/settings/notifications/notifications-switch";
import { assertAuthenticated } from "@/lib/session";
import { getUserProfileUseCase } from "@/use-cases/users";
import { ConfigurationPanel } from "@/components/configuration-panel";

export default async function NotificationsSettingsPage() {
  const user = await assertAuthenticated();
  const profile = await getUserProfileUseCase(user.id);

  return (
    <div className="space-y-8">
      <ConfigurationPanel title="Notifications">
        <NotificationsSwitch notificationsMuted={profile.notificationsMuted} />
      </ConfigurationPanel>
    </div>
  );
}
