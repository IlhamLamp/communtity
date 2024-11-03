import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainSortBtn: React.FC = () => {
  return (
    <button className="flex items-center justify-between space-x-5 text-Navy">
      <span className="menu-hover py-2 text-sm font-medium">selected_item</span>
      <FontAwesomeIcon icon={faSliders} />
    </button>
  );
};

export default MainSortBtn;
