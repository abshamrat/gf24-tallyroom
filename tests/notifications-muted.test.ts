// TAL-10: toggling the Notifications switch persists `notificationsMuted`
// and the saved value round-trips back out of the profile (what a page reload
// reads). This runs the new use-case write path against the real database,
// which `npm test` has migrated and seeded first.

import { after, test } from "node:test";
import assert from "node:assert/strict";
import { pg } from "@/db";
import { createUser, deleteUser } from "@/data-access/users";
import { createProfile, updateProfile } from "@/data-access/profiles";
import { createGroup, getGroupsByUser } from "@/data-access/groups";
import {
  createNotification,
  getNotificationsForUser,
} from "@/data-access/notifications";
import * as userUseCases from "@/use-cases/users";

after(async () => {
  await pg.end();
});

test("the notificationsMuted switch choice persists and reads back", async () => {
  const updateProfileNotificationsMutedUseCase = (
    userUseCases as Record<string, unknown>
  ).updateProfileNotificationsMutedUseCase;

  assert.equal(
    typeof updateProfileNotificationsMutedUseCase,
    "function",
    "TAL-10 write path: updateProfileNotificationsMutedUseCase must exist"
  );

  const created = await createUser(`muted-${Date.now()}@example.com`);
  try {
    await createProfile(created.id, "Mute Tester");

    await (updateProfileNotificationsMutedUseCase as (
      userId: number,
      muted: boolean
    ) => Promise<void>)(created.id, true);

    const muted = await userUseCases.getUserProfileUseCase(created.id);
    assert.equal(muted.notificationsMuted, true, "muting must be persisted");

    await (updateProfileNotificationsMutedUseCase as (
      userId: number,
      muted: boolean
    ) => Promise<void>)(created.id, false);

    const unmuted = await userUseCases.getUserProfileUseCase(created.id);
    assert.equal(
      unmuted.notificationsMuted,
      false,
      "unmuting must be persisted"
    );
  } finally {
    await deleteUser(created.id);
  }
});

test("a muted user receives no new notification", async () => {
  const created = await createUser(`muted-notify-${Date.now()}@example.com`);
  try {
    await createProfile(created.id, "Muted Notify");
    await updateProfile(created.id, { notificationsMuted: true });
    await createGroup({
      name: "Mute test group",
      description: "muted notification group",
      isPublic: false,
      userId: created.id,
    });
    const [group] = await getGroupsByUser(created.id);

    await createNotification({
      userId: created.id,
      groupId: group.id,
      type: "event",
      message: "should be skipped",
      createdOn: new Date(),
    });

    const notifications = await getNotificationsForUser(created.id);
    assert.equal(notifications.length, 0);
  } finally {
    await deleteUser(created.id);
  }
});

test("an unmuted user still receives a new notification", async () => {
  const created = await createUser(`unmuted-notify-${Date.now()}@example.com`);
  try {
    await createProfile(created.id, "Unmuted Notify");
    await createGroup({
      name: "Unmute test group",
      description: "unmuted notification group",
      isPublic: false,
      userId: created.id,
    });
    const [group] = await getGroupsByUser(created.id);

    await createNotification({
      userId: created.id,
      groupId: group.id,
      type: "event",
      message: "should be delivered",
      createdOn: new Date(),
    });

    const notifications = await getNotificationsForUser(created.id);
    assert.equal(notifications.length, 1);
    assert.equal(notifications[0].message, "should be delivered");
  } finally {
    await deleteUser(created.id);
  }
});
