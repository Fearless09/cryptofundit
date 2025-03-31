import { contract_abi, contract_address } from "@/utils/constant";
import { CampaignType } from "@/utils/TypeScript";
import { bigIntToString } from "@/utils/utilities";
import { useState } from "react";
import { useReadContract } from "wagmi";

export type SortProps =
  | null
  | "nameAsc"
  | "nameDesc"
  | "deadlineAsc"
  | "deadlineDesc";

export default function useGetCampaign() {
  const { data, isLoading, refetch } = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "getCampaigns",
    scopeKey: "campaigns",
  });
  const [sort, setSort] = useState<SortProps>(null);

  const sortCampaigns = (sort: SortProps) => {
    setSort(sort);
  };

  const campaigns = (data as CampaignType[])?.map((campaign, index) => ({
    ...campaign,
    deadline: new Date(Number(campaign.deadline)),
    raisedAmount: bigIntToString(campaign.raisedAmount),
    targetAmount: bigIntToString(campaign.targetAmount),
    donations: campaign.donations.map((donation) => bigIntToString(donation)),
    cId: index,
  }));

  const sortedCampaigns = sort
    ? [...campaigns].sort((a, b) => {
        switch (sort) {
          case "nameAsc":
            return a.title.localeCompare(b.title);
          case "nameDesc":
            return b.title.localeCompare(a.title);
          case "deadlineAsc":
            return a.deadline.getTime() - b.deadline.getTime();
          case "deadlineDesc":
            return b.deadline.getTime() - a.deadline.getTime();
          default:
            return 0;
        }
      })
    : campaigns;

  return {
    isLoading,
    campaigns: sortedCampaigns,
    refetchCampaigns: refetch,
    sort,
    sortCampaigns,
  };
}
