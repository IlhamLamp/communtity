import ContentProfile from "@/components/Content/profile";
import { profileData } from "@/components/Content/profile/data";
import { useAuth } from "@/context/AuthContext";

const ProfilePage: React.FC = () => {
  const { isLogin, isLoading } = useAuth();
  return (
    <div className="bg-gray-100">
      <ContentProfile key={profileData?.data._id} data={profileData.data} />
    </div>
  );
};

export default ProfilePage;
