import { cn } from "@/utils/utilities";
import { ComponentProps, FC, ReactNode } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
};

const className =
  "font-epilogue rounded-[10px] border border-[#3a3a43] bg-transparent p-[15px] text-sm leading-[22px] text-white outline-hidden placeholder:text-[#4b5264] sm:min-w-[300px] sm:px-[25px]";

const genericClassName = className;

export const Input: FC<InputProps> = ({
  className,
  label,
  required,
  step,
  ...props
}) => {
  return (
    <Label label={label} required={required}>
      <input
        className={cn(
          "font-epilogue rounded-[10px] border border-[#3a3a43] bg-transparent p-[15px] text-sm leading-[22px] text-white outline-hidden placeholder:text-[#4b5264] sm:min-w-[300px] sm:px-[25px]",
          genericClassName,
          className,
        )}
        step={step || 0.1}
        required={required}
        {...props}
      />
    </Label>
  );
};

type TextAreaProps = ComponentProps<"textarea"> & {
  label: string;
};

export const TextArea: FC<TextAreaProps> = ({
  className,
  label,
  required,
  rows,
  ...props
}) => {
  return (
    <Label label={label} required={required}>
      <textarea
        className={cn("", genericClassName, className)}
        {...props}
        rows={rows || 10}
        required={required}
        {...props}
      ></textarea>
    </Label>
  );
};

const Label = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) => {
  return (
    <label className="flex w-full flex-1 flex-col">
      {!!label && (
        <span className="font-epilogue mb-1.5 ps-2 text-sm leading-[22px] font-medium text-[#808191]">
          {label}
          {!!required && " *"}
        </span>
      )}

      {children}
    </label>
  );
};
