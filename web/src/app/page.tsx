import { Card } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center bg-no-repeat">
      <div className="bg-opacity-70 w-full min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
        <Image
          src="/img/logo.svg"
          width={400}
          height={400}
          alt="this is our logo"
          className="animate-scale-up"
        />
        <h1 className="m-2 text-7xl font-medium text-white animate-slide-down">VeriDoc</h1>
        <h2 className="m-2 text-xl text-center max-w-4xl text-white animate-fade-in">
          VeriDoc is a web application designed to simplify the process of
          uploading, processing, and managing PDF documents. The application
          utilizes the Next framework, Redux for state management, and
          Material-UI for responsive design components, providing users with a
          sleek and user-friendly interface.
        </h2>
        <button className="m-6 text-xl backdrop-blur-lg bg-black/60 h-10 text-white w-40 rounded-xl hover:bg-black/80 hover:scale-105 transition duration-300">
          <Link href="/dashboard">Start</Link>
        </button>
      </div>
    </div>
  );
}
