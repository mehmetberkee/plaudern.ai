import React, { FC } from "react";
import Image from "next/image";

interface UserHeaderProps {
  src: string;
  name: string;
  func: () => void;
}

const UserHeader: FC<UserHeaderProps> = (props) => {
  return (
    <div
      className="flex lg:w-[750px] md:w-[600px] h-[90px] items-center rounded-md 
    bg-[#121a2a] justify-between px-10"
    >
      <div className="flex items-center gap-3">
        <Image
          src={props.src}
          width={60}
          height={60}
          alt="Picture of the author"
          className="rounded-full "
        />
        <div>
          <div className="flex justify-center items-center gap-1">
            <p className="font-bold text-white">{props.name}</p>
            <div className="w-1.5 h-1.5 rounded-full bg-[#01fe8a]"></div>
          </div>

          <p className="text-sm text-gray-500">online</p>
        </div>
      </div>
      <button className="hidden border-gray-400 border-2 py-2 px-4 rounded-full hover:bg-[#3f2b96] hover:text-white transition duration-300 text-white">
        Profile
      </button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        className="lg:hidden w-6 h-6"
        onClick={props.func}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
};

export default UserHeader;
