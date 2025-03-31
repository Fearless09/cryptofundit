import { cn } from "@/utils/utilities";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, FC } from "react";

type IconProps = ComponentProps<"button"> & {
  active?: boolean;
  imgUrl: string;
  name: string;
  pTag?: boolean;
};

const NavIcon: FC<IconProps> = ({
  className,
  active = false,
  imgUrl,
  name,
  disabled,
  pTag = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex size-12 cursor-pointer items-center justify-center rounded-[10px]",
        className,
        {
          "bg-2c2f32 dark:bg-2c2f32-dark": active && !disabled,
          "cursor-default": disabled,
          "w-full justify-start px-4": pTag,
        },
      )}
      title={name.toLocaleUpperCase()}
      disabled={disabled}
      {...props}
    >
      <Image
        alt={name}
        src={imgUrl}
        width={24}
        height={24}
        className={cn("size-6", {
          grayscale: !active || disabled,
          "grayscale-0": name === "logout",
        })}
      />

      {pTag && (
        <p
          className={cn(
            "font-epilogue text-aeaeae dark:text-aeaeae-dark ml-5 text-sm font-medium capitalize",
            {
              "text-[#1dc071]": active && !disabled,
              "text-red-500": name === "logout",
            },
          )}
        >
          {name}
        </p>
      )}
    </button>
  );
};

export default NavIcon;
