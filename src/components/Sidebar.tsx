"use client";

import React from "react";
import Link from "next/link";
import { navlinks } from "@/utils/constant";
import { usePathname, useRouter } from "next/navigation";
import NavIcon from "./NavIcon";
import { Logout } from "./NavActionBtn";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="sticky top-5 flex h-[93dvh] flex-col items-center justify-between">
      <Link href="/">
        <NavIcon
          imgUrl="/assets/logo.svg"
          className="size-[52px]"
          active
          name="Home"
        />
      </Link>

      <div className="mt-12 flex h-full w-[76px] flex-1 flex-col items-center justify-between overflow-y-auto rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinks.map((link, index) => (
            <NavIcon
              key={index}
              {...link}
              // imgUrl={link.imgUrl}
              // disabled={link.disabled}
              // name={link.name}
              active={pathname === link.link}
              onClick={() => router.push(link.link)}
            />
          ))}
          <Logout />
        </div>

        <NavIcon
          imgUrl="/assets/sun.svg"
          name="theme: dark mode"
          className="shadow-secondary mt-10 shrink-0 bg-[#1c1c24]"
        />
      </div>
    </div>
  );
}
