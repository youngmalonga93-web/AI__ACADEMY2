import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    description:
      "Best for visitors who want to test the value before creating an account.",
    features: [
      "Free access to the starter prompt set",
      "Course catalog preview",
      "Module 1 sample lessons",
      "No credit card required",
    ],
    cta: "Start free",
    href: "/prompts",
    badge: "Free prompts",
    planId: null,
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "per month",
    description:
      "The main learner plan for becoming a practical AI operator and builder.",
    features: [
      "7-day free trial",
      "Full course library",
      "Full prompt vault",
      "AI Coach access",
      "Progress tracking",
      "Worksheets and portfolio labs",
      "Certificates when exams launch",
    ],
    cta: "Start 7-day trial",
    href: "/signup",
    badge: "Recommended",
    planId: "pro",
  },
  {
    name: "Builder",
    price: "$99",
    cadence: "per month",
    description:
      "For founders, consultants, and professionals building AI products or client systems.",
    features: [
      "Everything in Pro",
      "Advanced system design modules",
      "Founder and product build templates",
      "RAG and agent build paths",
      "Priority AI coach roadmap access",
    ],
    cta: "Start trial",
    href: "/signup",
    badge: "High intent",
    planId: "builder",
  },
  {
    name: "Team",
    price: "Custom",
    cadence: "annual",
    description:
      "For companies that want AI training, internal playbooks, and team reporting.",
    features: [
      "Team seats",
      "Admin reporting",
      "Private cohort onboarding",
      "Custom training paths",
      "Security review and procurement support",
    ],
    cta: "Prepare team plan",
    href: "/careers",
    badge: "B2B",
    planId: null,
  },
] as const;

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <Badge>Pricing</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Simple pricing before paid checkout opens.
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Start with a free prompt taste and a 7-day Pro trial experience.
          Checkout is intentionally paused while testers review the complete
          learning product.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.name === "Pro" ? "border-foreground" : undefined}
          >
            <CardHeader>
              <Badge>{plan.badge}</Badge>
              <CardTitle>{plan.name}</CardTitle>
              <div>
                <span className="text-3xl font-semibold">{plan.price}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {plan.cadence}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm leading-6 text-muted-foreground">
                {plan.description}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full"
                variant={plan.name === "Pro" ? "default" : "secondary"}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paid Access Status</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground md:grid-cols-3">
          <p>
            Stripe code is prepared, but checkout is paused until the tester QA
            pass confirms navigation, auth, lessons, prompts, and AI Coach.
          </p>
          <p>
            Test users can create accounts, use the curriculum, save progress,
            open the prompt vault, and try Google login before payment setup.
          </p>
          <p>
            When Stripe is enabled, the Pro and Builder buttons can switch back
            to Checkout with a 7-day trial and customer portal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
