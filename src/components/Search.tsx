"use client";

import { Search as SearchIcon, X as XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Product } from "~/server/db/schema";
import { cn } from "~/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

export function Search({
  isOpen,
  handleOpenSearch,
}: {
  isOpen: boolean;
  handleOpenSearch: () => void;
}) {
  return (
    <div>
      {isOpen ? (
        <SearchNavBar isOpen={isOpen} handleOpenSearch={handleOpenSearch} />
      ) : (
        <Button variant="ghost" size="icon" onClick={handleOpenSearch}>
          <SearchIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export function SearchNavBar({
  isOpen,
  handleOpenSearch,
}: {
  isOpen: boolean;
  handleOpenSearch: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      router.push(`/product/${searchResults[highlightedIndex]?.slug}`);
      setSearchTerm(searchResults[highlightedIndex]?.name ?? "");
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="my-4 w-full">
      <div className="flex items-center justify-center lg:mx-24">
        <div className="relative flex items-center justify-center gap-4">
          <Input
            ref={inputRef}
            autoCapitalize="off"
            autoCorrect="off"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(e.target.value.length > 0);
              setHighlightedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setTimeout(() => {
                setIsDropdownOpen(false);
              }, 200);
            }}
            className="pr-12 font-sans font-medium sm:w-[300px] md:w-[375px]"
          />
          <XIcon
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer",
              {
                "hidden": searchTerm.length === 0,
              },
            )}
            onClick={() => {
              setSearchTerm("");
              setIsDropdownOpen(false);
            }}
          />
          {isDropdownOpen && (
            <div 
              ref={dropdownRef}
              className="absolute left-0 top-full z-10 w-full max-w-[375px] border border-border bg-background shadow-lg mt-1"
            >
              <ScrollArea className="h-[300px]">
                <div className="h-full">
                  {searchResults.length > 0 ? (
                    searchResults.map((item, index) => (
                      <Link href={`/product/${item.slug}`} key={item.slug} prefetch={true}>
                        <div
                          className={cn("flex cursor-pointer items-center p-2", {
                            "bg-accent": index === highlightedIndex,
                          })}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          onClick={() => {
                            setSearchTerm(item.name);
                            setIsDropdownOpen(false);
                            handleOpenSearch();
                            inputRef.current?.blur();
                          }}
                        >
                          <Image
                            loading="eager"
                            decoding="sync"
                            src={item.imageUrl ?? "/placeholder.svg"}
                            alt=""
                            className="h-10 w-12 pr-2"
                            height={40}
                            width={40}
                            quality={65}
                          />
                          <span className="text-sm text-foreground">{item.name}</span>
                        </div>
                      </Link>
                    ))
                  ) : isLoading ? (
                    <div className="flex h-[300px] items-center justify-center">
                      <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                  ) : (
                    <div className="flex h-[300px] items-center justify-center">
                      <p className="text-sm text-muted-foreground">No results found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
        <Button
          className="ml-2"
          variant="ghost"
          size="icon"
          onClick={handleOpenSearch}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
