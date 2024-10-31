import { menuItems } from "./data";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { LogoutService } from "@/service/logout";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";

const SideBarMenu: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  const { isLogin, clearAuthData } = useAuth();
  const { setProfile } = useProfile();

  const router = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      await LogoutService();
      toast.success("Succesfully Logout!", {
        duration: 4000,
      });
      setProfile(null);
      clearAuthData();
      return router.push("/login");
    } else {
      return toast.dismiss();
    }
  };

  return (
    <div className={isExpanded ? "mt-0" : "mt-10"}>
      {menuItems
        .filter((m) => isLogin || m.title !== "MENU")
        .map((menu) => (
          <div
            className="flex flex-col space-y-2 gap-2 text-sm"
            key={menu.title}
          >
            <span
              className={`text-gray-400 font-light my-2 ${
                isExpanded ? "block" : "hidden"
              }`}
            >
              {menu.title}
            </span>
            <div
              className={`flex flex-col space-y-2 mt-2 ${
                isExpanded ? "items-start" : "items-center mt-0"
              }`}
            >
              {menu.items
                .filter((item) => isLogin || !item.is_private)
                .map((item) => (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`flex w-full items-center gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-Gray hover:text-Navy ${
                      isExpanded ? "justify-start" : "justify-center"
                    } ${
                      path.split("/").pop() === item.label.toLowerCase()
                        ? "bg-Gray text-Navy"
                        : "bg-none text-gray-500"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span
                      className={`text-sm ${isExpanded ? "block" : "hidden"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      <div
        className={`flex flex-col space-y-2 mt-2 ${
          isExpanded ? "items-start" : "items-center"
        }`}
      >
        {isLogin ? (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-Gray hover:text-Navy ${
              isExpanded ? "justify-start" : "justify-center"
            }`}
          >
            <FontAwesomeIcon icon={faPowerOff} />
            <span className={`text-sm ${isExpanded ? "block" : "hidden"}`}>
              Logout
            </span>
          </button>
        ) : (
          <Link
            href={"/login"}
            key={"Login"}
            className={`flex items-center gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-Gray hover:text-Navy ${
              isExpanded ? "justify-start" : "justify-center"
            }`}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span className={`text-sm ${isExpanded ? "block" : "hidden"}`}>
              Login
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBarMenu;
