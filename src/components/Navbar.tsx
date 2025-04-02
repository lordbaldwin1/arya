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
            className="text-md font-semibold hover:text-gray-500"
            href="/categories"
          >
            Categories
          </Link>
          <Link
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
                  <button className="tracking-wider transition-colors hover:text-gray-600">
                    HOME
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link prefetch={true} href="/products">
                  <button className="tracking-wider transition-colors hover:text-gray-600">
                    SHOP ALL
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link prefetch={true} href="/collections">
                  <button className="tracking-wider transition-colors hover:text-gray-600">
                    COLLECTIONS
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link prefetch={true} href="/categories">
                  <button className="tracking-wider transition-colors hover:text-gray-600">
                    CATEGORIES
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  prefetch={true}
                  href="/wishlist"
                  className="transition-colors hover:text-gray-600"
                >
                  WISHLIST
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  prefetch={true}
                  href="/cart"
                  className="transition-colors hover:text-gray-600"
                >
                  CART
                </Link>
              </SheetClose>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="absolute left-1/2 -translate-x-1/2 items-center justify-center gap-4">
          <Link className="text-2xl font-bold hover:text-gray-500" href="/">
            Arya
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Search isOpen={isSearchOpen} handleOpenSearch={handleOpenSearch} />
          <Link className="hover:text-gray-500" href="/cart">
            <ShoppingBagIcon className="h-5 w-5" />
          </Link>
          <LightModeToggle />
        </div>
      </div>
    </div>
  );
}
