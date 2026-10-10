"use client";

import { Input } from "@/components/ui/input";
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
import { updateProfileLocationAction } from "./actions";
import { useServerAction } from "zsa-react";

const updateProfileLocationSchema = z.object({
  location: z.string().max(60),
});

export function ProfileLocationForm({ location }: { location: string }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateProfileLocationSchema>>({
    resolver: zodResolver(updateProfileLocationSchema),
    defaultValues: {
      location: location ?? "",
    },
  });

  const { execute: updateProfileLocation, isPending } = useServerAction(
    updateProfileLocationAction,
    {
      onSuccess: () => {
        toast({
          title: "Location Updated",
          description: "Location updated successfully.",
        });
        form.reset();
      },
      onError: ({ err }) => {
        toast({
          title: "Error",
          description: err.message || "Failed to update profile location.",
          variant: "destructive",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof updateProfileLocationSchema>> = (
    values
  ) => {
    updateProfileLocation(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex gap-2 flex-1"
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} maxLength={60} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending}>Save</LoaderButton>
      </form>
    </Form>
  );
}
