import { z } from "zod";

// Shared waitlist validation. Lives in lib (not the route file) so unit
// tests can import it without pulling in next/server.
export const waitlistSchema = z.object({
  email: z.string().email().max(320),
  name: z.string().max(120).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
