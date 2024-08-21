import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new email address with the given text
// selected internalMutation for extra security for now
export const createEmails = internalMutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const newEmailId = await ctx.db.insert("emails", { text: args.text });
    return newEmailId;
  },
});
