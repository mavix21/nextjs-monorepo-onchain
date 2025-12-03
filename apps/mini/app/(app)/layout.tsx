import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import { minikitConfig } from "@/minikit.config";

import { OnchainKitClientProvider } from "./_providers/onchainkit.provider";

import "@myapp/ui/globals.css";
import "@silk-hq/components/layered-styles.css";

import { preconnect } from "react-dom";

import { AuthProvider } from "@/app/_contexts/auth-context";
import { MiniAppProvider } from "@/app/_contexts/miniapp-context";
import { ConvexClientProvider } from "@/app/_providers/convex-cllient.provider";
import { BottomNav } from "@/widgets/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return Promise.resolve({
    title: minikitConfig.frame.name,
    description: minikitConfig.frame.description,
    other: {
      "fc:frame": JSON.stringify({
        version: minikitConfig.frame.version,
        imageUrl: minikitConfig.frame.heroImageUrl,
        button: {
          title: `Launch ${minikitConfig.frame.name}`,
          action: {
            name: `Launch ${minikitConfig.frame.name}`,
            type: "launch_frame",
          },
        },
      }),
    },
  });
}

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceCodePro = Sora({
  variable: "--font-acc",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode;
  sheet: React.ReactNode;
}>) {
  preconnect("https://auth.farcaster.xyz");

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceCodePro.variable} font-sans antialiased`}
      >
        <OnchainKitClientProvider>
          <MiniAppProvider>
            <ConvexClientProvider>
              <AuthProvider>
                {children}
                {sheet}
                <BottomNav />
              </AuthProvider>
            </ConvexClientProvider>
          </MiniAppProvider>
        </OnchainKitClientProvider>
      </body>
    </html>
  );
}
