'use client';
import SideBarMenu from "@/components/SideBarMenu";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { usePathname } from 'next/navigation'; 
import RightBarMenu from "@/components/RightBarMenu";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const validPath = pathname === '/projects' || pathname === '/group';

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="h-screen flex flex-1 mt-12 md:mt-14">
      {/* LEFT-BAR */}
      <div className={`${ isExpanded ? "w-[16%]" : "w-[5%]" } transition-all duration-300 hidden md:block h-full fixed top-14 left-0 p-4 bg-gray-50 overflow-y-auto`}>
        <SideBarMenu isExpanded={isExpanded} />
        <button onClick={toggleSidebar} className={`absolute -right-0 top-4 p-2 ${isExpanded ? 'w-1/4' : 'w-full'}`}>
          <FontAwesomeIcon icon={isExpanded ? faAngleDoubleLeft : faAngleDoubleRight} className="text-Navy" />
        </button>
      </div>
      {/* CONTENT */}
      <div className={`flex-1 transition-all duration-300 bg-gray-100 ${ isExpanded ? "lg:ml-[16%]" : "lg:ml-[5%]"} ${ validPath ? "lg:mr-[20%]" : "mr-0"}`} >
        {children}
      </div>
      {/* RIGHT-BAR */}
      {validPath && (
        <div className="hidden md:block w-[20%] bg-gray-300 fixed top-14 right-0 h-[calc(100%-3.5rem)]">
          <RightBarMenu />
        </div>
      )}
    </div>
  );
}
