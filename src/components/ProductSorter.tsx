"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export default function ProductSorter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSortUrlChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortValue === "default") {
      params.delete("sort");
    } else {
      params.set("sort", sortValue);
    }
    // Reset to page 1 when changing sort order
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Select onValueChange={handleSortUrlChange}>
        <SelectTrigger className="cursor-pointer">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
