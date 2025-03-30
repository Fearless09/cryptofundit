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
