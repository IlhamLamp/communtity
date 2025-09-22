import { ProjectMockData } from "@/data/project.mockup";
import MainMenuLayout from "@/layouts/MainMenuLayout";

const ProjectsPage: React.FC = () => {
  const filterData = {
    types: "",
    tags: [],
    role: "",
    location: "",
    duration: "",
    participation: "",
    experience: "",
  };

  return (
    <div className="bg-Navy">
      <MainMenuLayout
        data={ProjectMockData}
        filterData={filterData}
        title="Projects"
      />
    </div>
  );
};

export default ProjectsPage;
