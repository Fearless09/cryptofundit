"use client";

import { ComponentProps, FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/utilities";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalPages,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("Scroll", page);
  };

  const renderPageButtons = () => {
    const buttons = [];

    // Always show first page
    buttons.push(
      <Button
        key="page-1"
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
        aria-current={currentPage === 1 ? "page" : undefined}
      >
        1
      </Button>,
    );

    // Calculate range of pages to show
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Show ellipsis if needed before middle pages
    if (startPage > 2) {
      buttons.push(
        <span key="ellipsis-1" className="px-2">
          ...
        </span>,
      );
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={`page-${i}`}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </Button>,
      );
    }

    // Show ellipsis if needed after middle pages
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis-2" className="px-2">
          ...
        </span>,
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      buttons.push(
        <Button
          key={`page-${totalPages}`}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
          aria-current={currentPage === totalPages ? "page" : undefined}
        >
          {totalPages}
        </Button>,
      );
    }

    return buttons;
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="mx-auto mt-10 flex w-full justify-center"
    >
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          // disabled={currentPage === 1}
          aria-label="Go to previous page"
          className={cn({
            "cursor-not-allowed": currentPage === 1,
          })}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="flex items-center gap-2">{renderPageButtons()}</div>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          // disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className={cn({
            "cursor-not-allowed": currentPage === totalPages,
          })}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  active?: boolean;
};

const Button: FC<ButtonProps> = ({ className, active, ...props }) => {
  return (
    <button
      className={cn(
        "transition-300 dark:text-white-dark border-3a3a43 dark:border-3a3a43-dark flex size-9 cursor-pointer items-center justify-center rounded-md border text-sm font-medium text-white backdrop-blur-md disabled:cursor-not-allowed",
        className,
        {
          "bg-4acd8d text-white-dark border-0": active,
        },
      )}
      {...props}
    />
  );
};
