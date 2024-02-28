"use client";
import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex w-ful h-full justify-center items-center flex-col">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={24}
        height={24}
      />
      Loading...
    </div>
  );
};

export default Loader;
