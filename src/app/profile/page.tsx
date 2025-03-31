"use client";

import Campaigns from "@/components/Campaigns";
import { Pagination } from "@/components/Pagination";
import Sort from "@/components/Sort";
import useGetCampaign from "@/hooks/useGetCampaign";
import usePagination from "@/hooks/usePagination";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

export default function ProfilePage() {
  const { campaigns, isLoading, sort, sortCampaigns } = useGetCampaign();
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
  }, [isConnected]);

  const myCampaign = isConnected
    ? campaigns?.filter((c) => c.owner === address)
    : [];

  const {
    currentPage,
    handlePageChange,
    itemPerPage,
    totalPages,
    endIndex,
    startIndex,
    showPagination,
  } = usePagination(myCampaign?.length);

  return (
    <div className="relative">
      <Campaigns
        title="My Campaigns"
        campaigns={myCampaign?.slice(startIndex, endIndex)}
        isLoading={isLoading}
        length={myCampaign?.length}
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
