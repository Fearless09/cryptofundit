import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  bybitWallet,
  metaMaskWallet,
  coinbaseWallet,
  trustWallet,
  uniswapWallet,
  phantomWallet,
  okxWallet,
  gateWallet,
  bitgetWallet,
  braveWallet,
  injectedWallet,
  safeWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [sepolia],
    connectors: [
      injected(),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "",
        relayUrl: "wss://relay.walletconnect.org",
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [sepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}

export function getRainbowConfig() {
  return getDefaultConfig({
    appName: "CryptoFundIt",
    appDescription:
      "CrowdFundIt is a decentralized crowdfunding platform built on the Sepolia network, empowering creators to launch campaigns and supporters to donate securely using blockchain technology.",
    appUrl: "https://crowdfundit.vercel.app",
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "",

    chains: [sepolia],
    ssr: false,
    transports: {
      [sepolia.id]: http(),
    },
    
    wallets: [
      {
        groupName: "Recommended",
        wallets: [metaMaskWallet, coinbaseWallet, walletConnectWallet],
      },
      {
        groupName: "Others",
        wallets: [
          rainbowWallet,
          bybitWallet,
          trustWallet,
          uniswapWallet,
          phantomWallet,
          okxWallet,
          gateWallet,
          bitgetWallet,
          braveWallet,
          injectedWallet,
          safeWallet,
        ],
      },
    ],
  });
}
