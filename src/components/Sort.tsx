"use client";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapeClose from "@/hooks/useEscapeClose";
import { SortProps } from "@/hooks/useGetCampaign";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/utils/utilities";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  sort: SortProps;
  onSort: (sort: SortProps) => void;
};

export default function Sort({ sort, onSort }: Props) {
  const { handleToggle, toggle } = useToggle(false);
  const dropdownRef = useClickOutside(() => handleToggle(false));
  const [name, setName] = useState<string>("All");

  useEffect(() => {
    if (!sort) setName("All");

    if (sort === "deadlineAsc") setName("Deadline: Earliest");
    if (sort === "deadlineDesc") setName("Deadline: Latest");

    if (sort === "nameAsc") setName("Name: A-Z)");
    if (sort === "nameDesc") setName("Name: Z-A)");
  }, [sort]);

  useEscapeClose(toggle, () => handleToggle(false));

  return (
    <div
      className="absolute top-0 right-0 z-10 -translate-y-[12%]"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="bg-1c1c24 dark:bg-1c1c24-dark dark:text-white-dark border-3a3a43 dark:border-3a3a43-dark flex cursor-pointer items-center justify-between gap-2 rounded-md border px-4 py-2 text-sm font-medium text-white capitalize shadow-sm hover:opacity-80"
        onClick={() => handleToggle()}
        aria-haspopup="listbox"
        aria-expanded={toggle}
      >
        <ArrowUpDown className="size-4" />
        {name}
        <ChevronDown
          className={cn("transition-300 size-4", {
            "rotate-180": toggle,
          })}
        />
      </button>

      {toggle && (
        <div className="bg-1c1c24 dark:bg-1c1c24-dark dark:text-white-dark border-3a3a43 dark:border-3a3a43-dark absolute right-0 z-10 mt-1 w-56 overflow-x-hidden overflow-y-auto rounded-md border shadow-lg">
          <ul
            className="max-h-60 w-full"
            role="listbox"
            aria-labelledby="sort-button"
          >
            {dropdownArr.map((item, index) => (
              <li key={index} className="w-full">
                <button
                  className={cn(
                    "bg-1c1c24 dark:bg-1c1c24-dark dark:text-white-dark hover:bg-3a3a43 dark:hover:bg-3a3a43-dark flex w-full cursor-pointer items-center justify-between px-4 py-2 text-sm",
                    {
                      "bg-2c2f32 dark:bg-2c2f32-dark text-1dc071 dark:text-4acd8d":
                        item.value === sort,
                    },
                  )}
                  role="option"
                  aria-selected={item.value === sort}
                  onClick={() => onSort(item.value)}
                  tabIndex={0}
                >
                  {item.name}
                  {item.direction === "asc" ? (
                    <ArrowUp className="size-4" />
                  ) : item.direction === "desc" ? (
                    <ArrowDown className="size-4" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const dropdownArr: {
  name: string;
  direction: "asc" | "desc" | null;
  value: SortProps;
}[] = [
  {
    name: "All",
    direction: null,
    value: null,
  },
  {
    name: "Name: A-Z",
    direction: "asc",
    value: "nameAsc",
  },
  {
    name: "Name: Z-A",
    direction: "desc",
    value: "nameDesc",
  },
  {
    name: "Deadline: Earliest",
    direction: "asc",
    value: "deadlineAsc",
  },
  {
    name: "Deadline: Latest",
    direction: "desc",
    value: "deadlineDesc",
  },
];
