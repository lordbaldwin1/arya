import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { Suspense } from "react";
import Link from "next/link";

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
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          {children}
          <footer className="flex items-center justify-center border-t mt-16">
            <div className="container px-4 py-6 md:px-6 md:py-8">
              <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Shop</h3>
                  <ul className="grid gap-2 text-sm">
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Best Sellers
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Sale
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">About</h3>
                  <ul className="grid gap-2 text-sm">
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Sustainability
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Support</h3>
                  <ul className="grid gap-2 text-sm">
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Shipping & Returns
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Connect</h3>
                  <ul className="grid gap-2 text-sm">
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Twitter
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={true}
                        href="#"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Facebook
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <div className="flex items-center justify-center">
                  <p className="text-sm text-gray-500">
                    © 2025 Arya Jewelry. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
