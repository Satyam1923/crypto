"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    setDropdownOpen(false);
    router.push("/");
  };

  useEffect(() => {
    if (!user) {
      setDropdownOpen(false);
    }
  }, [user]);

  return (
    <div className="flex sticky top-0 justify-between h-12 w-full items-center px-4 border">
      <ul className="flex w-full justify-between">
        <li>
          <Link href="/" className="flex-initial m-4">
            <div className="flex gap-4 justify-center items-center">
              <IoHomeOutline />
              Home
            </div>
          </Link>
        </li>
        <li className="relative mt-3">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown
            className="flex-initial m-4 focus:outline-none"
          >
            {user ? (
              <p className="font-semibold">{user.email}</p>
            ) : (
              <FaUserCircle />
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 border rounded shadow-lg z-10">
              {user ? (
                <div className="p-2">
                  <p className="font-semibold">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block w-full text-left px-4 py-2"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
