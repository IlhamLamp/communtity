'use client';

import HeroIntroCard from "@/components/Cards/HeroIntroCard";
import FilterContentModal from "@/components/Modal/FilterContentModal";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { projectsData } from "./data";

const ContentProjects: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <section className="w-full p-4">
            <div id="projectsHero" className="w-full">
                <HeroIntroCard />
            </div>
            <div id="mainProjectsContent" className="mt-6">
                <div id='projects' className="w-full">
                    <h1 className="text-white text-2xl font-semibold tracking-wider">YOUR PROJECTS</h1>
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
                        <div>
                            <button className="flex gap-2 bg-white rounded-full py-2 px-4 items-center" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faSliders} className="font-semibold text-lg" />
                                <span className="text-sm font-semibold">filters</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            { isModalOpen && (
                <FilterContentModal data={projectsData.data} toggle={toggleModal} />
            )}
        </section>
    );
}

export default ContentProjects;