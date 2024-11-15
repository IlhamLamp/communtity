"use client";
import { filterData } from "@/components/Buttons/data";
import HeroFilterBtn from "@/components/Buttons/HeroFilterBtn";
import MainSortBtn from "@/components/Buttons/MainSortBtn";
import { useState } from "react";
import { workContentData } from "./data";
import HomepageWorkCard from "@/components/Cards/HomepageWorkCard";

type TWorkContentData = {
  id: number;
  company: string;
  position: string;
  date: string;
  location: string;
  username: string;
  avatar: string;
  types: string;
  duration: string;
  experience: string;
  participation: string;
  bg_color: string;
  is_saved: boolean;
};

const ContentHome: React.FC = () => {
  const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null);
  const [resetKey, setResetKey] = useState<number>(0);

  const toggleDropdown = (id: number) => {
    setSelectedDropdown(selectedDropdown === id ? null : id);
  };

  const resetDropdowns = () => {
    setResetKey((prevKey) => prevKey + 1);
    setSelectedDropdown(null);
  };

  return (
    <section className="mx-8">
      {/* FILTER CATEGORY ON DESKTOP */}
      <div id="mainWorkFilter" className="hidden lg:block">
        <div className="items-center justify-center rounded-md bg-white shadow-lg">
          <div className="flex flex-row items-center gap-2 w-full p-4">
            <div className="flex flex-row gap-2 w-3/4">
              {filterData.map((data) => (
                <HeroFilterBtn
                  key={data.id}
                  data={data}
                  isOpen={selectedDropdown === data.id}
                  toggleDropdown={() => toggleDropdown(data.id)}
                  resetKey={resetKey}
                />
              ))}
            </div>
            <div className="flex w-1/4 items-end justify-end">
              <button
                onClick={resetDropdowns}
                className="px-4 py-2 bg-Red text-white rounded-lg hover:bg-red-500 transition ease-linear duration-100"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between my-6">
          <div className="flex items-center text-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-Navy">
              Recommended Jobs
            </h1>
            <h1 className="">Button Result</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <MainSortBtn />
          </div>
        </div>
      </div>
      {/* RESULT CONTENT */}
      <div id="mainWorkContent" className="">
        <div className="flex lg:hidden w-full"></div>
        <div className="flex w-full items-center">
          <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {workContentData.map((data: TWorkContentData) => (
              <HomepageWorkCard key={data?.id} data={data} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHome;
