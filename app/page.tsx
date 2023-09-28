import Link from "next/link";
import SquigglyLines from "./components/SquigglyLines";
import Header from "./components/Header";
export default function Home() {
  return (
    <div className=" bg-[#17181C]">
      <Header />
      <div className="flex flex-1 flex-col justify-center items-center h-[calc(100vh-88px)] text-center px-4 ">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Learn German by Chatting with the{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">Stars of History</span>
          </span>{" "}
        </h1>
        <h2 className="mx-auto mt-12 mb-6 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Engage in immersive conversations with iconic personalities, from
          Goethe to Merkel, and elevate your language skills seamlessly.
        </h2>
        <div className="flex justify-center items-center space-x-2  ">
          <Link
            href="whisper"
            className="bg-[#2563EB] text-white rounded-md px-6 py-2 hover:bg-blue-500 transition-all"
          >
            Try for free
          </Link>
        </div>
      </div>
    </div>
  );
}
