import { cn } from "@/utils/utilities";
import { ComponentProps, FC } from "react";

const Button: FC<ComponentProps<"button">> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "font-epilogue min-h-[52px] cursor-pointer rounded-[10px] px-6 py-2 text-sm/[26px] font-medium text-white",
        className,
      )}
      {...props}
    />
  );
};

export default Button;