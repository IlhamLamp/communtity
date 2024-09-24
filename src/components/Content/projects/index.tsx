'use client';

import ProjectIntroCard from "@/components/Cards/ProjectIntroCard/indext";
import { projectIntroCards } from "./data";

const ContentProjects: React.FC = () => {

    return (
        <section className="w-full">
            <div className="">
                <h1>Hey there!</h1>
                <ProjectIntroCard cards={projectIntroCards}/>
            </div>
        </section>
    );
}

export default ContentProjects;