import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { I18nProvider } from "@/i18n/provider";
import { ProgressProvider } from "@/lib/progress";
import { getToken } from "@/lib/auth-server";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

const display = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kampung Kids | Culture, Manners & Character",
  description:
    "A Singapore kids app that teaches culture, manners, and character — then rewards real-world proof.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kampung Kids",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();

  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ConvexClientProvider initialToken={token}>
          <I18nProvider>
            <ProgressProvider>
              <AppShell>{children}</AppShell>
            </ProgressProvider>
          </I18nProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
