import Link from "next/link";
import { heroCategoryGroupData } from "./data";

type THeroCategoryGroupData = {
  id: number;
  name: string;
  link: string;
};

const HeroCategoryGroup: React.FC = () => {
  return (
    <nav className="flex w-full lg:w-1/2 gap-3 flex-wrap justify-center">
      {heroCategoryGroupData.map((data: THeroCategoryGroupData) => (
        <Link
          key={data.id}
          className="text-center text-xs inline-block w-20 rounded-full bg-blue-800 bg-opacity-10 p-2 font-medium text-Navy duration-200 hover:bg-opacity-95 hover:text-white hover:bg-Navy hover:no-underline"
          href={data.link}
        >
          {data.name}
        </Link>
      ))}
    </nav>
  );
};

export default HeroCategoryGroup;
