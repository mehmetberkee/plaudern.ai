import React, { FC } from "react";

interface SendMessageProps {
  text: string;
}

const SendMessage: FC<SendMessageProps> = (props) => {
  return (
    <div className="flex justify-end">
      <div className=" bg-gradient-to-br from-[#7374cb] to-[#3f2b96] mx-10 rounded-t-lg rounded-bl-lg max-w-md">
        <div className="px-5 py-3">
          <p className="text-white sm:text-sm">{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
