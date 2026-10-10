import { ReactNode } from "react";

export function InputError({ children }: { children: ReactNode }) {
  return <div className="text-destructive mt-2 text-sm font-medium">{children}</div>;
}
