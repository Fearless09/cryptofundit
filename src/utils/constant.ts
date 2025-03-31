import ABI from "../abi.json";

export const contract_address = "0x0f93ed69da3019f4005fe6efa7392ebf5fe40643";
export const contract_abi = ABI.output.abi;

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: "/assets/dashboard.svg",
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: "/assets/create-campaign.svg",
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: "/assets/payment.svg",
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: "/assets/withdraw.svg",
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: "/assets/profile.svg",
    link: "/profile",
  },
];

export const disconnectObj = {
  name: "logout",
  imgUrl: "/assets/logout.svg",
  link: "/",
};

const campaigns = [
  {
    title: "Clean Water Initiative for Rural Communities",
    description:
      "Help us bring clean drinking water to 5 rural villages facing severe drought conditions. This campaign will fund the installation of water purification systems that can serve up to 500 people per village.",
    targetAmount: 2.5, // Sepolia ETH
    deadline: "2025-05-15T23:59:59Z",
    imageUrl: "",
  },
  {
    title: "Coding Bootcamp Scholarships for Underserved Youth",
    description:
      "Provide full scholarships for 15 talented students from low-income backgrounds to attend our intensive 12-week coding bootcamp, helping them launch careers in tech.",
    targetAmount: 4.8, // Sepolia ETH
    deadline: "2025-06-30T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Emergency Wildlife Rescue Center Expansion",
    description:
      "Our wildlife rescue center needs to expand capacity to accommodate the increasing number of injured animals. Funds will build 3 new rehabilitation enclosures and purchase medical equipment.",
    targetAmount: 3.2, // Sepolia ETH
    deadline: "2025-05-01T23:59:59Z",
    imageUrl: "",
  },
  {
    title: "Community Urban Garden Project",
    description:
      "Transform an abandoned lot into a thriving community garden that will provide fresh produce for local food banks and educational opportunities for neighborhood schools.",
    targetAmount: 1.8, // Sepolia ETH
    deadline: "2025-04-20T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1458014854819-1a40aa70211c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Renewable Energy for Remote School",
    description:
      "Install solar panels and a small wind turbine at a remote mountain school currently relying on expensive diesel generators, providing sustainable electricity for 200 students.",
    targetAmount: 5.5, // Sepolia ETH
    deadline: "2025-07-15T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Mental Health Support App Development",
    description:
      "Fund the final development stages of our mental health support app that connects users with licensed therapists and provides evidence-based coping resources during crisis moments.",
    targetAmount: 3.7, // Sepolia ETH
    deadline: "2025-05-31T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Accessible Playground Equipment",
    description:
      "Help us retrofit the central park playground with accessible equipment so children of all abilities can play together. Includes wheelchair-friendly surfaces and sensory-rich play stations.",
    targetAmount: 2.9, // Sepolia ETH
    deadline: "2025-06-10T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1620786614299-2f684266687b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Homeless Shelter Winter Supply Drive",
    description:
      "Purchase essential winter supplies for our city's largest homeless shelter, including 200 sleeping bags, warm clothing, personal hygiene products, and heating equipment upgrades.",
    targetAmount: 2.3, // Sepolia ETH
    deadline: "2025-04-15T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Historical Museum Artifact Preservation",
    description:
      "Fund specialized conservation equipment to preserve deteriorating artifacts in our local historical museum's collection, protecting irreplaceable items documenting our region's heritage.",
    targetAmount: 4.1, // Sepolia ETH
    deadline: "2025-06-25T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Emergency Disaster Relief Fund",
    description:
      "Create a quick-response fund to immediately assist families affected by natural disasters in our region with temporary housing, food, and rebuilding resources.",
    targetAmount: 6.0, // Sepolia ETH
    deadline: "2025-07-31T23:59:59Z",
    imageUrl:
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&q=80&auto=format&fit=crop",
  },
];
