import Container from "@/components/container";
import { UserPlus, Users, CalendarCheck } from "lucide-react";

export function StackSection() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Account",
      description:
        "Sign up in seconds. Choose your interests and set up your profile to let others know what you're about.",
    },
    {
      number: "02",
      icon: Users,
      title: "Join a Group",
      description:
        "Browse active communities or start your own. Find the perfect niche that matches your passion.",
    },
    {
      number: "03",
      icon: CalendarCheck,
      title: "Meet Up",
      description:
        "Attend events, join discussions, and build real relationships. The community is waiting for you.",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
            Simple Steps to Connection
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Getting started is easy. Here's how you can find your people today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-neutral-200 via-brand-primary/50 to-neutral-200 dark:from-neutral-800 dark:via-brand-primary/50 dark:to-neutral-800" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-background border-2 border-neutral-100 dark:border-neutral-800 shadow-xl flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary/50 transition-colors duration-300">
                  <div className="absolute -top-3 -right-3 bg-brand-primary text-white text-xs font-bold py-1 px-2 rounded-full">
                    {step.number}
                  </div>
                  <Icon className="w-10 h-10 text-brand-primary/80 group-hover:text-brand-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
