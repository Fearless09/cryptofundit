"use client";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import useDonate from "@/hooks/useDonate";
import useGetCampaign from "@/hooks/useGetCampaign";
import { useToggle } from "@/hooks/useToggle";
import { Profile } from "@/svg/Svgs";
import {
  calculateBarPercentage,
  daysLeft,
  generateColorFromAddress,
} from "@/utils/utilities";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export default function CampaignDetailPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const id = searchParams.get("id");

  const { campaigns, isLoading, refetchCampaigns } = useGetCampaign();
  const { donation, handleDonationChange, donateAsync } = useDonate();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { toggle: donating, handleToggle: handleDonating } = useToggle(false);

  const campaign_details = campaigns?.find(
    (c) => c.title === title && c.cId === Number(id),
  );
  const userCampaigns = campaigns?.filter(
    (c) => c.owner === campaign_details?.owner,
  );
  const remainingDays = (deadline: string) => {
    return Number(daysLeft(deadline));
  };

  useEffect(() => {
    if (!isLoading && !campaign_details) notFound();
  }, [campaign_details, isLoading]);

  console.log("Campaign", campaign_details);

  return (
    <div className="relative">
      {(isLoading || donating) && <Loader />}

      {campaign_details && (
        <>
          <div className="mt-10 flex w-full flex-col gap-[30px] md:flex-row">
            {/* Img and Bar */}
            <div className="flex flex-1 flex-col">
              <img
                alt={campaign_details.title}
                src={campaign_details.imageUrl}
                className="h-[410px] w-full rounded-xl object-cover"
              />
              <div className="bg-3a3a43 dark:bg-3a3a43-dark relative mt-2 h-[5px] w-full rounded-full">
                <div
                  className="absolute inset-y-0 left-0 max-w-full rounded-full bg-[#4acd8d]"
                  style={{
                    width:
                      calculateBarPercentage(
                        Number(campaign_details.targetAmount),
                        Number(campaign_details.raisedAmount),
                      ) + "%",
                  }}
                />
              </div>
            </div>

            {/*  */}
            <div className="flex w-full flex-wrap justify-between gap-[30px] md:w-[150px]">
              <CounterBox
                title="Days Left"
                value={
                  remainingDays(campaign_details.deadline.toString()) < 0
                    ? "Expired"
                    : remainingDays(
                        campaign_details.deadline.toString(),
                      ).toString()
                }
              />
              <CounterBox
                title={`Raised of ${campaign_details.targetAmount} ETH`}
                value={campaign_details.raisedAmount.toString()}
              />
              <CounterBox
                title="Total Backers"
                value={campaign_details.donators.length.toString()}
              />
            </div>
          </div>

          {/*  */}
          <div className="mt-[60px] flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-[2] flex-col gap-10">
              {/* Creator */}
              <div>
                <h4 className="text-lg font-bold uppercase">Creator</h4>
                <div className="mt-5 flex flex-wrap items-center gap-3.5">
                  <Profile
                    className="size-[44px]"
                    style={{
                      color: generateColorFromAddress(campaign_details.owner),
                    }}
                  />
                  <div className="font-epilogue">
                    <h4 className="text-sm font-semibold break-all">
                      {campaign_details.owner}
                    </h4>
                    <p className="text-808191 dark:text-808191-dark mt-1 text-sm">
                      {userCampaigns.length} Campaigns
                    </p>
                  </div>
                </div>
              </div>
              {/* Story */}
              <div>
                <h4 className="text-lg font-bold uppercase">Story</h4>
                <p className="font-epilogue text-808191 dark:text-808191-dark mt-5 text-base/[26px]">
                  {campaign_details.description}
                </p>
              </div>
              {/* Donators */}
              <div>
                <h4 className="text-lg font-bold uppercase">Donators</h4>
                <div className="mt-5">
                  {campaign_details.donators.length > 0 ? (
                    campaign_details.donators.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4"
                      >
                        <p className="font-epilogue text-b2b3bd dark:text-b2b3bd-dark text-base/[26px] break-all">
                          <span style={{ color: generateColorFromAddress(d) }}>
                            {i + 1}.
                          </span>{" "}
                          {d}
                        </p>
                        <p className="font-epilogue text-808191 dark:text-808191-dark text-base/[26px] break-all">
                          {campaign_details.donations[i]}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-epilogue text-808191 dark:text-808191-dark mt-5 text-base/[26px]">
                      No donators yet. Be the first one!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Fund Card */}
            <div className="flex-1">
              <h4 className="font-epilogue text-lg font-semibold uppercase">
                Fund
              </h4>
              <form
                className="bg-1c1c24 dark:bg-1c1c1c-dark mt-5 flex flex-col rounded-[10px] p-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!isConnected) {
                    openConnectModal?.();
                    return;
                  }
                  if (!donation) {
                    toast.error("Please enter a donation amount.");
                    return;
                  }
                  handleDonating(true);
                  await donateAsync({
                    id: campaign_details.cId,
                    amount: donation,
                  })
                    .then(() => {
                      refetchCampaigns();
                    })
                    .finally(() => {
                      handleDonating(false);
                    });
                }}
              >
                <p className="font-epilogue text-808191 dark:text-808191-dark text-center text-xl/[30px] font-medium">
                  Fund the campaign
                </p>
                <input
                  type="number"
                  step={0.01}
                  // defaultValue={donation}
                  value={donation}
                  onChange={handleDonationChange}
                  placeholder="ETH 0.1"
                  inputMode="decimal"
                  className="font-epilogue border-3a3a43 dark:border-3a3a43-dark dark:text-white-dark placeholder:text-4b5264 dark:placeholder:text-4b5264-dark mt-[30px] w-full rounded-[10px] border bg-transparent px-3.5 py-2.5 text-lg/[30px] text-white outline-hidden sm:px-5"
                  required={isConnected}
                />
                <div className="bg-13131a dark:bg-13131a-dark mt-5 rounded-[10px] p-4">
                  <h4 className="font-epilogue text-base/[220x] font-semibold">
                    Back it because you believe in it.
                  </h4>
                  <p className="font-epilogue text-808191 dark:text-808191-dark mt-5 text-sm/[22px]">
                    Support the project for no reward, just because it speaks to
                    you.
                  </p>
                </div>
                <Button
                  type="submit"
                  className="transition-300 mt-5 w-full bg-[#8c6dfd] hover:opacity-80"
                >
                  {isConnected ? "Fund Campaign" : "Connect Wallet"}
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type CounterBoxProps = {
  title: string;
  value: string;
};

const CounterBox = ({ title, value }: CounterBoxProps) => {
  return (
    <div className="font-epilogue flex w-[150px] flex-col items-center text-center">
      <h4
        title={value}
        className="bg-1c1c24 dark:bg-1c1c24-dark w-full truncate rounded-t-[10px] p-3 text-[30px] font-bold"
      >
        {value}
      </h4>
      <p
        title={title}
        className="dark:bg-28282e-dark text-808191 dark:text-808191-dark w-full truncate rounded-b-[10px] bg-[#eaeaea] px-3 py-2 text-sm"
      >
        {title}
      </p>
    </div>
  );
};
