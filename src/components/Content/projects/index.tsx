'use client';

import HeroIntroCard from "@/components/Cards/HeroIntroCard";

const ContentProjects: React.FC = () => {

    return (
        <section className="w-full p-4">
            <div id="projectsHero" className="flex w-[80%]">
                <HeroIntroCard />
            </div>
        </section>
    );
}

export default ContentProjects;