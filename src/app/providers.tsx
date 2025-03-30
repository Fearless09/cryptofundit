"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { ProgressProvider } from "@bprogress/next/app";

import { getConfig, getRainbowConfig } from "@/wagmi";
import ContextProvider from "@/context/Context";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getRainbowConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config as any} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={midnightTheme()} coolMode>
          <ContextProvider>
            <ProgressProvider
              height="4px"
              color="#1dc071"
              options={{ showSpinner: false }}
              shallowRouting
            >
              {props.children}
            </ProgressProvider>
          </ContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
