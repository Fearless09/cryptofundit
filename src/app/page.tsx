"use client";

import Campaigns from "@/components/Campaigns";
import { Pagination } from "@/components/Pagination";
import Sort from "@/components/Sort";
import useGetCampaign from "@/hooks/useGetCampaign";
import usePagination from "@/hooks/usePagination";

function App() {
  const { campaigns, isLoading, sort, sortCampaigns } = useGetCampaign();
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
    <div className="relative">
      <Campaigns
        title="All Campaigns"
        campaigns={campaigns?.slice(startIndex, endIndex)}
        isLoading={isLoading}
        length={campaigns?.length}
      />
      {!isLoading && (
        <>
          <Sort sort={sort} onSort={sortCampaigns} />
          {showPagination && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
