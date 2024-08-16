import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { validateSessionAndRefreshLastActive } from "./waitlist/write";

export const addToWaitlist = mutation({
  args: {
    sessionId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await validateSessionAndRefreshLastActive(ctx, args.sessionId);
    // Add user to waitlist
  },
});
