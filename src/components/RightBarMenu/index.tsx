import RightBarMainMenuLayout from "@/layouts/RightBarMainMenuLayout";

const RightBarMenu: React.FC<{ path: string }> = ({ path }) => {
  switch (path) {
    case "/project":
      return <RightBarMainMenuLayout bgColor="bg-Navy" />;
    case "/group":
      return <RightBarMainMenuLayout bgColor="bg-PurpleDark" />;
    case "/event":
      return <RightBarMainMenuLayout bgColor="bg-yellow-600" />;
    default:
      break;
  }
};

export default RightBarMenu;
