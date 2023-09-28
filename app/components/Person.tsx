import React, { FC } from "react";
import Image from "next/image";
import { useUser } from "../contexts/userContext";

interface PersonProps {
  name: string;
  src: string;
  text: string;
}

const Person: FC<PersonProps> = (props) => {
  const { selectedUser, setSelectedUser } = useUser();
  const handleClick = () => {
    setSelectedUser(props.name);
  };
  return (
    <div
      onClick={handleClick}
      className={`flex items-center text-white gap-3 py-5 px-3 md:pr-16 border-b-2 border-gray-700 hover:bg-[#3f2b96] transition duration-500 ease-out ${
        selectedUser === props.name && "bg-[#3f2b96]"
      }`}
    >
      <Image
        src={props.src}
        width={50}
        height={50}
        alt="Picture of the person"
        className="md:w-[40px] md:h-[40px] w-[50px] h-[50px] rounded-full"
      />
      <div>
        <p className="text-xs md:text-sm">{props.name}</p>
        <p className="text-xs text-gray-400 mr-3">{props.text}</p>
      </div>
    </div>
  );
};

export default Person;
