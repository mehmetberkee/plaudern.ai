import React, { FC } from "react";
import Person from "./Person";
import Credits from "./Credits";

const ChatList: FC = () => {
  return (
    <div className="flex flex-col justify-between h-screen lg:w-[250px] md:w-[200px] rounded-md bg-[#131a2a]">
      <div>
        <Person src="/Neuer.jpg" name="Neuer" text="Fußballtorwart" />
        <Person src="/Beethoven.jpg" name="Beethoven" text="Pianist" />
        <Person src="/Goethe.jpg" name="Goethe" text="Dichter" />
        <Person src="/Merkel.jpg" name="Merkel" text="Politikerin" />
        <Person src="/Hitler.jpg" name="Hitler" text="Diktator" />
      </div>
      <div>
        <Credits />
      </div>
    </div>
  );
};

export default ChatList;
