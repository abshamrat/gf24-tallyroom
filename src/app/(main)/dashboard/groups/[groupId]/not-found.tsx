"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const { groupId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-8 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <Image
        src="/empty-state/no-data.svg"
        width="200"
        height="200"
        alt="no image placeholder image"
        className="opacity-50 grayscale"
      ></Image>
      <h2 className="text-xl text-neutral-500 dark:text-neutral-400">Uh-oh, this route wasn't found</h2>
      <Button asChild>
        <Link href={`/dashboard/groups/${groupId}/info`}>View Group Info</Link>
      </Button>
    </div>
  );
}
