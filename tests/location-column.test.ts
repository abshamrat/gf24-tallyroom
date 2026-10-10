// TAL-6: the profiles table has a nullable `location` column and a stored
// value round-trips through the data-access layer. `npm test` migrates and
// seeds the real database first, so this runs against the migrated schema.

import { after, test } from "node:test";
import assert from "node:assert/strict";
import { pg } from "@/db";
import { createUser, deleteUser } from "@/data-access/users";
import { createProfile, getProfile, updateProfile } from "@/data-access/profiles";

after(async () => {
  await pg.end();
});

test("profile location column exists and a saved value round-trips", async () => {
  const created = await createUser(`location-${Date.now()}@example.com`);
  try {
    await createProfile(created.id, "Location Tester");

    await updateProfile(created.id, { location: "Cape Town" });
    const withLocation = await getProfile(created.id);
    assert.equal(withLocation?.location, "Cape Town");

    await updateProfile(created.id, { location: null });
    const withoutLocation = await getProfile(created.id);
    assert.equal(withoutLocation?.location, null);
  } finally {
    await deleteUser(created.id);
  }
});
