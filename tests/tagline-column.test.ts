// TAL-12: the groups table gains a nullable `tagline` column, and a group
// row accepts and returns an optional tagline. This runs createGroup's
// generic insert and getGroupsByUser against the real database, which
// `npm test` has migrated and seeded first.

import { after, test } from "node:test";
import assert from "node:assert/strict";
import { pg } from "@/db";
import { createUser, deleteUser } from "@/data-access/users";
import { createProfile } from "@/data-access/profiles";
import { createGroup, getGroupsByUser } from "@/data-access/groups";

after(async () => {
  await pg.end();
});

test("a saved tagline reads back", async () => {
  const created = await createUser(`tagline-${Date.now()}@example.com`);
  try {
    await createProfile(created.id, "Tagline Tester");
    await createGroup({
      name: "Tagline test group",
      description: "tagline round trip",
      isPublic: false,
      userId: created.id,
      tagline: "A group with a line",
    });
    const groups = await getGroupsByUser(created.id);
    assert.equal(groups[0].tagline, "A group with a line");
  } finally {
    await deleteUser(created.id);
  }
});

test("a group with no tagline reads back null", async () => {
  const created = await createUser(`untaglined-${Date.now()}@example.com`);
  try {
    await createProfile(created.id, "Untaglined Tester");
    await createGroup({
      name: "Untaglined test group",
      description: "no tagline",
      isPublic: false,
      userId: created.id,
    });
    const groups = await getGroupsByUser(created.id);
    assert.equal(groups[0].tagline, null);
  } finally {
    await deleteUser(created.id);
  }
});
