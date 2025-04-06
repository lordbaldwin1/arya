"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "~/components/ui/pagination";

export default function PaginationControls(props: {
  currentPage: number;
  totalPages: number;
  sortOption: string;
  itemsPerPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  if (props.totalPages <= 1) {
    return (
      <div className="flex justify-center mt-16">
        <p className="text-gray-500">No more products to show.</p>
      </div>
    );
  }

  const { currentPage, totalPages, sortOption, itemsPerPage } = props;
  const currentPageNum = Number(currentPage);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (sortOption !== "default") {
      params.set("sort", sortOption);
    } else {
      params.delete("sort");
    }
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Add ellipsis and current page if needed
    if (currentPageNum > 2) {
      pages.push("...");
    }
    if (currentPageNum !== 1 && currentPageNum !== totalPages) {
      pages.push(currentPageNum);
    }

    // Add ellipsis and last page if needed
    if (currentPageNum < totalPages - 1) {
      pages.push("...");
    }
    // Only show last page if it's different from first page
    if (totalPages !== 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <Pagination className="my-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPageNum > 1 ? createPageUrl(currentPageNum - 1) : "#"}
              aria-disabled={currentPageNum <= 1}
              className={currentPageNum <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href={createPageUrl(page as number)}
                  isActive={page === currentPageNum}
                  className={page === currentPageNum ? "bg-secondary" : ""}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href={currentPageNum < totalPages ? createPageUrl(currentPageNum + 1) : "#"}
              aria-disabled={currentPageNum >= totalPages}
              className={currentPageNum >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
