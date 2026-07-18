"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/provider";

const icons: Record<string, string> = {
  "/": "🏠",
  "/learn": "📖",
  "/missions": "🚀",
  "/rewards": "🎁",
  "/awards": "🏆",
};

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const links = [
    { href: "/", label: t("navHome") },
    { href: "/learn", label: t("navLearn") },
    { href: "/missions", label: t("navMissions") },
    { href: "/rewards", label: t("navTreats") },
    { href: "/awards", label: t("navAwards") },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <ul className="mx-auto flex max-w-lg items-stretch justify-around gap-1 rounded-[1.75rem] bg-white/95 px-2 py-2 shadow-[0_-8px_40px_rgba(15,118,110,0.15)] outline outline-2 outline-white/80 backdrop-blur-md">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="flex-1">
              <Link
                href={link.href}
                className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-extrabold tracking-wide transition sm:text-[11px] ${
                  active ? "text-teal-800" : "text-slate-500 hover:text-teal-700"
                }`}
              >
                <span
                  className={`nav-bubble ${active ? "nav-bubble-active" : "bg-teal-50"}`}
                  aria-hidden
                >
                  {icons[link.href]}
                </span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
