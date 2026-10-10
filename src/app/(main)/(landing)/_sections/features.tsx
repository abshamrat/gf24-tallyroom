import Container from "@/components/container";
import {
  MessageSquare,
  Calendar,
  Users,
  Shield,
  Bell,
  Search,
  Settings,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Group Chat",
      description:
        "Real-time messaging built for communities. Threads, reactions, and direct messages keep the conversation flowing.",
    },
    {
      icon: Calendar,
      title: "Event Scheduling",
      description:
        "Create recurring meetups, manage RSVPs, and sync with calendars. Never miss a hangout again.",
    },
    {
      icon: Users,
      title: "Member Roles",
      description:
        "Assignable roles and permissions. Give your moderators the tools they need to keep the community safe.",
    },
    {
      icon: Shield,
      title: "Private Spaces",
      description:
        "Create invite-only groups for exclusive content or intimate discussions. You control access.",
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description:
        "Find the right group based on location, interests, and activity level. Connect with local peers.",
    },
    {
      icon: Bell,
      title: "Notifications",
      description:
        "Customizable alerts for events and mentions. Stay in the loop without getting overwhelmed.",
    },
    {
      icon: Settings,
      title: "Custom Branding",
      description:
        "Make your group feel like home with custom banners, colors, and welcome messages.",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description:
        "Changes update instantly across all devices. Seamless experience on mobile and desktop.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-neutral-50 dark:bg-neutral-950/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
            Everything You Need to Build <br />
            <span className="text-brand-primary">Thriving Communities</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Powerful tools designed to help you connect, organize, and grow your group without the headache.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-neutral-200 dark:border-neutral-800 bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 bg-neutral-100 dark:bg-neutral-900 text-brand-primary"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
