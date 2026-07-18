"use client";

import type { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken?: string | null;
}) {
  return (
    <ConvexBetterAuthProvider
      client={convex}
      // Better Auth's plugin inference is more specific than the component's
      // public union type; the client is created with the required convex plugin.
      authClient={authClient as never}
      initialToken={initialToken}
    >
      {children}
    </ConvexBetterAuthProvider>
  );
}
