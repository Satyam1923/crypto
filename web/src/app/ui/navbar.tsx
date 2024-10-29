
import { useState } from "react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex justify-between h-12 w-full items-center px-4 border">
      <ul className="flex w-full justify-between">
        <li>
          <Link href="/" className="flex-initial m-4">
            <div className="flex gap-4 justify-center items-center">
              <IoHomeOutline />
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link href="/user" className="flex-initial m-4">
            <FaUserCircle />
          </Link>
        </li>
      </ul>
    </div>
  );
}
