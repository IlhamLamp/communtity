import Menu from "@/components/SideBarMenu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 overflow-y-auto">
        <div className="sticky top-0 z-20">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2"
          >
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold">SchooLama</span>
          </Link>
          <Menu />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] flex flex-col">
        <div className="w-[84%] md:w-[92%] lg:w-[84%] xl:w-[84%] fixed top-0 z-10">
          <Navbar />
        </div>
        <div className="mt-16 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
