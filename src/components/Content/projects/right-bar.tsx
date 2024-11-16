import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const ProjectsRightBar: React.FC = () => {
  const mostViewedData = Array(5).fill(null);
  const mostSearchedData = Array(6).fill(null);

  return (
    <div className="bg-Navy h-screen p-4">
      <div className="flex flex-col gap-6">
        {/* CREATE */}
        <div id="createProject">
          <h1 className="text-white text-xl font-semibold uppercase tracking-wider text-left">
            Or Starting Now
          </h1>
          <div className="flex mx-auto items-center justify-center mt-4">
            <div className="relative inline-flex group w-full justify-center">
              <div className="absolute transition-all duration-1000 opacity-40 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-pulse" />
              <Link
                href={"/projects/create/"}
                className="relative flex gap-2 w-full items-center justify-center px-4 py-2 text-sm bg-black opacity-20 text-gray-300 hover:text-gray-100 hover:opacity-70 transition-all duration-200 rounded-lg ease-linear"
              >
                <span>Create</span>
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </div>
          </div>
        </div>
        {/* MOST VIEWED */}
        <div id="mostViewed">
          <h1 className="text-white text-xl font-semibold uppercase tracking-wider text-left">
            Most Viewed
          </h1>
          <div className="flex flex-col mt-4 gap-4">
            {mostViewedData.map((_: any, index: number) => (
              <div className="flex items-center justify-between" key={index}>
                <div className="flex items-center">
                  <Image
                    src="/assets/avatar.png"
                    alt="avatar"
                    className="rounded-full w-10 h-10"
                    width={200}
                    height={200}
                  />
                  <div className="ml-4">
                    <h3 className="text-white text-sm font-semibold">Role</h3>
                    <p className="text-gray-400 text-sm">duration</p>
                  </div>
                </div>
                <button className="bg-black opacity-50 text-white p-2 rounded-full text-xs hover:opacity-75 focus:outline-none">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* MOST SEARCHED */}
        <div id="mostSearched">
          <h1 className="text-white text-xl font-semibold uppercase tracking-wider text-left">
            Most Searched
          </h1>
          <div className="flex flex-wrap mt-4 gap-2">
            {mostSearchedData.map((_: any, index: number) => (
              <div className="group relative inline-flex" key={index}>
                <div className="absolute transition-all duration-1000 opacity-40 -inset-px bg-gradient-to-r from-[#44BCFF] rounded-full blur-sm group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-pulse" />
                <Link
                  href={"#"}
                  className="relative flex gap-2 w-full items-center justify-center px-2 py-1 text-xs bg-black opacity-20 text-gray-300 hover:text-gray-100 hover:opacity-70 transition-all duration-200 rounded-full ease-linear"
                >
                  <span>Tech</span>
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsRightBar;
