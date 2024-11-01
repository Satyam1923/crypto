import { Card } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <Image
        src="/img/rab.png"
        width={400}
        height={400}
        alt="this is our logo"
        className="m-4"
      />
      <h1 className="m-2 text-7xl text-white">Rabbitude</h1>
      <h2 className="m-2 text-2xl text-white">Free the rabbit</h2>
      <button className="m-6 text-xl bg-white h-10 text-black w-1/3 rounded-md">
        <Link href="/start">Start</Link>
      </button>
    </div>
  );
}
