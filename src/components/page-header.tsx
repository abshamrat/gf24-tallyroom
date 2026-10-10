import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("bg-neutral-50/50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 py-12 backdrop-blur-sm", className)}>
      <div className="container">{children}</div>
    </div>
  );
}
