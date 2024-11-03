"use client";

import HeroIntroCard from "@/components/Cards/HeroIntroCard";
import FilterContentModal from "@/components/Modal/FilterContentModal";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { filterData } from "./data";
import ProjectCard from "@/components/Cards/ProjectCard";

const ContentProjects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>(filterData);
  const [visibleProjects, setVisibleProjects] = useState<number>(5); // State to track visible project cards
  const allProjects = Array(15).fill(null);

  const filterCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== "";
  }).length;

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const showMoreProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibleProjects((prevVisibleProjects) => prevVisibleProjects + 5);
  };

  return (
    <section className="w-full p-4">
      <div id="projectsHero" className="w-full">
        <HeroIntroCard />
      </div>
      <div id="mainProjectsContent" className="mt-6">
        <div id="projects" className="w-full">
          <h1 className="text-white text-2xl font-semibold tracking-wider">
            YOUR PROJECTS
          </h1>
          <div className="flex justify-between mt-4">
            <div className="flex flex-row gap-2">
              <button className="inline-block text-sm bg-white text-black font-semibold py-2 px-4 rounded-full focus:outline-none">
                All
              </button>
              <button className="inline-block text-sm bg-white text-black font-semibold py-2 px-4 rounded-full focus:outline-none">
                Applied
              </button>
              <button className="inline-block text-sm bg-white text-black font-semibold py-2 px-4 rounded-full focus:outline-none">
                Saved
              </button>
            </div>
            <div className="relative">
              <button
                className="flex gap-2 bg-white rounded-full py-2 px-4 items-center hover:bg-Gray transition ease-linear"
                onClick={toggleModal}
              >
                <FontAwesomeIcon
                  icon={faSliders}
                  className="font-semibold text-lg"
                />
                <span className="text-sm font-semibold">filters</span>
              </button>
              {filterCount > 0 && (
                <span className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {filterCount}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {allProjects.slice(0, visibleProjects).map((_, index) => (
              <ProjectCard key={index} />
            ))}
          </div>
          {visibleProjects < allProjects.length && (
            <div className="flex justify-center mt-4">
              <button
                className="inline-block text-sm bg-white text-black font-semibold py-2 px-4 rounded-full focus:outline-none hover:bg-gray-200"
                onClick={showMoreProjects}
              >
                Show More
              </button>
            </div>
          )}
        </div>
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

export default ContentProjects;
