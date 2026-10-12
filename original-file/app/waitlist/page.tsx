import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Rocket, Users } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";

export const dynamic = "force-dynamic";

const benefits = [
  {
    icon: Rocket,
    title: "Founding member pricing",
    body: "Lock in launch pricing for life. Prices go up when we open publicly — founding members never pay more.",
  },
  {
    icon: BrainCircuit,
    title: "Full platform on day one",
    body: "18 modules, the AI Coach, the production prompt vault, project reviews, and career guidance — everything, not a stripped beta.",
  },
  {
    icon: Users,
    title: "Shape what gets built",
    body: "Founding members vote on module priorities and get direct access to the team shaping the curriculum.",
  },
];

export default function WaitlistPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div className="space-y-4 text-center">
        <Badge>Founding members</Badge>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Learn AI the way operators actually use it.
        </h1>
        <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground">
          AI Academy is a practical training platform for founders, builders,
          and professionals — real workflows, an AI coach that reviews your
          work, and prompts you can steal for your job today. Join the
          waitlist for early access.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {benefits.map((benefit) => (
          <Card key={benefit.title}>
            <CardContent className="space-y-2 p-5">
              <benefit.icon className="h-5 w-5 text-foreground" />
              <p className="font-medium">{benefit.title}</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {benefit.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <WaitlistForm />
    </div>
  );
}
