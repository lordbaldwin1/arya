"use client";
import { usePathname } from "next/navigation";
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
  if (props.totalPages <= 1) {
    return (
      <div className="flex justify-center mt-4 mb-4">
        <p className="text-gray-500">No more products to show.</p>
      </div>
    );
  }

  const { currentPage, totalPages, sortOption, itemsPerPage } = props;

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

    if (Number(currentPage) !== 1) {
      pages.push(1);
    }

    if (currentPage > 2) {
      pages.push("...");
      pages.push(currentPage - 1);
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    if (currentPage < totalPages - 2) {
      pages.push(Number(currentPage) + 1);
      pages.push("...");
    } else if (currentPage < totalPages - 1) {
      pages.push(Number(currentPage) + 1);
    }

    if (Number(currentPage) !== totalPages) {
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
            href={currentPage > 1 ? createPageUrl(Number(currentPage) - 1) : "#"}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
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
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageUrl(Number(currentPage) + 1) : "#"
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </>
  );
}
