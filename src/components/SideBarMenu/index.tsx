import { menuItems } from "./data";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthCheck from "@/hooks/useAuthCheck";
import {
  faPowerOff,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LogoutService } from "@/service/logout";

const SideBarMenu: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  const { isLogin, setIsLogin } = useAuthCheck();

  const router = useRouter();

  const handleLogout = () => {
    setIsLogin(true);
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      // Logic untuk logout di sini (misalnya clear token, dll)
      LogoutService();
      toast.success("Succesfully Logout!", {
        duration: 4000,
      });
      setIsLogin(false);
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
                    className={`flex items-center gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-Gray hover:text-Navy ${
                      isExpanded ? "justify-start" : "justify-center"
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
