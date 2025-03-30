"use client";

import { contract_abi, contract_address } from "@/utils/constant";
import { useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

type Props = {
  id: number;
  amount: number;
};

export default function useDonate() {
  const { writeContractAsync, data } = useWriteContract();
  const [donation, setDonation] = useState<number>(0);

  function handleDonationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setDonation(value);
  }

  function donateAsync({ id, amount }: Props) {
    return toast.promise(
      writeContractAsync({
        abi: contract_abi,
        address: contract_address,
        functionName: "donateToCampaign",
        args: [id],
        value: parseEther(amount.toString()),
      }),
      {
        loading: "Donating to campaign...",
        success: <b>Donation made successfully!</b>,
        error: <b>Could not process your donation.</b>,
      },
    );
  }

  return {
    donateAsync,
    data,
    donation,
    handleDonationChange,
  };
}
