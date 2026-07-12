"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* PWA registration is best-effort */
    });
  }, []);

  return null;
}

export function OfflineBanner({
  offlineLabel,
  onlineLabel,
}: {
  offlineLabel: string;
  onlineLabel: string;
}) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (online) return null;

  return (
    <div
      className="relative z-20 mx-auto mb-2 w-full max-w-3xl rounded-2xl bg-slate-800 px-4 py-2 text-center text-xs font-bold text-white"
      role="status"
      aria-live="polite"
      title={onlineLabel}
    >
      {offlineLabel}
    </div>
  );
}
