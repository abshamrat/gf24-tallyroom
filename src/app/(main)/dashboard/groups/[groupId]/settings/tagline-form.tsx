"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { updateGroupTaglineAction } from "./actions";
import { GroupId } from "@/db/schema";
import { useServerAction } from "zsa-react";

const updateGroupTagline = z.object({
  tagline: z.string().max(80),
});

export function TaglineForm({
  tagline,
  groupId,
}: {
  tagline: string;
  groupId: GroupId;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateGroupTagline>>({
    resolver: zodResolver(updateGroupTagline),
    defaultValues: {
      tagline,
    },
  });

  const { execute: updateTagline, isPending } = useServerAction(
    updateGroupTaglineAction,
    {
      onSuccess: () => {
        toast({
          title: "Update Successful",
          description: "Your group tagline has been updated.",
        });
      },
      onError: ({ err }) => {
        toast({
          title: "Uh-oh, something went wrong",
          description:
            err.message || "Your tagline was not successfully updated.",
          variant: "destructive",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof updateGroupTagline>> = (
    values
  ) => {
    updateTagline({ tagline: values.tagline, groupId });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 flex-1"
      >
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input maxLength={80} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton className="w-fit self-end" isLoading={isPending}>
          Save
        </LoaderButton>
      </form>
    </Form>
  );
}
