import { defineSchema, defineTable } from "convex/server";
import { waitlistTables } from "./waitlist/schema";

export default defineSchema({
  ...waitlistTables,
  // ...your other tables, if any
});
