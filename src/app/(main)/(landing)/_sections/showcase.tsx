import Container from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, ArrowUpRight } from "lucide-react";

export function ShowcaseSection() {
  const featuredGroups = [
    {
      name: "Mountain Hikers Club",
      category: "Adventure",
      members: 342,
      location: "San Francisco",
      imageColor: "bg-emerald-500",
    },
    {
      name: "Book Worms Society",
      category: "Literature",
      members: 1289,
      location: "New York",
      imageColor: "bg-blue-500",
    },
    {
      name: "Tech Startup Founders",
      category: "Business",
      members: 567,
      location: "Austin",
      imageColor: "bg-purple-500",
    },
    {
      name: "Yoga & Mindfulness",
      category: "Wellness",
      members: 892,
      location: "Portland",
      imageColor: "bg-orange-500",
    },
    {
      name: "Photography Enthusiasts",
      category: "Creative",
      members: 456,
      location: "Los Angeles",
      imageColor: "bg-indigo-500",
    },
    {
      name: "Cooking Club",
      category: "Food",
      members: 723,
      location: "Chicago",
      imageColor: "bg-rose-500",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
              Discover Popular Groups
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Join thousands of active communities. Find your next adventure.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/browse" className="group">
              View All Groups 
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGroups.map((group, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-neutral-200 dark:border-neutral-800 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className={`h-40 ${group.imageColor} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur">
                    {group.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-brand-primary transition-colors">
                  {group.name}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {group.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {group.members.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Button } from "@/components/ui/button";
