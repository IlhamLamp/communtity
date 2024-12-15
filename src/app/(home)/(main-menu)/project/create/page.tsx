import Breadcrumbs from "@/components/Breadcrumbs";
import MainMenuEditableForm from "@/components/Form/MainMenuEditableForm";

const CreateProjectsPage: React.FC = () => {
  return (
    <section className="bg-Navy w-full min-h-screen p-4">
      <div id="breadcrumbsProjects" className="lg:mt-3">
        <Breadcrumbs />
      </div>
      <div id="createProjectsContent" className="mx-8">
        <MainMenuEditableForm />
      </div>
    </section>
  );
};

export default CreateProjectsPage;
