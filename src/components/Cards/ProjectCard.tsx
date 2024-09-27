import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ProjectCard: React.FC= () => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 lg:p-4 hover:shadow-lg hover:shadow-gray-700 transition ease-linear">
        <div className="flex flex-row gap-4 lg:gap-6 items-center">
            <div className="w-[20%] lg:w-[15%] items-center">
                <div className="flex bg-gray-500 bg-opacity-30 rounded-lg justify-center p-2">
                    <img src="/assets/avatar.png" className="rounded-full w-20 h-10 lg:h-20" width={32} height={32} />
                </div>
            </div>
            <div className="w-full max-w-[80%] lg:max-w-[85%] lg:py-2 items-center flex flex-row">
                <div className="w-full max-w-[2/5]">
                    <h1 className="text-white text-sm lg:text-md">DevOps Engineer</h1>
                    <div className="flex flex-row gap-2 text-xs lg:text-sm text-gray-500">
                        <h5>Company</h5>
                        <span>&#8226;</span>
                        <h1>Participation</h1>
                    </div>
                    <div className="pt-2 lg:pt-4 flex flex-row gap-2 text-xs text-gray-600">
                        <span className="border border-slate-800 py-1 px-2 rounded-full">Duration</span>
                        <span className="border border-slate-800 py-1 px-2 rounded-full">Tags</span>
                        <span className="border border-slate-800 py-1 px-2 rounded-full">Tags</span>
                    </div>
                </div>
                <div className="flex w-full max-w-2/5 justify-end items-center">
                    {/* MOBILE */}
                    <div className="block lg:hidden bg-Yellow rounded-full p-2"/>
                    {/* DESKTOP */}
                    <div className="hidden lg:block bg-Yellow rounded-full text-sm p-2">
                        on progress
                    </div>
                </div>
                <div className="w-full max-w-1/5 hidden lg:flex items-center ml-auto">
                    <div className="group w-full mx-auto relative"> 
                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-white cursor-pointer absolute -top-10 right-0" size="lg" />
                        <div className="invisible group-hover:visible transition ease-in-out absolute origin-bottom-right -top-6 right-0">
                            <div className="py-1 px-2 z-30 text-left bg-gray-100 rounded-lg">
                                <Link href="#" className="w-full block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="w-full px-8">Option 1</span>
                                </Link>
                                <Link href="#" className="w-full block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="w-full px-8">Option 2</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard;
