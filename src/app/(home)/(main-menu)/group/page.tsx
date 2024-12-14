import MainMenuLayout from "@/layouts/MainMenuLayout";

const GroupsPage: React.FC = () => {
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
      <MainMenuLayout filterData={filterData} title="Groups" />
    </div>
  );
};

export default GroupsPage;
