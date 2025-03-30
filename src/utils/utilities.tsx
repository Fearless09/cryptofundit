import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatEther } from "ethers";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function generateColorFromAddress(address: `0x${string}`) {
  if (!address) return;
  const cleanAddress = address.startsWith("0x") ? address.slice(2) : address;
  const colorHex = cleanAddress.substring(0, 6);
  return "#" + colorHex;
}

export const daysLeft = (deadline: string) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0); // in days
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (
  url: string,
  callback: (value: boolean) => void,
) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const bigIntToString = (value: bigint) => {
  return formatEther(value);
};

export const getCategory = (title: string) => {
  const categories = {
    technology: [
      "tech",
      "software",
      "hardware",
      "programming",
      "app",
      "web",
      "mobile",
      "ai",
      "blockchain",
      "crypto",
      "code",
      "website",
      "computer",
      "digital",
    ],
    education: [
      "education",
      "school",
      "university",
      "learning",
      "course",
      "study",
      "knowledge",
      "training",
    ],
    healthcare: [
      "health",
      "medical",
      "hospital",
      "treatment",
      "cure",
      "research",
      "fitness",
      "wellness",
      "diet",
      "exercise",
      "nutrition",
      "mental health",
    ],
    environment: [
      "environment",
      "climate",
      "green",
      "sustainable",
      "renewable",
    ],
    arts: ["art", "music", "film", "theater", "design", "creative"],
    business: [
      "business",
      "startup",
      "company",
      "enterprise",
      "market",
      "finance",
      "money",
      "economy",
      "stock",
      "investment",
      "entrepreneur",
    ],
    community: ["community", "social", "charity", "nonprofit", "help"],
    sports: [
      "sport",
      "fitness",
      "athlete",
      "team",
      "game",
      "tournament",
      "football",
      "basketball",
      "soccer",
      "baseball",
      "tennis",
      "golf",
    ],
    entertainment: [
      "movie",
      "music",
      "game",
      "film",
      "tv",
      "television",
      "entertainment",
      "celebrity",
      "show",
    ],
    politics: [
      "politics",
      "government",
      "election",
      "policy",
      "president",
      "vote",
      "law",
      "political",
    ],
    science: [
      "science",
      "research",
      "discovery",
      "study",
      "experiment",
      "physics",
      "chemistry",
      "biology",
    ],
  };

  const lowercaseTitle = title.toLowerCase();

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some((keyword) => lowercaseTitle.includes(keyword))) {
      return category;
    }
  }

  return "other";
};
