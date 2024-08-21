import { query, mutation } from "./_generated/server";
import { v } from "convex/values";


// export const saveFormData = mutation(async ({ db }, formData) => {
//   await db.insert('form_data', formData);
// });

export const saveFormData = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existingUser = await ctx.db
      .query("formData")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("Email already exists.");
    }

    // If email doesn't exist, save the data
    await ctx.db.insert("formData", args);
  },
});
