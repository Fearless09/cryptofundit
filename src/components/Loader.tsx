import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="bg-1c1c1c/40 dark:bg-1c1c1c-dark/40 absolute inset-0 z-10 rounded-[10px]">
      <Image
        alt="Loader"
        src={"/assets/loader.svg"}
        className="sticky top-0 mx-auto size-[200px] object-contain"
        width={200}
        height={200}
      />
    </div>
  );
}
