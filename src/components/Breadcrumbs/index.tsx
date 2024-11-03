import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Breadcrumbs: React.FC = () => {
  return (
    <ul className="gap-4 items-center font-medium text-sm flex">
      <li>
        <Link href="/" className="text-Gray">
          Home
        </Link>
      </li>
      <li>
        <FontAwesomeIcon icon={faChevronRight} className="text-Gray" />
      </li>
      <li>
        <Link href="/projects" className="text-Gray">
          Projects
        </Link>
      </li>
      <li>
        <FontAwesomeIcon icon={faChevronRight} className="text-Gray" />
      </li>
      <li>
        <Link href="#" className="text-gray-200">
          Create
        </Link>
      </li>
    </ul>
  );
};

export default Breadcrumbs;
