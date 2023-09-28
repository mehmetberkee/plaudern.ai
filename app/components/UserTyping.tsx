import React, { FC } from "react";

const UserTyping: FC = () => {
  return (
    <div className="flex justify-start">
      <div className="flex justify-center items-center gap-1 bg-gradient-to-br from-[#fe965c] to-[#fe3654] mx-10 rounded-lg w-16 h-10 md:my-2">
        <div className="animate-blink w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
        <div
          className="animate-blink w-2.5 h-2.5 bg-blue-600 rounded-full"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="animate-blink w-2.5 h-2.5 bg-blue-600 rounded-full"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default UserTyping;
