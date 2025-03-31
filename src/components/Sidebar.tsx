"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { navlinks } from "@/utils/constant";
import { usePathname, useRouter } from "next/navigation";
import NavIcon from "./NavIcon";
import { Logout } from "./NavActionBtn";
import { useToggle } from "@/hooks/useToggle";
import { useTheme } from "next-themes";

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

      <div className="bg-1c1c24 dark:bg-1c1c24-dark mt-12 flex h-full w-[76px] flex-1 flex-col items-center justify-between overflow-y-auto rounded-[20px] py-4">
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

        <Theme />
      </div>
    </div>
  );
}

export function Theme({ pTag = false }: { pTag?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();

  const { toggle, handleToggle } = useToggle(false);
  useEffect(() => handleToggle(true), []);
  if (!toggle) return;
  return (
    <NavIcon
      imgUrl={resolvedTheme === "dark" ? "/assets/sun.svg" : "/assets/moon.svg"}
      name={resolvedTheme === "dark" ? "Dark Mode" : "Light Mode"}
      className="shadow-secondary bg-1c1c24 dark:bg-1c1c24-dark mt-10 shrink-0"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      pTag={pTag}
    />
  );
}
