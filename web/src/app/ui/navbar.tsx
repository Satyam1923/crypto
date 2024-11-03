"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout());
      setDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("Error logging out. Please try again."); 
    }
  }, [dispatch, router]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    if (!user) {
      closeDropdown();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown") && isDropdownOpen) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex justify-between h-12 w-full items-center px-4 border bg-black text-white">
      <ul className="flex w-full justify-between">
        <li>
          <Link href="/" className="flex-initial m-4" aria-label="Home">
            <div className="flex gap-4 justify-center items-center">
              <IoHomeOutline />
              Home
            </div>
          </Link>
        </li>
        <li className="relative mt-1 dropdown">
          <button
            onClick={toggleDropdown}
            className="flex-initial m-4 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            aria-label="User menu"
          >
            {user && isMounted && user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="User profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <FaUserCircle className="w-8 h-8" />
            )}
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 border rounded shadow-lg z-10 transition duration-200 ease-in-out"
              style={{
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              {user ? (
                <div className="p-2">
                  <p className="font-semibold">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition duration-150"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition duration-150"
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
