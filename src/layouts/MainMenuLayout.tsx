"use client";
import FilterContentModal from "@/components/Modal/FilterContentModal";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProjectCard from "@/components/Cards/ProjectCard";
import HeroIntroCard from "@/components/Cards/HeroIntroCard";
import Membership from "@/components/Cards/Membership";
import SummaryMenuItem from "@/components/Cards/SummaryMenuItem";

type TFilterData = {
  types: string;
  tags: { label: string; color: string }[];
  role: string;
  location: string;
  duration: string;
  participation: string;
  experience: string;
};

type TMainMenuLayoutProps = {
  filterData: TFilterData;
  title: string;
};

const MainMenuLayout: React.FC<TMainMenuLayoutProps> = ({
  filterData,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState(filterData);
  const [visibleItemData, setVisibleItemData] = useState<number>(5);
  const allItemData = Array(15).fill(null);

  const filterCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== "";
  }).length;

  const handleApplyFilters = (newFilters: TFilterData) => {
    setFilters(newFilters);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const showMoreProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibleItemData((prevVisibleItemData) => prevVisibleItemData + 5);
  };

  const showLessProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibleItemData(5);
  };

  return (
    <section className="w-full p-4">
      <div id="projectsHero" className="w-full">
        <HeroIntroCard />
      </div>
      <div id="mainItemContent" className="mt-4">
        <div id="itemHeader" className="w-full">
          <h1 className="text-white text-xl lg:text-2xl font-semibold tracking-wider uppercase">
            your {title}
          </h1>
          <div className="flex justify-between mt-4">
            <div className="flex flex-row gap-2">
              <button className="inline-block text-xs lg:text-sm bg-white text-black font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-full focus:outline-none">
                All
              </button>
              <button className="inline-block text-xs lg:text-sm bg-white text-black font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-full focus:outline-none">
                Active
              </button>
              <button className="inline-block text-xs lg:text-sm bg-white text-black font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-full focus:outline-none">
                Applied
              </button>
              <button className="inline-block text-xs lg:text-sm bg-white text-black font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-full focus:outline-none">
                Saved
              </button>
            </div>
            <div className="relative">
              <button
                className="flex gap-2 bg-white rounded-full py-1 lg:py-2 px-2 lg:px-4 items-center hover:bg-Gray transition ease-linear"
                onClick={toggleModal}
              >
                <FontAwesomeIcon
                  icon={faSliders}
                  className="font-semibold text-xs lg:text-lg"
                />
                <span className="text-xs lg:text-sm font-semibold">
                  filters
                </span>
              </button>
              {filterCount > 0 && (
                <span className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {filterCount}
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          id="cardContent"
          className="flex flex-col gap-2 mt-4 overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 300px)",
          }}
        >
          {allItemData.slice(0, visibleItemData).map((_, index) => (
            <ProjectCard key={index} />
          ))}
        </div>
        {visibleItemData < allItemData.length && (
          <div className="flex justify-center mt-4">
            <button
              className="inline-block text-xs lg:text-sm bg-white text-black font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-full focus:outline-none hover:bg-gray-200"
              onClick={showMoreProjects}
            >
              Show More
            </button>
          </div>
        )}
        {visibleItemData === allItemData.length && (
          <div className="flex justify-center mt-4">
            <button
              className="inline-block text-xs lg:text-sm bg-white text-black font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-full focus:outline-none hover:bg-gray-200"
              onClick={showLessProjects}
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      <div id="summaryItemContent">
        <div id="summaryHeader" className="w-full mt-4">
          <h1 className="text-white text-2xl font-semibold tracking-wider uppercase">
            summary
          </h1>
        </div>
        <SummaryMenuItem />
        <Membership />
      </div>

      {isModalOpen && (
        <FilterContentModal
          data={filters}
          toggle={toggleModal}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </section>
  );
};

export default MainMenuLayout;
