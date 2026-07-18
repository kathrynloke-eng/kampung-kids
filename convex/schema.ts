import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  progress: defineTable({
    ownerId: v.string(),
    state: v.any(),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerId"]),
});
