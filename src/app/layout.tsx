import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Statify",
  description: "This app gives you the possibility to check out your most listened-to artists, tracks, and genres over different time periods. Discover trends in your listening history, and compare your stats with friends!",
};

const onest = Onest({
  style: "normal",
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} antialiased`}
      >
        <Header></Header>
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 flex-col pb-4">
            {children} 
          </div>
        </div>
      </body>
    </html>
  );
}
