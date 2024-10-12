import ContentProfile from "@/components/Content/profile";
import { profileData } from "@/components/Content/profile/data";

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <ContentProfile key={profileData?.data._id} data={profileData.data} />
    </div>
  );
};

export default ProfilePage;
