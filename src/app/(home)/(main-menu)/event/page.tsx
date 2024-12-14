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
      <MainMenuLayout filterData={filterData} title="Events" />
    </div>
  );
};

export default EventsPage;
