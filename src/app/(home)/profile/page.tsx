import ContentProfile from "@/components/Content/profile";
import { profileData } from "@/components/Content/profile/data";

const ProfilePage: React.FC = () => {
    return (
        <div className="bg-gray-100">
            { profileData.map((data: any, i: number) => (
                <ContentProfile key={i} data={data} />
            ))}
        </div>
    )
}

export default ProfilePage;