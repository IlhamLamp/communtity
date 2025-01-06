import {
  faUser,
  faUserGroup,
  faUsers,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const ShowMemberLength: React.FC<{ memberCount: number }> = ({
  memberCount,
}) => {
  let icon;
  if (memberCount < 2) {
    icon = faUser;
  } else if (memberCount === 2) {
    icon = faUserGroup;
  } else if (memberCount > 2 && memberCount < 5) {
    icon = faUsers;
  } else {
    icon = faUsersViewfinder;
  }

  return <FontAwesomeIcon icon={icon} className="pr-2 text-sm text-gray-600" />;
};
