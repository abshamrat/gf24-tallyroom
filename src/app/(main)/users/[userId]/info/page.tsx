import { getUserProfileUseCase } from "@/use-cases/users";
import BioView from "./bio-view";
import Image from "next/image";
import { cardStyles } from "@/styles/common";
import { cn } from "@/lib/utils";

export default async function InfoContent({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const userIdInt = parseInt(userId);
  const profile = await getUserProfileUseCase(userIdInt);

  return (
    <div>
      {!profile.bio && (
        <div
          className={cn(
            cardStyles,
            "flex flex-col items-center justify-center py-12 gap-8 bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
          )}
        >
          <Image
            src="/empty-state/mountain.svg"
            width="200"
            height="200"
            alt="no groups placeholder image"
            className="opacity-50 grayscale"
          ></Image>
          <h2 className="text-2xl text-neutral-500 dark:text-neutral-400">
            This user has no bio
          </h2>
        </div>
      )}

      {profile.bio && <BioView bio={profile.bio} />}
    </div>
  );
}
