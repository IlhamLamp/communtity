"use client";
import {
  faBell,
  faMagnifyingGlass,
  faPowerOff,
  faRightFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navMenuItems } from "./data";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { LogoutService } from "@/api/authentication";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();
  const path = usePathname();
  const { isLogin, clearAuthData } = useAuth();
  const { profile, setProfile } = useProfile();
  const [inputSearchFocused, setInputSearchFocused] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isProfileMobileClicked, setIsProfileMobileClicked] =
    useState<boolean>(false);

  const displayNone = {
    display: path === "/signup" || path === "/login" ? "hidden" : "flex",
  };

  const displayName = profile?.last_name
    ? `${profile.first_name} ${profile.last_name}`
    : profile?.first_name;

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    try {
      if (confirmLogout) {
        await LogoutService();
        toast.success("Succesfully Logout!", {
          duration: 4000,
        });
        setProfile(null);
        clearAuthData();
        return router.push("/login");
      } else {
        return toast.dismiss();
      }
    } finally {
      setIsProfileMobileClicked(!isProfileMobileClicked);
    }
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
      <Link href="/" className="basis-1/5 flex items-center">
        <img
          className="w-full scale-150 lg:scale-100 lg:w-1/2"
          src="/assets/dark-logo-full.png"
          alt="logo"
        />
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
              <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2  w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center bg-Yellow text-Navy font-semibold rounded-full text-xs">
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
        <div className="hidden md:block md:flex-shrink-0 ml-2 cursor-pointer">
          <Link href={"/profile"}>
            <img
              src={profile?.profile_picture || "/assets/avatar.png"}
              alt={profile?.first_name || "avatar"}
              className="rounded-full object-cover w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] shadow-xl"
            />
          </Link>
        </div>
        {/* PROFILE ICON FOR MOBILE - TOGGLE MENU */}
        <div className="flex w-full md:hidden items-center justify-end">
          <button
            onClick={() => setIsProfileMobileClicked(!isProfileMobileClicked)}
          >
            <img
              src={profile?.profile_picture || "/assets/avatar.png"}
              alt={profile?.first_name || "avatar"}
              className="rounded-full object-cover w-[2rem] h-[2rem] shadow-xl"
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
                <Link
                  href="/profile"
                  onClick={() =>
                    setIsProfileMobileClicked(!isProfileMobileClicked)
                  }
                >
                  <img
                    src={profile?.profile_picture || "/assets/avatar.png"}
                    alt={profile?.first_name || "avatar"}
                    className="rounded-full object-cover w-[3rem] h-[3rem] shadow-xl"
                  />
                </Link>
                <span className="font-semibold">
                  {displayName ?? "Please login"}
                </span>
              </div>
              <nav className="flex flex-col gap-4 w-full p-2">
                {isLogin ? (
                  <>
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
                    <button
                      onClick={handleLogout}
                      type="submit"
                      className="flex items-center gap-4 px-4 py-2"
                    >
                      <FontAwesomeIcon
                        icon={faPowerOff}
                        size="sm"
                        style={{ color: "#D24545" }}
                      />
                      <span className="text-sm text-Red">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsProfileMobileClicked(false)}
                    className="flex items-center gap-4 px-4 py-2 text-gray-500"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} size="sm" />
                    <span className="text-sm">Login</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
