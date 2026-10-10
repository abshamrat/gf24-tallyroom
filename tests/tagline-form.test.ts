// TAL-13: the Tagline panel's write path. `updateGroupTaglineUseCase`
// persists a tagline for the group owner, stores an empty tagline to remove
// it, and rejects a non-owner before writing. This runs against the real
// database, which `npm test` has migrated and seeded first.

import { after, test } from "node:test";
import assert from "node:assert/strict";
import { pg } from "@/db";
import { createUser, deleteUser } from "@/data-access/users";
import { createProfile } from "@/data-access/profiles";
import { createGroup, getGroupById, getGroupsByUser } from "@/data-access/groups";
import { updateGroupTaglineUseCase as updateGroupTaglineUseCaseImpl } from "@/use-cases/groups";
import { GroupId } from "@/db/schema";
import { UserSession } from "@/use-cases/types";

const updateGroupTaglineUseCase = (
  authenticatedUser: UserSession,
  { groupId, tagline }: { groupId: GroupId; tagline: string }
) => updateGroupTaglineUseCaseImpl(authenticatedUser, { groupId, tagline });

after(async () => {
  await pg.end();
});

test("an owner can save a tagline and it persists", async () => {
  const owner = await createUser(`tagline-owner-${Date.now()}@example.com`);
  try {
    await createProfile(owner.id, "Tagline Owner");
    await createGroup({
      name: "Tagline form group",
      description: "tagline form write path",
      isPublic: false,
      userId: owner.id,
    });

    const [group] = await getGroupsByUser(owner.id);

    await updateGroupTaglineUseCase(
      { id: owner.id },
      { groupId: group.id, tagline: "A group with a line" }
    );

    const updated = await getGroupById(group.id);
    assert.equal(updated?.tagline, "A group with a line");
  } finally {
    await deleteUser(owner.id);
  }
});

test("an owner can save an empty tagline to remove it", async () => {
  const owner = await createUser(`tagline-clear-${Date.now()}@example.com`);
  try {
    await createProfile(owner.id, "Tagline Clearer");
    await createGroup({
      name: "Tagline clear group",
      description: "tagline removal",
      isPublic: false,
      userId: owner.id,
      tagline: "Old tagline",
    });

    const [group] = await getGroupsByUser(owner.id);

    await updateGroupTaglineUseCase(
      { id: owner.id },
      { groupId: group.id, tagline: "" }
    );

    const updated = await getGroupById(group.id);
    assert.equal(updated?.tagline, "");
  } finally {
    await deleteUser(owner.id);
  }
});

test("a non-owner is rejected before a tagline is written", async () => {
  const owner = await createUser(`tagline-reject-owner-${Date.now()}@example.com`);
  const intruder = await createUser(`tagline-reject-intruder-${Date.now()}@example.com`);
  try {
    await createProfile(owner.id, "Tagline Owner");
    await createProfile(intruder.id, "Tagline Intruder");
    await createGroup({
      name: "Tagline reject group",
      description: "non-owner rejection",
      isPublic: false,
      userId: owner.id,
      tagline: "Keep this",
    });

    const [group] = await getGroupsByUser(owner.id);

    await assert.rejects(
      updateGroupTaglineUseCase(
        { id: intruder.id },
        { groupId: group.id, tagline: "Hijacked" }
      )
    );

    const unchanged = await getGroupById(group.id);
    assert.equal(unchanged?.tagline, "Keep this");
  } finally {
    await deleteUser(intruder.id);
    await deleteUser(owner.id);
  }
});
