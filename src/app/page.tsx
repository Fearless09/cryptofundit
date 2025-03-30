"use client";

import Campaigns from "@/components/Campaigns";
import useGetCampaign from "@/hooks/useGetCampaign";

function App() {
  const { campaigns, isLoading } = useGetCampaign();

  return (
    <Campaigns
      title="All Campaigns"
      campaigns={campaigns}
      isLoading={isLoading}
    />
  );
}

export default App;
