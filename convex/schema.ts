import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  formData: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  }).index("by_email", ["email"]),
});
