import Link from "next/link";
import { LightModeToggle } from "./LightModeToggle";
import { ShoppingBagIcon, Search } from "lucide-react";

export default async function Navbar() {
  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between lg:mx-24">
        <div className="flex items-baseline justify-center gap-4">
          <Link className="hover:text-gray-500 text-sm font-semibold" href="/categories">
            Categories
          </Link>
          <Link className="hover:text-gray-500 text-sm font-semibold" href="/all">
            Shop All
          </Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 items-center justify-center gap-4">
          <Link className="text-2xl font-bold hover:text-gray-500" href="/">
            Arya
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Search className="h-6 w-6" />
          <Link className="hover:text-gray-500" href="/cart">
            <ShoppingBagIcon className="h-6 w-6" />
          </Link>
          <LightModeToggle />
        </div>
      </div>
    </div>
  );
}
