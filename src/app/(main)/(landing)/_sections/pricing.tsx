import { SignedIn, SignedOut } from "@/components/auth";
import Container from "@/components/container";
import { CheckoutButton } from "@/components/stripe/upgrade-button/checkout-button";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { Check } from "lucide-react";
import Link from "next/link";

function PricingCard({
  title,
  price,
  description,
  features,
  isPopular,
  hasSubscription,
  priceId,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  hasSubscription: boolean;
  priceId: string;
}) {
  const isFree = price === "0";

  return (
    <div className={`relative rounded-3xl border p-8 shadow-xl flex flex-col h-full ${
      isPopular 
        ? "border-brand-primary bg-background z-10 scale-105 shadow-brand-primary/20" 
        : "border-neutral-200 dark:border-neutral-800 bg-background/50"
    }`}>
      {isPopular && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center">
          <div className="bg-brand-primary text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400 mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">${price}</span>
          {!isFree && <span className="text-neutral-500">/month</span>}
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex-1 mb-8">
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <SignedIn>
          {hasSubscription ? (
            <Button className="w-full rounded-full" variant={isPopular ? "default" : "outline"} asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : isFree ? (
            <Button className="w-full rounded-full" variant="outline" asChild>
              <Link href="/sign-in">Get Started</Link>
            </Button>
          ) : (
            <CheckoutButton priceId={priceId} className="w-full rounded-full">
              {isPopular ? "Start Free Trial" : "Upgrade"}
            </CheckoutButton>
          )}
        </SignedIn>
        <SignedOut>
          <Button 
            className={`w-full rounded-full font-semibold h-12 ${isPopular ? "bg-brand-primary hover:bg-brand-primary/90" : ""}`}
            variant={isPopular ? "default" : "outline"}
            asChild
          >
            <Link href="/sign-in">{isFree ? "Start for Free" : "Start 14-day Trial"}</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export function PricingSection({ hasSubscription }: { hasSubscription: boolean }) {
  return (
    <section id="pricing" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-grid-neutral-100/50 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] dark:bg-grid-white/5" />
      
      <Container className="relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Start for free, upgrade when you need more power. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          <PricingCard
            title="Starter"
            price="0"
            description="Perfect for trying out the platform and joining existing communities."
            priceId=""
            hasSubscription={hasSubscription}
            features={[
              "Join unlimited groups",
              "Create 1 group",
              "Basic profile customization",
              "Community discussions"
            ]}
          />
          <PricingCard
            title="Community Leader"
            price="5"
            description="For organizers ready to build a serious following."
            priceId={env.NEXT_PUBLIC_PRICE_ID_BASIC}
            hasSubscription={hasSubscription}
            isPopular={true}
            features={[
              "Create up to 10 groups",
              "Advanced event scheduling",
              "Custom group branding",
              "Member analytics",
              "Priority support"
            ]}
          />
          <PricingCard
            title="Pro"
            price="10"
            description="Ultimate toolkit for large organizations and power users."
            priceId={env.NEXT_PUBLIC_PRICE_ID_PREMIUM}
            hasSubscription={hasSubscription}
            features={[
              "Unlimited groups",
              "Private/Secret groups",
              "API access",
              "White-label options",
              "Dedicated account manager"
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
