import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Profile } from "@/db/schema";
import { getFollowersForUserUseCase } from "@/use-cases/following";
import Image from "next/image";

function FollowerCard({ profile }: { profile: Profile }) {
  return (
    <div key={profile.userId} className="flex items-center gap-4">
      <div className="bg-card dark:bg-card flex gap-4 items-center hover:border-brand-primary/50 transition-colors border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
        <Avatar>
          <AvatarImage src={profile.image || "/group.jpeg"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link href={`/users/${profile.userId}/info`}>
          <p className="text-xl font-medium hover:underline decoration-brand-primary">{profile.displayName}</p>
        </Link>
      </div>
    </div>
  );
}

export default async function FollowersPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const userIdInt = parseInt(userId);
  const followers = await getFollowersForUserUseCase(userIdInt);

  return (
    <div className="space-y-8">
      {followers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-8 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src="/empty-state/mountain.svg"
            width="200"
            height="200"
            alt="no groups placeholder image"
            className="opacity-50 grayscale"
          ></Image>
          <h2 className="text-2xl text-neutral-500 dark:text-neutral-400">This user has no followers</h2>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {followers.map((follower) => (
          <FollowerCard key={follower.userId} profile={follower} />
        ))}
      </div>
    </div>
  );
}
