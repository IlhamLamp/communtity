import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ProjectsRightBar: React.FC = () => {
    return (
        <div className="bg-Navy h-screen p-4">
            <div className="flex flex-col gap-6">
                {/* CREATE */}
                <div id="createProject">
                    <h1 className="text-white text-xl font-semibold text-uppercase tracking-wider text-left">Or Starting Now</h1>
                    <div className="flex mx-auto items-center justify-center mt-4">
                        <div className="relative inline-flex group w-full justify-center">
                            <div className="absolute transition-all duration-1000 opacity-40 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-pulse" />
                            <Link href={'#'} className="relative flex gap-2 w-full items-center justify-center px-4 py-2 text-sm bg-black opacity-20 text-gray-300 hover:text-gray-100 hover:opacity-70 transition-all duration-200 rounded-lg ease-linear">
                                <span>Create</span>
                                <FontAwesomeIcon icon={faPlus} />
                            </Link>
                        </div>
                    </div>
                </div>
                {/* MOST VIEWED */}
                <div id="mostViewed">
                    <h1 className="text-white text-xl font-semibold text-uppercase tracking-wider text-left">Most Viewed</h1>
                    <div className="">
                        <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg mb-4">
                            <div className="flex items-center">
                                <img src="/assets/avatar.png" alt='avatar' className="rounded-full w-12 h-12" />
                                <div className="ml-4">
                                    <h3 className="text-white text-lg font-semibold">Name</h3>
                                    <p className="text-gray-400 text-sm">followers</p>
                                </div>
                            </div>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-500 focus:outline-none">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsRightBar;