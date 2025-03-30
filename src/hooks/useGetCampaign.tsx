import { contract_abi, contract_address } from "@/utils/constant";
import { CampaignType } from "@/utils/TypeScript";
import { bigIntToString } from "@/utils/utilities";
import { useReadContract } from "wagmi";

export default function useGetCampaign() {
  const { data, isLoading, refetch } = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "getCampaigns",
    scopeKey: "campaigns",
  });

  return {
    isLoading,
    campaigns: (data as CampaignType[])?.map((campaign, index) => ({
      ...campaign,
      deadline: new Date(Number(campaign.deadline)),
      raisedAmount: bigIntToString(campaign.raisedAmount),
      targetAmount: bigIntToString(campaign.targetAmount),
      donations: campaign.donations.map((donation) => bigIntToString(donation)),
      cId: index,
    })),
    refetchCampaigns: refetch,
  };
}
