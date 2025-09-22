import { ProjectMockData } from "@/data/project.mockup";
import MainMenuLayout from "@/layouts/MainMenuLayout";

const EventsPage: React.FC = () => {
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
    <div className="bg-PurpleDark">
      <MainMenuLayout
        data={ProjectMockData}
        filterData={filterData}
        title="Events"
      />
    </div>
  );
};

export default EventsPage;
