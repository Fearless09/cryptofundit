"use client";

import { useToggle } from "@/hooks/useToggle";
import { navlinks } from "@/utils/constant";
import { cn } from "@/utils/utilities";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import NavIcon from "./NavIcon";
import Link from "next/link";
import { ActionBtn, AvatarBtn, Logout } from "./NavActionBtn";
import { Theme } from "./Sidebar";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggle, handleToggle } = useToggle(false);
  const [search, setSearch] = useState<string>("");

  return (
    <div className="mb-9 flex flex-col-reverse justify-between gap-6 md:flex-row">
      {/* Search Bar */}
      <form
        className="bg-1c1c24 dark:bg-1c1c24-dark dark:shadow-white-dark/5 flex h-[52px] w-full max-w-[458px] flex-row gap-0.5 rounded-full py-2 pr-2 pl-4 shadow-md lg:flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          if (!search) return;
          router.push(`/search?title=${search}`);
        }}
      >
        <input
          type="search"
          placeholder="Search for campaigns"
          className="font-epilogue dark:text-white-dark placeholder:text-4b5264 dark:placeholder:text-4b5264-dark flex w-full border-hidden bg-transparent text-sm font-normal text-white outline-hidden"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <button
          className="transition-300 flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8d] hover:opacity-85"
          type="submit"
        >
          <Image
            alt="Search"
            src={"/assets/search.svg"}
            width={24}
            height={24}
            className="size-4 object-contain"
          />
        </button>
      </form>

      <div className="hidden flex-row justify-end gap-4 sm:flex">
        <ActionBtn />

        <AvatarBtn />
      </div>

      {/* Small Screen Navigation */}
      <div className="relative flex items-center justify-between sm:hidden">
        <Link href="/">
          <NavIcon
            imgUrl="/assets/logo.svg"
            active
            className="size-10 [&>img]:size-[65%]"
            name="Home"
          />
        </Link>

        <div className="flex items-center justify-end gap-4">
          <AvatarBtn className="size-10 [&>svg]:size-[60%]" />

          <button
            className="cursor-pointer [&>svg]:size-[34px]"
            onClick={() => handleToggle()}
          >
            {toggle ? <X /> : <Menu />}
          </button>
        </div>

        <div
          className={cn(
            "shadow-secondary bg-1c1c24 dark:bg-1c1c24-dark absolute inset-x-0 top-[60px] z-10 w-full translate-y-0 rounded-[10px] p-4 transition-all duration-500",
            {
              "-translate-y-[calc(600px)]": !toggle,
            },
          )}
        >
          <ul className="mb-6">
            {navlinks.map((link, index) => (
              <li key={index}>
                <NavIcon
                  active={pathname === link.link}
                  {...link}
                  pTag
                  onClick={() => {
                    router.push(link.link);
                    handleToggle(false);
                  }}
                />
              </li>
            ))}
            <li>
              <Logout pTag />
            </li>
            <li className="mt-6">
              <Theme pTag />
            </li>
          </ul>
          <ActionBtn />
        </div>
      </div>
    </div>
  );
}
