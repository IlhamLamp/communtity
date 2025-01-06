import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PriorityWarnColor: React.FC<{ status: string }> = ({ status }) => {
  let colorized;
  if (status === "low") {
    colorized = "text-CardFour";
  } else if (status === "medium") {
    colorized = "text-CardTwo";
  } else {
    colorized = "text-CardOne";
  }

  return (
    <FontAwesomeIcon icon={faCircle} className={`pr-2 text-sm ${colorized}`} />
  );
};

export default PriorityWarnColor;
