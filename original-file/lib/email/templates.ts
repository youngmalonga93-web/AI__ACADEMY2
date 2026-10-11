// HTML email templates for AI Academy. Inline styles only (email clients
// strip <style> tags). Each template returns { subject, html }.

export type EmailTemplate = {
  subject: string;
  html: string;
};

function layout(heading: string, body: string): string {
  return [
    `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">`,
    `<p style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #8a8a8a; margin: 0 0 16px;">AI Academy</p>`,
    `<h1 style="font-size: 24px; line-height: 1.3; margin: 0 0 16px;">${heading}</h1>`,
    body,
    `<hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0 16px;" />`,
    `<p style="font-size: 12px; color: #8a8a8a; margin: 0;">AI Academy — practical AI training for operators, builders, and founders.</p>`,
    `</div>`,
  ].join("\n");
}

function paragraph(text: string): string {
  return `<p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">${text}</p>`;
}

function cta(label: string, href: string): string {
  return `<p style="margin: 20px 0;"><a href="${href}" style="display: inline-block; background: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 600;">${label}</a></p>`;
}

export function welcomeEmail(name: string): EmailTemplate {
  return {
    subject: "Welcome to AI Academy — your 7-day trial starts now",
    html: layout(
      `Welcome aboard, ${name}.`,
      [
        paragraph(
          "Your account is ready and your 7-day trial has started. You now have full access to every course, the production prompt vault, and the AI Coach."
        ),
        paragraph(
          "Start here: open Module 1 and complete the first lesson. It takes about 20 minutes and gives you a working AI workflow you can use the same day."
        ),
        cta("Start Module 1", "/courses/1"),
        paragraph(
          "Questions? Just reply to this email — a human reads every one."
        ),
      ].join("\n")
    ),
  };
}

export function onboardingDay3Email(name: string): EmailTemplate {
  return {
    subject: `${name}, the prompt vault is your unfair advantage`,
    html: layout(
      "Don't sleep on the prompt vault.",
      [
        paragraph(
          "Most learners binge lessons and skip the vault. That's backwards — the vault holds production-grade prompts our team uses daily, ready to copy into your own work."
        ),
        paragraph(
          "Pick one prompt today, run it against a real task from your job or business, and save the result. That's the whole method: learn, apply, repeat."
        ),
        cta("Open the prompt vault", "/prompts"),
      ].join("\n")
    ),
  };
}

export function onboardingDay7Email(name: string): EmailTemplate {
  return {
    subject: "Your trial ends soon — here's what to do next",
    html: layout(
      "Make the trial count.",
      [
        paragraph(
          `${name}, your 7-day trial is almost over. The learners who get the most from AI Academy do one thing differently: they finish a project, not just lessons.`
        ),
        paragraph(
          "Open the project reviewer, describe something you're building, and let it tear your plan apart — kindly. You'll leave with a sharper plan than most paid consultants deliver."
        ),
        cta("Review my project", "/reviewer"),
        paragraph(
          "Stay on after the trial and keep everything: courses, coach, vault, and community. Cancel anytime."
        ),
      ].join("\n")
    ),
  };
}

export function trialEndingEmail(
  name: string,
  daysLeft: number
): EmailTemplate {
  const dayWord = daysLeft === 1 ? "day" : "days";
  return {
    subject: `${daysLeft} ${dayWord} left in your AI Academy trial`,
    html: layout(
      `Your trial ends in ${daysLeft} ${dayWord}.`,
      [
        paragraph(
          `Hi ${name} — quick heads-up that your trial wraps up soon. After that, courses and the AI Coach lock until you pick a plan.`
        ),
        paragraph(
          "If AI Academy has already saved you time or made you money, a subscription pays for itself. If it hasn't, reply and tell me why — I read everything."
        ),
        cta("See plans", "/pricing"),
      ].join("\n")
    ),
  };
}

export function paymentReceiptEmail(
  name: string,
  plan: string,
  amount: string
): EmailTemplate {
  return {
    subject: `Your AI Academy receipt — ${plan} (${amount})`,
    html: layout("Payment confirmed.", [
      paragraph(
        `Thanks, ${name}. Your payment of <strong>${amount}</strong> for the <strong>${plan}</strong> plan went through.`
      ),
      paragraph(
        "Your receipt is attached to this email by our payment provider. You can manage your subscription anytime from your dashboard."
      ),
      cta("Go to dashboard", "/dashboard"),
    ]),
  };
}

export function waitlistConfirmationEmail(email: string): EmailTemplate {
  return {
    subject: "You're on the AI Academy waitlist",
    html: layout(
      "You're in line.",
      [
        paragraph(
          `Thanks for joining the waitlist with <strong>${email}</strong>. Founding members get early access and locked-in launch pricing.`
        ),
        paragraph(
          "We'll email you the moment your invite is ready. Meanwhile, the best way to prepare is to start thinking about one AI workflow you want working in your life or business."
        ),
        paragraph("Talk soon."),
      ].join("\n")
    ),
  };
}
