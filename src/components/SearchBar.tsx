"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import type { Product } from "~/server/db/schema";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
    } else {
      setIsLoading(true);

      const searchedFor = searchTerm;
      void fetch(`/api/search?q=${searchedFor}`)
        .then(async (res) => {
          const currentSearchTerm = inputRef.current?.value;
          if (currentSearchTerm !== searchedFor) return;

          const json = (await res.json()) as Product[];
          setIsLoading(false);
          setSearchResults(json);
        })
        .catch((error) => {
          console.error("Search failed:", error);
          setIsLoading(false);
          setSearchResults([]);
        });
    }
  }, [searchTerm, inputRef]);

  const params = useParams();
  useEffect(() => {
    if (!params.product) {
      setSearchTerm("");
    }
  }, [params]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1,
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      router.push(`/products/${searchResults[highlightedIndex]?.slug}`);
      setSearchTerm(searchResults[highlightedIndex]?.name ?? "");
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="font-sans" ref={dropdownRef}>
      <div className="relative flex-grow">
        <div className="relative">
          <Input
            ref={inputRef}
            autoCapitalize="off"
            autoCorrect="off"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(e.target.value.length > 0);
              setHighlightedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            className="pr-12 font-sans font-medium sm:w-[300px] md:w-[375px]"
          />
          <X
            className={cn(
              "text-muted-foreground absolute top-2 right-7 h-5 w-5",
              {
                hidden: !isOpen,
              },
            )}
            onClick={() => {
              setSearchTerm("");
              setIsOpen(false);
            }}
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full border border-gray-200 bg-white shadow-lg">
            <ScrollArea className="h-[300px]">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <Link
                    href={`/products/${item.slug}`}
                    key={item.slug}
                    prefetch={true}
                  >
                    <div
                      className={cn("flex cursor-pointer items-center p-2", {
                        "bg-gray-100": index === highlightedIndex,
                      })}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onClick={() => {
                        setSearchTerm(item.name);
                        setIsOpen(false);
                        inputRef.current?.blur();
                      }}
                    >
                      <Image
                        loading="eager"
                        decoding="sync"
                        src={item.imageUrl ?? "/placeholder.svg"}
                        alt=""
                        className="h-10 w-10 pr-2"
                        height={40}
                        width={40}
                        quality={65}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  </Link>
                ))
              ) : isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-500">Loading...</p>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-500">No results found</p>
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
