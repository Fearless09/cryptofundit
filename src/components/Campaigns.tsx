import { Profile } from "@/svg/Svgs";
import { ParseCampaignType } from "@/utils/TypeScript";
import {
  daysLeft,
  generateColorFromAddress,
  getCategory,
} from "@/utils/utilities";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  campaigns: ParseCampaignType[];
  isLoading?: boolean;
  title?: string;
};

export default function Campaigns({ campaigns, isLoading, title }: Props) {
  return (
    <div>
      <h1 className="font-epilogue text-xl font-semibold">
        {title} ({campaigns?.length || 0})
      </h1>

      <div className="mt-5 flex flex-wrap gap-[26px]">
        {isLoading && (
          <Image
            alt="Loader"
            src={"/assets/loader.svg"}
            className="mx-auto size-[400px] object-contain"
            width={200}
            height={200}
          />
        )}

        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue text-[14px]/[30px] font-semibold text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {campaigns &&
          campaigns.length > 0 &&
          campaigns.map((campaign, index) => (
            <CampaignCard campaign={campaign} key={index} />
          ))}
      </div>
    </div>
  );
}

type CampaignCardProps = {
  campaign: ParseCampaignType;
};

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const ramainingDays = Number(daysLeft(campaign.deadline.toString()));

  return (
    <Link
      className="hover:shadow-secondary transition-300 w-full cursor-pointer rounded-[15px] bg-[#1c1c24] hover:-translate-y-1 hover:shadow-white/5 sm:w-[288px]"
      href={`/campaign-details?title=${campaign.title}&id=${campaign.cId}`}
    >
      <img
        alt={campaign.title}
        src={campaign.imageUrl}
        width={500}
        height={500}
        className="h-[158px] w-full rounded-t-[15px] object-cover"
      />

      {/* Tag and Category */}
      <div className="flex flex-col p-4">
        <div className="flex items-center">
          <Image
            alt="tag"
            src={"/assets/type.svg"}
            width={24}
            height={24}
            className="size-4 object-contain"
          />
          <p className="font-epilogue ms-2 text-[12px] font-medium text-[#808191] capitalize">
            {getCategory(campaign.title)}
          </p>
        </div>

        {/* Title and description */}
        <div className="mt-1 block">
          <h3 className="font-epilogue truncate text-base/[26px] font-semibold">
            {campaign.title}
          </h3>
          <p className="font-epilogue mt-[5px] truncate text-sm/[18px] text-[#808191]">
            {campaign.description}
          </p>
        </div>

        {/* Amount and deadline */}
        <div className="mt-4 flex flex-wrap justify-between gap-2">
          {/*  */}
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px]/[22px] font-semibold text-[#b2b3bd]">
              {campaign.raisedAmount}
            </h4>
            <p className="font-epilogue mt-[3px] truncate text-[12px]/[18px] text-[#808191] sm:max-w-[120px]">
              Raised of {campaign.targetAmount}
            </p>
          </div>
          {/*  */}
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px]/[22px] font-semibold text-[#b2b3bd]">
              {ramainingDays < 0 ? "Expired" : ramainingDays}
            </h4>
            <p className="font-epilogue mt-[3px] truncate text-[12px]/[18px] text-[#808191] sm:max-w-[120px]">
              Days Left
            </p>
          </div>
        </div>

        {/* Owner */}
        <div className="mt-5 flex items-center gap-3">
          <Profile
            className="size-[20px]"
            style={{ color: generateColorFromAddress(campaign.owner) }}
          />
          <p className="font-epilogue flex-1 truncate text-xs text-[#808191]">
            By <span className="text-[#b2b3bd]">{campaign.owner}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
