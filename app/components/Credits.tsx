import React, { FC } from "react";
import Link from "next/link";

const Credits: FC = () => {
  return (
    <div className="flex flex-col gap-3 mx-4 my-5">
      <div className="flex flex-col bg-[#080f1b]  p-8 rounded-lg">
        <div className="lg:flex md:justify-between text-white mb-3">
          <p className="text-sm hidden lg:block">Credits</p>
          <p className="text-sm text-center text-[#a8c1fe]">Unlimited</p>
        </div>
        <div className="flex justify-center">
          <div className="w-full h-1 bg-[#a8c1fe] rounded-md"></div>
        </div>
      </div>
      <Link
        className="flex justify-center items-center mx-auto h-[48px] w-[60px] rounded-lg hover:bg-[#3f2b96] transition-all"
        href={"/"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#a8c1fe"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Credits;
