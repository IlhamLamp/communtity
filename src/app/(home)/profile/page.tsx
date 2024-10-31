"use client";
import ContentProfile from "@/components/Content/profile";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";

const ProfilePage: React.FC = () => {
  const { isLogin, isLoading } = useAuth();
  if (!isLoading && !isLogin) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="bg-gray-100">
        <ContentProfile />
      </div>
    );
  }
};

export default ProfilePage;
