import {
  faBriefcase,
  faHandHoldingHeart,
  faHouse,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";

export const navMenuItems = [
  {
    icon: faHouse,
    label: "Home",
    href: "/",
    borderColor: "border-Navy",
  },
  {
    icon: faBriefcase,
    label: "Project",
    href: "/project",
    borderColor: "border-Navy",
  },
  {
    icon: faPeopleRoof,
    label: "Group",
    href: "/group",
    borderColor: "border-PurpleDark",
  },
  {
    icon: faHandHoldingHeart,
    label: "Event",
    href: "/event",
    borderColor: "border-PurpleDark",
  },
];
