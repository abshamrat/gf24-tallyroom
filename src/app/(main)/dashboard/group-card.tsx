import { getGroupImageUrl } from "@/app/(main)/dashboard/groups/[groupId]/settings/util";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Group } from "@/db/schema";
import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import { UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function GroupCard({
  group,
  buttonText,
  memberCount,
}: {
  group: Pick<Group, "id" | "bannerId" | "name" | "description" | "id">;
  buttonText: string;
  memberCount: string;
}) {
  return (
    <Card className={cn(cardStyles, "flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1")}>
      <CardHeader className="p-0">
        <div className="relative h-[120px] w-full overflow-hidden">
          <Image
            src={getGroupImageUrl(group)}
            fill
            alt="image of the group"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
        <div className="px-6 pt-4">
          <CardTitle className="mb-2 text-xl">{group.name}</CardTitle>
          <CardDescription className="line-clamp-3 h-[4.5rem] text-neutral-500 dark:text-neutral-400">
            {group.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-4 mt-auto">
        <div className="flex gap-2 items-center text-sm text-neutral-500 dark:text-neutral-400">
          <UsersIcon className="w-4 h-4 text-brand-primary" /> {memberCount} members
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button className="w-full rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-brand-primary/20 shadow-lg" asChild>
          <Link href={`/dashboard/groups/${group.id}/info`}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
