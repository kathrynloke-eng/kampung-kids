import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

async function ownerId(ctx: { auth: { getUserIdentity: () => Promise<{ subject: string } | null> } }) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Authentication is required.");
  return identity.subject;
}

export const getMine = query({
  args: {},
  handler: async (ctx) => {
    const owner = await ownerId(ctx);
    return await ctx.db
      .query("progress")
      .withIndex("by_owner", (q) => q.eq("ownerId", owner))
      .unique();
  },
});

export const saveMine = mutation({
  args: { state: v.any() },
  handler: async (ctx, args) => {
    const owner = await ownerId(ctx);
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_owner", (q) => q.eq("ownerId", owner))
      .unique();
    const value = { ownerId: owner, state: args.state, updatedAt: Date.now() };
    if (existing) await ctx.db.patch(existing._id, value);
    else await ctx.db.insert("progress", value);
  },
});
