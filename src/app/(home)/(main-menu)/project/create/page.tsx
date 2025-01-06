"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ProjectFormStep2 } from "@/components/Form/main-menu/project/general-info";
import { ProjectFormStep1 } from "@/components/Form/main-menu/project/project-title";
import { ProjectFormStep3 } from "@/components/Form/main-menu/project/tags-extras";
import MainMenuEditableForm from "@/components/Form/MainMenuEditableForm";
import { useMainMenu } from "@/context/MainMenuContext";

const CreateProjectsPage: React.FC = () => {
  const { itemData } = useMainMenu();
  return (
    <section className="bg-Navy w-full min-h-screen p-2 lg:p-4">
      <div id="breadcrumbsProjects" className="lg:mt-3">
        <Breadcrumbs />
      </div>
      <div id="createProjectsContent" className="lg:mx-8">
        <MainMenuEditableForm
          title="Create Projects"
          description="Define your project details with this step-by-step process"
          steps={["Project Title", "General Info", "Tags & Extras"]}
        >
          <ProjectFormStep1 data={itemData} />
          <ProjectFormStep2 data={itemData} />
          <ProjectFormStep3 data={itemData} />
        </MainMenuEditableForm>
      </div>
    </section>
  );
};

export default CreateProjectsPage;
