"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/provider";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const links = [
    { href: "/", label: t("navHome") },
    { href: "/learn", label: t("navLearn") },
    { href: "/missions", label: t("navMissions") },
    { href: "/awards", label: t("navAwards") },
    { href: "/settings", label: t("navSettings") },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-900/10 bg-white/90 backdrop-blur-md">
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)] pt-2">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="flex-1">
              <Link
                href={link.href}
                className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-bold tracking-wide transition sm:text-xs ${
                  active
                    ? "bg-teal-50 text-teal-800"
                    : "text-slate-500 hover:text-teal-700"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? "bg-orange-500" : "bg-transparent"
                  }`}
                />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
