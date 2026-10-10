"use client";

import Container from "@/components/container";
import { subscribeEmailAction } from "@/app/(main)/(coming-soon)/actions";
import { LoaderButton } from "@/components/loader-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { useRef } from "react";
import { useServerAction } from "zsa-react";

export function NewsletterSection() {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);
  const { execute, status } = useServerAction(subscribeEmailAction, {
    onSuccess() {
      ref.current?.reset();
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    },
    onError({ err }) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <section className="py-24 bg-background border-t border-neutral-200 dark:border-neutral-800">
      <Container>
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 px-6 py-16 sm:px-12 sm:py-24">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/30 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Join the Community
            </h2>
            <p className="text-neutral-300 max-w-2xl mb-10 text-lg">
              Get the latest updates, community stories, and event highlights
              delivered straight to your inbox. No spam, ever.
            </p>

            <form
              ref={ref}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const formData = new FormData(form);
                const email = formData.get("email") as string;
                await execute({ email });
              }}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-white/10 border-white/10 text-white placeholder:text-neutral-400 focus:bg-white/20 transition-colors"
                />
              </div>
              <LoaderButton
                isLoading={status === "pending"}
                className="h-12 px-8 bg-white text-neutral-900 hover:bg-neutral-100 font-semibold"
              >
                Subscribe
              </LoaderButton>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
