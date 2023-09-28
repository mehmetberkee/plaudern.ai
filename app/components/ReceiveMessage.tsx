import React, { FC } from "react";

interface ReceiveMessageProps {
  text: string;
}
const ReceiveMessage: FC<ReceiveMessageProps> = (props) => {
  return (
    <div className="flex justify-start">
      <div className=" bg-gradient-to-br from-[#fe965c] to-[#fe3654] mx-10 rounded-t-lg rounded-br-lg max-w-md">
        <div className="px-5 py-3">
          <p className="text-white text-sm">{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiveMessage;
