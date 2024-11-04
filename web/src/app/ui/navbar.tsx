"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdHome } from "react-icons/md";
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
    <div className="sticky top-2 z-50 rounded-2xl bg-black/70 backdrop-blur-2xl shadow-lg w-2/4 mx-auto">
      <div className="flex justify-center items-center h-12 px-4 mx-auto">
        <div className="flex justify-between w-full items-center text-white">
          <ul className="flex w-full justify-between">
            <li>
              <Link href="/" className="flex-initial m-4" aria-label="Home">
                <div className="flex gap-2 items-center hover:scale-105 transition-transform duration-200 ease-in-out">
                  <MdHome
                    size={30}
                    className="hover:text-gray-300 transition-colors duration-200"
                  />
                </div>
              </Link>
            </li>
            <li className="relative mt-2 dropdown">
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
                    className="rounded-full hover:scale-105 transition-transform duration-200 ease-in-out"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 hover:text-gray-300 transition-colors duration-200" />
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-50 rounded-lg shadow-lg z-10 backdrop-blur-lg bg-black/60 border border-gray-700 transition-opacity duration-200 ease-in-out opacity-100">
                  {user ? (
                    <div className="p-2">
                      <p className="font-semibold">{user.email}</p>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 hover:scale-105 transition-all duration-150 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 hover:scale-105 transition-all duration-150 rounded-lg"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
