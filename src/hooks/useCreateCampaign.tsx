import { contract_abi, contract_address } from "@/utils/constant";
import { useState } from "react";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import { parseEther } from "ethers";

type CreateCampaignProps = {
  title: string;
  description: string;
  targetAmount: number;
  deadline: string;
  imageUrl: string;
};

export default function useCreateCampaign() {
  const [campaignDetails, setCampaignDetails] = useState<CreateCampaignProps>({
    title: "",
    description: "",
    targetAmount: 0,
    deadline: "",
    imageUrl: "",
  });
  const { writeContractAsync, data, error, writeContract } = useWriteContract();

  function handleCampaignChange(key: string, value: string | number) {
    const processedValue = ["targetAmount"].includes(key)
      ? Number(value)
      : value;
    setCampaignDetails((prev) => ({
      ...prev,
      [key]: processedValue,
    }));
  }

  async function createCampaignAsync({
    title,
    deadline,
    targetAmount,
    description,
    imageUrl,
  }: CreateCampaignProps) {
    if (!title || !deadline || !targetAmount || !description || !imageUrl) {
      toast.error("Please fill all field");
      return;
    }
    return toast.promise(
      writeContractAsync({
        abi: contract_abi,
        address: contract_address,
        functionName: "createCampaign",
        args: [
          title,
          description,
          parseEther(targetAmount.toString()),
          new Date(deadline).getTime().toString(),
          imageUrl,
        ],
      }),
      {
        loading: "Creating campaign...",
        success: <b>Campaign created successfully!</b>,
        error: <b>Could not create your campaign.</b>,
      },
    );
  }
  function createCampaign({
    title,
    deadline,
    targetAmount,
    description,
    imageUrl,
  }: CreateCampaignProps) {
    if (!title || !deadline || !targetAmount || !description || !imageUrl) {
      toast.error("Please fill all field");
      return;
    }
    return writeContract({
      abi: contract_abi,
      address: contract_address,
      functionName: "createCampaign",
      args: [
        title,
        description,
        parseEther(targetAmount.toString()),
        new Date(deadline).getTime().toString(),
        imageUrl,
      ],
    });
  }

  return {
    createCampaignAsync,
    createCampaign,
    data,
    error,
    campaignDetails,
    handleCampaignChange,
  };
}
