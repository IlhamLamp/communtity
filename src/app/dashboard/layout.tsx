import Menu from "@/components/SideBarMenu";
import Navbar from "@/components/NavBarMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      {/* NAVBAR */}
      <Navbar />
      <div className="flex flex-1 mt-14">
        {/* SIDEBAR */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] h-full fixed top-14 left-0 p-4 bg-gray-100 overflow-y-auto">
          <Menu />
        </div>
        {/* CONTENT */}
        <div className="ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%] w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
