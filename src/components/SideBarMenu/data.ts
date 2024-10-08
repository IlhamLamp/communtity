import { faBookmark, faCircleQuestion, faFilePen, faGear, faIdCard, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: faIdCard,
        label: "Profile",
        href: "/profile",
        is_private: true,
      },
      {
        icon: faUserGroup,
        label: "Friends",
        href: "/friends",
        is_private: true,
      },
      {
        icon: faFilePen,
        label: "Applied",
        href: "/projects/applied",
        is_private: true,
      },
      {
        icon: faBookmark,
        label: "Saved",
        href: "/projects/saved",
        is_private: true,
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: faCircleQuestion,
        label: "FAQ",
        href: "/faqs",
        is_private: false,
      },
      {
        icon: faGear,
        label: "Settings",
        href: "/settings",
        is_private: true,
      },
      {
        icon: faRightFromBracket,
        label: "Logout",
        href: "/logout",
        is_private: false,
      },
    ],
  },
];