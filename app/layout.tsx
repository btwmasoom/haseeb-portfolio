import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haseeb Asif | Full Stack Developer",
  description: "Portfolio website showcasing my projects and skills as a full stack developer",
};

import { SettingsProvider } from "@/context/settings-context";
import SettingsPanel from "@/components/settings-panel";
import ChatWidget from "@/components/chat-widget";
import Preloader from "@/components/preloader";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <Preloader />
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <Footer />
            <SettingsPanel />
            <ChatWidget />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
