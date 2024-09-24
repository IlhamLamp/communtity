'use client';
import SideBarMenu from "@/components/SideBarMenu";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { usePathname } from 'next/navigation';  // Import usePathname

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const pathname = usePathname(); // Get current path

  // Check if the current path matches the desired routes
  const showTestDiv = pathname === '/projects' || pathname === '/group';

  return (
    <div className="h-screen flex flex-1 mt-12 md:mt-14">
      {/* SIDEBAR */}
      <div
        className={`${
          isExpanded ? "md:w-[16%] lg:w-[16%] xl:w-[14%]" : "md:w-[5%] lg:w-[5%] xl:w-[5%]"
        } transition-all duration-300 hidden md:block h-full fixed top-14 left-0 p-4 bg-gray-50 overflow-y-auto`}
      >
        <SideBarMenu isExpanded={isExpanded} />
        {/* Tombol Expand/Collapse */}
        <button
          onClick={toggleSidebar}
          className={`absolute -right-0 top-4 p-2 ${isExpanded ? 'w-1/4' : 'w-full'}`}
        >
          <FontAwesomeIcon icon={isExpanded ? faAngleDoubleLeft : faAngleDoubleRight} className="text-Navy" />
        </button>
      </div>
      {/* CONTENT */}
      <div
        className={`${
          isExpanded ? "md:ml-[16%] lg:ml-[16%] xl:ml-[14%]" : "md:ml-[5%] lg:ml-[5%] xl:ml-[5%]"
        } flex-1 transition-all duration-300 bg-gray-100`}
      >
        {children}
      </div>
      {/* DIV TEST */}
      {showTestDiv && (
        <div className="hidden md:block w-[20%] bg-gray-300">
          test
        </div>
      )}
    </div>
  );
}
