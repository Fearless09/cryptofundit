"use client";

import Campaigns from "@/components/Campaigns";
import { Pagination } from "@/components/Pagination";
import useGetCampaign from "@/hooks/useGetCampaign";
import usePagination from "@/hooks/usePagination";

function App() {
  const { campaigns, isLoading } = useGetCampaign();
  const {
    currentPage,
    handlePageChange,
    itemPerPage,
    totalPages,
    endIndex,
    startIndex,
    showPagination,
  } = usePagination(campaigns?.length);

  return (
    <>
      <Campaigns
        title="All Campaigns"
        campaigns={campaigns?.splice(startIndex, endIndex)}
        isLoading={isLoading}
      />
      {!isLoading && showPagination && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          itemsPerPage={itemPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default App;
