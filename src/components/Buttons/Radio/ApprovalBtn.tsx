import { useMainMenu } from "@/context/MainMenuContext";
import { faHandshakeSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ApprovalBtn: React.FC = () => {
  const { itemData, handleInputChange } = useMainMenu();
  return (
    <div className="w-full">
      <label htmlFor="approval" className="block mb-1 text-[#07074D]">
        <FontAwesomeIcon
          icon={faHandshakeSimple}
          className="pr-2 text-sm text-gray-600"
        />
        <span>Approval</span>
      </label>
      <div className="relative w-full h-8 bg-gray-300 rounded-full flex items-center">
        <div
          className={`absolute w-1/2 h-full bg-purple-600 rounded-full transition-all duration-300 ${
            itemData?.approval === "no" ? "left-0" : "right-0"
          }`}
        />

        {["no", "yes"].map((option) => (
          <label
            key={option}
            htmlFor={`approval-${option}`}
            className="relative z-10 w-1/2 text-center cursor-pointer"
          >
            <input
              id={`approval-${option}`}
              name="approval"
              type="radio"
              value={option}
              className="sr-only"
              checked={itemData?.approval === option}
              onChange={(e) => handleInputChange(e, "approval")}
            />
            <span
              className={`text-xs ${
                itemData?.approval === option ? "text-white" : "text-gray-700"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ApprovalBtn;
