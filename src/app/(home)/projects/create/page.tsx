import Breadcrumbs from "@/components/Breadcrumbs";
import CreateProjectForm from "@/components/Form/CreateProjectForm";

const CreateProjectsPage: React.FC = () => {
  return (
    <section className="bg-Navy w-full min-h-screen p-4">
      <div id="breadcrumbsProjects" className="lg:mt-2">
        <Breadcrumbs />
      </div>
      <div id="createProjectsContent" className="mx-8">
        <CreateProjectForm />
      </div>
    </section>
  );
};

export default CreateProjectsPage;
