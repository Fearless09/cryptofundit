"use client";

import Campaigns from "@/components/Campaigns";
import { Pagination } from "@/components/Pagination";
import Sort from "@/components/Sort";
import useGetCampaign from "@/hooks/useGetCampaign";
import usePagination from "@/hooks/usePagination";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const { campaigns, isLoading, sort, sortCampaigns } = useGetCampaign();

  const searchedCampaigns = campaigns?.filter((campaign) => {
    if (!title) return false;
    const searchWords = title.toLowerCase().split(/\s+/);
    const campaignWords = campaign.title.toLowerCase().split(/\s+/);

    return searchWords.some((searchWord) =>
      campaignWords.some((campaignWord) => campaignWord.includes(searchWord)),
    );
  });

  const {
    currentPage,
    handlePageChange,
    itemPerPage,
    totalPages,
    endIndex,
    startIndex,
    showPagination,
  } = usePagination(searchedCampaigns?.length);

  useEffect(() => {
    if (!isLoading && searchedCampaigns?.length === 0) notFound();
  }, [isLoading, searchedCampaigns]);

  return (
    <>
      <Campaigns
        title={`Search results for "${title}"`}
        campaigns={searchedCampaigns?.slice(startIndex, endIndex)}
        isLoading={isLoading}
        length={searchedCampaigns?.length}
      />
      {!isLoading && (
        <>
          <Sort sort={sort} onSort={sortCampaigns} />
          {showPagination && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              itemsPerPage={itemPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}
