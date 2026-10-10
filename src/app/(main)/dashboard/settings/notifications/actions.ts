"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { updateProfileNotificationsMutedUseCase } from "@/use-cases/users";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateNotificationsMutedAction = authenticatedAction
  .createServerAction()
  .input(z.boolean())
  .handler(async ({ input: muted, ctx: { user } }) => {
    await updateProfileNotificationsMutedUseCase(user.id, muted);
    revalidatePath(`/dashboard/settings/notifications`);
  });
