"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const fullPath = usePathname();
  const path = fullPath.split("/");
  return (
    <ul className="gap-1 items-center font-medium text-sm flex">
      {path &&
        path.map((_, index) => (
          <li key={index} className="flex items-center">
            <Link
              href={
                index + 1 === path.length ? `${fullPath}` : `/${path[index]}`
              }
              className="text-Gray capitalize"
            >
              {path[index] === "" ? "Home" : path[index]}
            </Link>
            {index + 1 < path.length && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-Gray mx-2"
              />
            )}
          </li>
        ))}
    </ul>
  );
};

export default Breadcrumbs;
