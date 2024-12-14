"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const path = usePathname().split("/");
  return (
    <ul className="gap-4 items-center font-medium text-sm flex">
      {path &&
        path.map((_, index) => (
          <>
            <li key={path[index]}>
              <Link href={`/${path[index]}`} className="text-Gray capitalize">
                {path[index] === "" ? "Home" : path[index]}
              </Link>
            </li>
            {index + 1 < path.length && (
              <li>
                <FontAwesomeIcon icon={faChevronRight} className="text-Gray" />
              </li>
            )}
          </>
        ))}
    </ul>
  );
};

export default Breadcrumbs;
