import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export const waitlistTables = {
  Waitlist: defineTable({
    createdAt: v.string(),
    email: v.string(),
    name: v.string(),
  }),
};
