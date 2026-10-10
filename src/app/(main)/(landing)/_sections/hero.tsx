import { SignedIn, SignedOut } from "@/components/auth";
import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-28 pb-16 md:pb-20 lg:pb-28">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-neutral-200/20 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-white/5" />
      <div className="absolute -left-[10%] top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 blur-[100px] opacity-50" />
      <div className="absolute -right-[10%] bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-brand-secondary/20 to-brand-primary/20 blur-[100px] opacity-50" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary/20 backdrop-blur-sm px-4 py-1.5 text-sm rounded-full transition-colors">
            <Sparkles className="w-3.5 h-3.5 mr-2 fill-brand-primary" />
            The Community Platform for Creators
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-8">
            Find Your People. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              Build Real Connections.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-2xl mb-10 leading-relaxed">
            Connect with like-minded people, organize meetups, and grow your community. 
            The all-in-one platform for meaningful social groups.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <SignedIn>
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20 transition-all hover:scale-105" asChild>
                <Link href={"/dashboard"}>
                  <Users className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            </SignedIn>

            <SignedOut>
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20 transition-all hover:scale-105" asChild>
                <Link href={"/sign-in"}>
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all" asChild>
                <Link href={"/browse"}>Explore Groups</Link>
              </Button>
            </SignedOut>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <Image 
                    src={`/profile.png`} 
                    alt="User" 
                    width={32} 
                    height={32} 
                    className="opacity-80"
                  />
                </div>
              ))}
            </div>
            <p>Join <span className="font-bold text-foreground">10,000+</span> members today</p>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm p-2 shadow-2xl lg:rounded-2xl">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden aspect-[16/9] relative bg-neutral-100 dark:bg-neutral-800">
               <Image
                className="object-cover"
                fill
                src="/computer.jpeg"
                alt="Platform Preview"
                priority
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -left-4 top-1/4 p-4 bg-background rounded-xl shadow-xl border border-neutral-100 dark:border-neutral-800 animate-bounce duration-[3000ms] hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-status-success/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-status-success" />
              </div>
              <div>
                <p className="text-sm font-bold">New Member</p>
                <p className="text-xs text-neutral-500">Just joined Hiking Club</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
