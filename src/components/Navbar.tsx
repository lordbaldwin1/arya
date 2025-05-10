"use client";

import Link from "next/link";
import { LightModeToggle } from "./LightModeToggle";
import { ShoppingBagIcon, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Search } from "./Search";
import { useState } from "react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <>
      {isSearchOpen ? (
        <Search isOpen={isSearchOpen} handleOpenSearch={handleOpenSearch} />
      ) : (
        <NonSearchNavbar
          isSearchOpen={isSearchOpen}
          handleOpenSearch={handleOpenSearch}
        />
      )}
    </>
  );
}

export function NonSearchNavbar({
  isSearchOpen,
  handleOpenSearch,
}: {
  isSearchOpen: boolean;
  handleOpenSearch: () => void;
}) {
  return (
    <div className="my-4 w-full">
      <div className="mx-4 flex items-center justify-between lg:mx-24">
        <div className="hidden items-baseline justify-center gap-4 md:flex lg:flex">
          <Link
            prefetch={true}
            className="text-md font-semibold hover:text-gray-500"
            href="/categories"
          >
            Categories
          </Link>
          <Link
            prefetch={true}
            className="text-md font-semibold hover:text-gray-500"
            href="/all"
          >
            Shop All
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            className="md:hidden lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="text-md flex flex-col"
            aria-label="Navigation menu"
            role="dialog"
            aria-modal="true"
          >
            <SheetHeader className="flex-1">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Use this menu to navigate through different sections of the
                website
              </SheetDescription>
              <SheetClose asChild aria-label="Close navigation menu">
                <Link prefetch={true} href="/">
                  <button className="tracking-wider transition-colors hover:text-muted-foreground">
                    HOME
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild aria-label="Close navigation menu">
                <Link prefetch={true} href="/all">
                  <button className="tracking-wider transition-colors hover:text-muted-foreground">
                    ALL PRODUCTS
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild aria-label="Close navigation menu">
                <Link prefetch={true} href="/categories">
                  <button className="tracking-wider transition-colors hover:text-muted-foreground">
                    CATEGORIES
                  </button>
                </Link>
              </SheetClose>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="absolute left-1/2 -translate-x-1/2 items-center justify-center gap-4">
          <Link
            prefetch={true}
            className="text-2xl font-bold"
            href="/"
          >
            Arya
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Search isOpen={isSearchOpen} handleOpenSearch={handleOpenSearch} />
          <Link prefetch={true} className="hover:text-muted-foreground" href="/cart">
            <ShoppingBagIcon className="h-5 w-5" />
          </Link>
          <LightModeToggle />
        </div>
      </div>
    </div>
  );
}
