"use client";
import Button from "@/components/Button";
import { Input, TextArea } from "@/components/Input";
import Loader from "@/components/Loader";
import useCreateCampaign from "@/hooks/useCreateCampaign";
import useGetCampaign from "@/hooks/useGetCampaign";
import { useToggle } from "@/hooks/useToggle";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import React from "react";
import { useAccount } from "wagmi";

export default function CreateCampaignPage() {
  const { address, isConnected } = useAccount();
  const { toggle: loading, handleToggle: handleLoading } = useToggle(false);
  const { campaignDetails, handleCampaignChange, createCampaignAsync } =
    useCreateCampaign();
  const { openConnectModal } = useConnectModal();
    const { refetchCampaigns } = useGetCampaign();

  return (
    <div className="relative flex flex-col items-center justify-center rounded-[10px] bg-[#1c1c1c] p-4 text-white sm:p-10">
      {loading && <Loader />}

      <h1 className="font-epilogue rounded-[10px] bg-[#3a3a43] p-4 text-center text-lg leading-[38px] font-semibold sm:min-w-[380px] sm:text-[25px]">
        Start a Campaign
      </h1>

      <form
        className="mt-[65px] flex w-full flex-col gap-[30px]"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!isConnected) {
            openConnectModal?.();
            return;
          }
          handleLoading(true);
          await createCampaignAsync(campaignDetails)
            .then(() => {
              refetchCampaigns();
            })
            .finally(() => {
              handleLoading(false);
            });
        }}
      >
        <div className="flex flex-wrap gap-x-[40px] gap-y-[30px]">
          <Input
            label="Campaign Creator"
            placeholder="John Doe"
            value={isConnected ? address : ""}
            readOnly
          />
          <Input
            label="Campaign Title"
            placeholder="Campaign Title"
            name="title"
            value={campaignDetails.title}
            onChange={(e) =>
              handleCampaignChange(e.target.name, e.target.value)
            }
            required={isConnected}
          />
        </div>

        <TextArea
          label="Story"
          placeholder="Write your story"
          name="description"
          value={campaignDetails.description}
          onChange={(e) => handleCampaignChange(e.target.name, e.target.value)}
        />

        {/*  */}
        <div className="relative flex h-[120px] w-full items-center justify-start rounded-[10px] bg-[#8c6dfd] p-4">
          <Image
            alt="money"
            width={40}
            height={40}
            src={"/assets/money.svg"}
            className="size-10 object-contain"
          />
          <h4 className="font-epilogue ms-5 text-[22px] font-medium">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-x-[40px] gap-y-[30px]">
          <Input
            label="Goal"
            placeholder="ETH 0.50"
            name="targetAmount"
            type="number"
            defaultValue={campaignDetails.targetAmount}
            onChange={(e) =>
              handleCampaignChange(e.target.name, Number(e.target.value))
            }
            required={isConnected}
          />
          <Input
            label="End Date"
            placeholder="End Date"
            type="date"
            name="deadline"
            value={campaignDetails.deadline}
            onChange={(e) => {
              handleCampaignChange(e.target.name, e.target.value);
            }}
            required={isConnected}
          />
        </div>

        <Input
          label="Campaign Image"
          placeholder="Paste your campaign image URL"
          type="url"
          name="imageUrl"
          value={campaignDetails.imageUrl}
          onChange={(e) => handleCampaignChange(e.target.name, e.target.value)}
          required={isConnected}
        />

        <div className="mt-10 flex items-center justify-center">
          <Button type="submit" className="bg-[#1dc071]">
            {isConnected ? "Submit new campaign" : "Connect Wallet"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// 1:33:23
