import Container from "@/components/container";
import { Building2, Users, Globe, Award } from "lucide-react";

export function CredabilitySection() {
  return (
    <section className="py-12 bg-neutral-50/50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Trusted by Communities
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Helping people connect and grow together in over 50 countries.
            </p>
          </div>
          
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Members", value: "10k+", icon: Users },
                { label: "Communities", value: "1,000+", icon: Building2 },
                { label: "Countries", value: "50+", icon: Globe },
                { label: "Rating", value: "4.9/5", icon: Award },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-2 mb-1 text-brand-primary">
                      <Icon className="w-5 h-5" />
                      <span className="font-bold text-2xl text-foreground">{stat.value}</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale opacity-60">
           {/* Replace with actual logos */}
           {["TechStart", "BookWorms", "HikeLife", "CodeCrew", "YogaFlow"].map((name) => (
             <div key={name} className="text-xl font-bold text-neutral-400 dark:text-neutral-600 flex items-center gap-2">
               <div className="w-6 h-6 rounded bg-current" />
               {name}
             </div>
           ))}
        </div>
      </Container>
    </section>
  );
}
