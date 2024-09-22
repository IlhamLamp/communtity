import { faBookmark, faCircleQuestion, faFilePen, faGear, faIdCard, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: faIdCard,
        label: "Profile",
        href: "/profile"
      },
      {
        icon: faUserGroup,
        label: "Friends",
        href: "/friends"
      },
      {
        icon: faFilePen,
        label: "Registered",
        href: "/projects/applied"
      },
      {
        icon: faBookmark,
        label: "Saved",
        href: "/projects/saved"
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: faCircleQuestion,
        label: "FAQ",
        href: "/faqs"
      },
      {
        icon: faGear,
        label: "Settings",
        href: "/settings",
      },
      {
        icon: faRightFromBracket,
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];