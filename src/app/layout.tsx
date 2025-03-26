import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "Arya",
  description: "Arya Jewelry",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
