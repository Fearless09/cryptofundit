import { ComponentProps, FC } from "react";

export const Profile: FC<ComponentProps<"svg">> = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={12}
      cy={9}
      r={3}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <circle cx={12} cy={12} r={11} stroke="currentColor" strokeWidth={2} />
    <path
      d="M19 20c-.413-1.148-1.323-2.162-2.588-2.885S13.595 16 12 16s-3.146.392-4.412 1.115C6.323 17.838 5.413 18.853 5 20"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
