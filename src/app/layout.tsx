import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { getConfig } from "../wagmi";
import { Providers } from "./providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

const { name, title, description, url, openImg, icon, keywords, authors } = {
  name: "CrowdFundIt",
  title: "CrowdFundIt: Decentralized Crowdfunding on Sepolia",
  description:
    "CrowdFundIt is a decentralized crowdfunding platform built on the Sepolia network, empowering creators to launch campaigns and supporters to donate securely using blockchain technology.",
  keywords: [
    "Web3",
    "Crowdfunding",
    "Sepolia",
    "Decentralized",
    "Blockchain",
    "Crypto",
  ],
  authors: [{ name: "Ajayi, Toheeb Opeyemi", url: "toheebopeyemi9@gmail.com" }],
  icon: "/assets/logo.svg",
  openImg: "/open-img.webp",
  url: "https://crowdfundit.vercel.app",
};

export const metadata: Metadata = {
  title,
  description,
  keywords,
  authors,
  icons: [
    { rel: "icon", url: icon },
    { rel: "apple-touch-icon", url: icon },
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: name,
    locale: "en_US",
    type: "website",
    images: url + openImg,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: url + openImg,
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie"),
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers initialState={initialState}>
            <Toaster />
            <div className="bg-131313 dark:bg-131313-dark dark:text-white-dark relative flex min-h-dvh p-4 text-white md:p-8">
              <div className="relative mr-7 hidden sm:flex md:mr-10">
                <Sidebar />
              </div>

              <div className="relative mx-auto w-full flex-1 sm:max-w-[1280px] sm:pr-5">
                <Navbar />
                {props.children}
              </div>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
