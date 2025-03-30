export interface CampaignType {
  deadline: bigint;
  description: string;
  donations: bigint[];
  donators: `0x${string}`[];
  imageUrl: string;
  owner: `0x${string}`;
  raisedAmount: bigint;
  targetAmount: bigint;
  title: string;
  cId: number;
}
export interface ParseCampaignType {
  deadline: Date;
  description: string;
  donations: string[];
  donators: `0x${string}`[];
  imageUrl: string;
  owner: `0x${string}`;
  raisedAmount: string;
  targetAmount: string;
  title: string;
  cId: number;
}
