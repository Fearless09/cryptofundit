"use client";

import Campaigns from "@/components/Campaigns";
import useGetCampaign from "@/hooks/useGetCampaign";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const { campaigns, isLoading } = useGetCampaign();

  const searchedCampaigns = campaigns?.filter((campaign) => {
    if (!title) return false;
    const searchWords = title.toLowerCase().split(/\s+/);
    const campaignWords = campaign.title.toLowerCase().split(/\s+/);

    return searchWords.some((searchWord) =>
      campaignWords.some((campaignWord) => campaignWord.includes(searchWord)),
    );
  });

  useEffect(() => {
    if (!isLoading && searchedCampaigns?.length === 0) notFound();
  }, [isLoading, searchedCampaigns]);

  return (
    <Campaigns
      title={`Search results for "${title}"`}
      campaigns={searchedCampaigns}
      isLoading={isLoading}
    />
  );
}
