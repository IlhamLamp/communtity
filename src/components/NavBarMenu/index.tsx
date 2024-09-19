'use client';
import { faBell, faMagnifyingGlass, faRightFromBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { navMenuItems } from "./data";

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isProfileMobileClicked, setIsProfileMobileClicked] = useState<boolean>(false);
  const [isNotifMobileClicked, setIsNotifMobileClicked] = useState<boolean>(false);

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
    <header className={`w-full fixed top-0 z-20 bg-white flex flex-row items-center justify-between px-4 py-2 md:py-0 transition-all ease-in-out ${isScrolled ? 'shadow-md' : 'shadow-none'}`}>

      <Link href="/" className="basis-1/5 flex items-center gap-2">
        <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
        <span className="font-bold text-lg">Communtity</span>
      </Link>

      {/* sembunyikan ini di tampilan mobile */}
      <div className="hidden md:flex basis-3/5 items-center gap-2 justify-center w-full px-8">
      { navMenuItems.map((n) => (
        <Link key={n.label} href={n.href} className="w-1/5 flex border-b-4 border-Navy p-4 justify-center">
          <FontAwesomeIcon icon={n.icon} size="xl" style={{color: '#424874'}}/>
        </Link>
      ))}
      </div>   
      
      <div className='basis-1/5 flex items-center gap-6 justify-end w-full'>
        {/* SEARCH BAR */}
        <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-slate-600 px-2'>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: '#424874'}}/>
          <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
        </div>
        {/* NOTIFICATION */}
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <FontAwesomeIcon icon={faBell} size="lg" style={{color: '#424874'}}/>
          <div className='absolute -top-2 md:-top-3 -right-3 w-5 h-5 flex items-center justify-center bg-Yellow text-Navy font-semibold rounded-full text-xs'>1</div>
        </div>

        <Image src="/assets/avatar.png" alt="avatar" width={36} height={36} className="hidden md:block rounded-full"/>
        {/* PROFILE ICON FOR MOBILE - TOGGLE MENU */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsProfileMobileClicked(!isProfileMobileClicked)}>
            <Image src="/assets/avatar.png" alt="avatar" width={36} height={36} className="rounded-full"/>
          </button>
        </div>
        {/* DROPDOWN PROFILE CLICKED FOR MOBILE */}
        { isProfileMobileClicked && (
          <div className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-start pt-12 md:hidden">
            <button onClick={() => setIsProfileMobileClicked(false)} className="absolute top-4 right-4 text-2xl">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="divide-y divide-slate-300 flex flex-col w-full">
              <div className="flex flex-row items-center gap-4 p-4">
                <Image src="/assets/avatar.png" alt="avatar" width={40} height={40} className="rounded-full"/>
                <span className="font-semibold">Profile</span>
              </div>
              <nav className="flex flex-col gap-4 w-full p-2">
              { navMenuItems.map((n) => (
                <Link key={n.label} href={n.href} className="flex items-center gap-4 px-4 py-2">
                  <FontAwesomeIcon icon={n.icon} size="sm" style={{color: '#424874'}}/>
                  <span className="text-sm">{n.label}</span>
                </Link>
              ))}
                <Link href={'#'} className="flex items-center gap-4 px-4 py-2">
                  <FontAwesomeIcon icon={faRightFromBracket} size="sm" style={{color: '#D24545'}}/>
                  <span className="text-sm text-Red">Logout</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar;