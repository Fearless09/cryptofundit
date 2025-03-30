"use client";

import Campaigns from "@/components/Campaigns";
import useGetCampaign from "@/hooks/useGetCampaign";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

export default function ProfilePage() {
  const { campaigns, isLoading } = useGetCampaign();
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

  return (
    <Campaigns
      title="My Campaigns"
      campaigns={myCampaign}
      isLoading={isLoading}
    />
  );
}
