"use client";
import {
  faBell,
  faMagnifyingGlass,
  faRightFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navMenuItems } from "./data";
import { usePathname } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";

const Header = () => {
  const path = usePathname();
  const [inputSearchFocused, setInputSearchFocused] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isProfileMobileClicked, setIsProfileMobileClicked] =
    useState<boolean>(false);
  const [isNotifMobileClicked, setIsNotifMobileClicked] =
    useState<boolean>(false);

  const { isLogin } = useAuthCheck();

  const displayNone = {
    display: path === "/signup" || path === "/login" ? "hidden" : "flex",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-20 bg-white flex flex-row items-center justify-between px-4 py-2 md:py-0 transition-all ease-in-out ${
        isScrolled ? "shadow-lg" : "shadow-none"
      }`}
      style={{
        padding: path === "/signup" || path === "/login" ? "py-4" : "py-2",
      }}
    >
      <Link href="/" className="basis-1/5 flex items-center gap-2 lg:p-2">
        <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
        <span className="font-bold text-lg">Communtity</span>
      </Link>

      {/* sembunyikan ini di tampilan mobile */}
      <div className="hidden lg:flex basis-3/5 items-center gap-2 justify-center w-full px-8">
        {isLogin &&
          navMenuItems.map((n) => {
            const isActive = path === n.href || path.startsWith(`${n.href}/`);

            return (
              <Link
                key={n.label}
                href={n.href}
                className={`w-1/5 flex justify-center p-4 border-b-[6px] ${
                  isActive ? "border-Navy" : "border-transparent"
                }`}
              >
                <FontAwesomeIcon
                  icon={n.icon}
                  size="xl"
                  style={{ color: "#424874" }}
                />
              </Link>
            );
          })}
      </div>

      <div className="basis-1/5 flex items-center gap-2 lg:gap-6 justify-between lg:justify-end w-full lg:p-2">
        <div className="hidden md:flex justify-end items-center w-64">
          <div className="relative">
            <input
              type="text"
              className={`bg-Gray h-10 px-5 pr-10 rounded-full text-sm focus:outline-none transition-all duration-300 ease-in-out ${
                inputSearchFocused ? "w-60" : "w-14"
              }`}
              placeholder="Search..."
              onFocus={() => setInputSearchFocused(true)}
              onBlur={() => setInputSearchFocused(false)}
            />
            <button type="submit" className="absolute right-0 top-0 mr-3 pt-2">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-lg text-Navy"
              />
            </button>
          </div>
        </div>

        {/* NOTIFICATION */}
        {isLogin && (
          <div className="group" style={displayNone}>
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
              <FontAwesomeIcon
                icon={faBell}
                className="text-lg lg:text-2xl"
                style={{ color: "#424874" }}
              />
              <div className="absolute -top-2 md:-top-3 -right-2 w-5 h-5 flex items-center justify-center bg-Yellow text-Navy font-semibold rounded-full text-xs">
                1
              </div>
            </div>
            {/* DROPDOWN */}
            <div className="hidden lg:block absolute mr-2 right-16 top-14 bg-Purple shadow-md rounded-md invisible group-hover:visible transition ease-in-out duration-300">
              <div className="absolute right-4 -top-0.5 w-6 h-6 bg-Purple transform rotate-45 origin-bottom-right z-10" />
              <div className="py-1 px-2 z-30 text-left">
                <Link
                  href="#"
                  className="w-full block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="w-full px-8">Option 1</span>
                </Link>
                <Link
                  href="#"
                  className="w-full block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="w-full px-8">Option 2</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <Image
          src="/assets/avatar.png"
          alt="avatar"
          width={36}
          height={36}
          className="hidden md:block rounded-full"
        />
        {/* PROFILE ICON FOR MOBILE - TOGGLE MENU */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsProfileMobileClicked(!isProfileMobileClicked)}
          >
            <Image
              src="/assets/avatar.png"
              alt="avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
          </button>
        </div>

        {/* DROPDOWN PROFILE CLICKED FOR MOBILE */}
        {isProfileMobileClicked && (
          <div className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-start pt-10 md:hidden">
            <button
              onClick={() => setIsProfileMobileClicked(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="divide-y divide-slate-300 flex flex-col w-full">
              <div className="flex flex-row items-center gap-4 p-4">
                <Image
                  src="/assets/avatar.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-semibold">Profile</span>
              </div>
              <nav className="flex flex-col gap-4 w-full p-2">
                {navMenuItems.map((n) => (
                  <Link
                    key={n.label}
                    href={n.href}
                    onClick={() => setIsProfileMobileClicked(false)}
                    className="flex items-center gap-4 px-4 py-2"
                  >
                    <FontAwesomeIcon
                      icon={n.icon}
                      size="sm"
                      style={{ color: "#424874" }}
                    />
                    <span className="text-sm">{n.label}</span>
                  </Link>
                ))}
                <Link href={"#"} className="flex items-center gap-4 px-4 py-2">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    size="sm"
                    style={{ color: "#D24545" }}
                  />
                  <span className="text-sm text-Red">Logout</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
