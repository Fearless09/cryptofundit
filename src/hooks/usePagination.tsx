import { useState, useMemo, useCallback } from "react";

interface PaginationState {
  currentPage: number;
  itemPerPage: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  showPagination: boolean;
}

interface PaginationControls {
  handlePageChange: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export default function usePagination(
  totalItems: number,
  itemPerPage: number = 8,
): PaginationState & PaginationControls {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemPerPage);

  // Memoize pagination state
  const paginationState = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = Math.min(currentPage * itemPerPage, totalItems);

    return {
      currentPage,
      itemPerPage,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [currentPage, itemPerPage, totalItems, totalPages]);

  // Memoize navigation handlers
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) {
        return;
      }
      setCurrentPage(page);
    },
    [totalPages],
  );

  const goToNextPage = useCallback(() => {
    if (paginationState.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [paginationState.hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (paginationState.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [paginationState.hasPreviousPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  return {
    ...paginationState,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    showPagination: totalItems-1 > itemPerPage,
  };
}
