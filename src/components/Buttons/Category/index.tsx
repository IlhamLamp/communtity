import Link from "next/link";

const HeroCategoryGroup: React.FC = () => {
    return (
        <nav className="flex w-full lg:w-1/2 gap-3 flex-wrap justify-center">
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">For you</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">IT</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Marketing</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Design</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Health</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Sport</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Food</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Education</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Literacy</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Gaming</Link>
            <Link className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline" href="/react">Other</Link>
        </nav>
    )
}

export default HeroCategoryGroup;