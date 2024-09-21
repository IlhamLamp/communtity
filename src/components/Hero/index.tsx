import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import HeroCategoryGroup from "../Buttons/Category";

const Hero: React.FC = () => {
    return (
        <section className="relative h-[420px] bg-gradient-to-b from-Navy to-gray-100">
            <div className="py-14">
                <div className="flex flex-col gap-4 justify-center items-center w-full px-3 md:px-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white drop-shadow-lg">Communtity</h1>
                    <p className="w-[300px] lg:w-1/3 text-center text-gray-300 text-sm lg:text-lg">For everyone when seeking common interests. Still confused ? <Link href={'/'} className="text-gray-200 hover:text-Navy hover:border-Navy transition ease-in-out duration-200 border-b-2">just take a look.</Link></p>
                    <div className="relative p-3 w-full max-w-lg">
                        <input type="text" className="rounded-full w-full py-3 pr-10 pl-5 shadow-xl text-sm text-Navy focus:outline-none focus:ring focus:ring-Navy transition ease-in-out duration-300" placeholder="Search by title, skills, events, etc" />
                        <button type="submit" className="absolute right-6 top-6">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-Navy text-xl" />
                        </button>
                    </div>
                    <HeroCategoryGroup />
                </div>
            </div>
        </section>
    )
}

export default Hero;