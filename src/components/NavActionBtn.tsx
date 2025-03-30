"use client";

import React, { useEffect } from "react";
import Button from "./Button";
import { cn, generateColorFromAddress } from "@/utils/utilities";
import { useAccount, useDisconnect } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { Profile } from "@/svg/Svgs";
import { useToggle } from "@/hooks/useToggle";
import NavIcon from "./NavIcon";
import { disconnectObj } from "@/utils/constant";

interface Props {
  className?: string;
}

export const ActionBtn = ({ className }: Props) => {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { toggle, handleToggle } = useToggle(false);
  useEffect(() => handleToggle(true), []);
  if (!toggle) return;

  return (
    <Button
      className={cn("bg-[#8c6dfd]", className, {
        "bg-[#1dc071]": address,
      })}
      type="button"
      onClick={() => {
        if (isConnected) {
          router.push("/create-campaign");
          return;
        }
        openConnectModal?.();
      }}
    >
      {isConnected ? "Create Campaign" : "Connect"}
    </Button>
  );
};

export const AvatarBtn = ({ className }: Props) => {
  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();

  const { toggle, handleToggle } = useToggle(false);
  useEffect(() => handleToggle(true), []);
  if (!isConnected || !toggle) return;

  return (
    <button
      className={cn(
        "flex size-[52px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]",
        className,
      )}
      style={{
        color: generateColorFromAddress(address as `0x${string}`),
      }}
      onClick={() => openAccountModal?.()}
    >
      <Profile className="size-[55%]" />
    </button>
  );
};

export  function Logout({ pTag = false }: { pTag?: boolean }) {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { toggle, handleToggle } = useToggle(false);
  useEffect(() => handleToggle(true), []);
  if (!isConnected || !toggle) return;

  return (
    <NavIcon
      name={disconnectObj.name}
      imgUrl={disconnectObj.imgUrl}
      pTag={pTag}
      onClick={() => disconnect()}
    />
  );
}
