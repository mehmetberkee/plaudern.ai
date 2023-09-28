import Link from "next/link";
import { FC } from "react";
const Header: FC = () => {
  return (
    <div>
      <header className="flex justify-between py-5 w-[1200px] mx-auto">
        <Link href="/" className="flex items-center">
          <div className="flex space-x-1 px-2 items-center">
            <h3 className="sm:text-3xl text-2xl font-bold text-white tracking-tight">
              plaudern.ai
            </h3>
          </div>
        </Link>
        <div className="px-2 my-auto">
          <button className=" bg-[#2563EB] text-white rounded-md px-6 py-2">
            Star on Github
          </button>
        </div>
      </header>
      <hr className="w-[1200px] mx-auto" />
    </div>
  );
};

export default Header;
