import { AvatarUpload } from "@/components/Cards/AvatarUpload";
import { useMainMenu } from "@/context/MainMenuContext";
import { useProfile } from "@/context/ProfileContext";
import { TProjects } from "@/types/project";
import React from "react";
import DatePicker from "react-datepicker";

export const ProjectFormStep1: React.FC<{ data: TProjects }> = ({ data }) => {
  const { profile } = useProfile();
  const { handleDurationDate, handleInputChange } = useMainMenu();
  return (
    <div id="projectFormStepOne">
      <span className="text-sm font-light text-gray-500">Step 1</span>
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        Project Title
      </h2>
      <div className="flex flex-row space-x-6 items-start">
        <AvatarUpload />
        <div className="w-full grid grid-cols-2 gap-2 text-sm">
          <div className="w-full col-span-2">
            <label htmlFor="owner" className="block mb-1">
              Owner
            </label>
            <input
              id="owner"
              name="owner"
              type="text"
              disabled={true}
              className="cursor-not-allowed border rounded-md w-full p-2 text-gray-400"
              placeholder="Username"
              value={profile?.username || ""}
            />
          </div>
          <div className="w-full">
            <label htmlFor="title" className="block mb-1">
              Project Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="border rounded-md w-full p-2"
              placeholder="Enter project title"
              value={data?.title || ""}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>
          <div className="w-full">
            <label htmlFor="company" className="block mb-1">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              className="border rounded-md w-full p-2"
              placeholder="Enter project company"
              value={data?.company || ""}
              onChange={(e) => handleInputChange(e, "company")}
            />
          </div>
          <div className="w-full">
            <label htmlFor="start_date" className="block mb-1">
              Start Date
            </label>
            <DatePicker
              id="start_date"
              name="start_date"
              selected={data?.start_date}
              onChange={(date) => handleDurationDate(date, "start_date")}
              selectsStart
              startDate={data?.start_date}
              className="cursor-pointer border rounded-md w-full p-2"
              placeholderText="Select start date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="w-full">
            <label htmlFor="end_date" className="block mb-1">
              End Date
            </label>
            <DatePicker
              id="end_date"
              name="end_date"
              selected={data?.end_date}
              onChange={(date) => handleDurationDate(date, "end_date")}
              selectsStart
              startDate={data?.end_date}
              minDate={new Date()}
              className="cursor-pointer border rounded-md w-full p-2"
              placeholderText="Select end date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
