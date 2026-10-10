// TAL-10: toggling the Notifications switch persists `notificationsMuted`
// and the saved value round-trips back out of the profile (what a page reload
// reads). This runs the new use-case write path against the real database,
// which `npm test` has migrated and seeded first.

import { after, test } from "node:test";
import assert from "node:assert/strict";
import { pg } from "@/db";
import { createUser, deleteUser } from "@/data-access/users";
import { createProfile } from "@/data-access/profiles";
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
