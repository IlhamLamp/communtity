import ApprovalBtn from "@/components/Buttons/Radio/ApprovalBtn";
import { AvatarUpload } from "@/components/Cards/AvatarUpload";
import { useMainMenu } from "@/context/MainMenuContext";
import { TProjects } from "@/types/project";
import {
  faCalendarWeek,
  faChalkboardUser,
  faCity,
  faEnvelopesBulk,
  faFlag,
  faLayerGroup,
  faNoteSticky,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApprovalMember from "../approval-member";

export const ProjectFormStep2: React.FC<{ data: TProjects }> = ({ data }) => {
  const { handleInputChange } = useMainMenu();

  return (
    <div>
      <span className="text-sm font-light text-gray-500">Step 2</span>
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        General Info
      </h2>
      <div className="flex flex-row space-x-6 items-start">
        <AvatarUpload />
        <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-2 text-xs">
          <div className="w-full">
            <label htmlFor="types" className="block mb-1 text-[#07074D]">
              <FontAwesomeIcon
                icon={faLayerGroup}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>Types</span>
            </label>
            <select
              id="types"
              name="types"
              value={data.types || "project"}
              disabled={true}
              className="cursor-not-allowed border rounded-md w-full p-2 text-gray-400"
            >
              <option value="project" defaultValue="project">
                Project
              </option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="duration" className="block mb-1 text-[#07074D]">
              <FontAwesomeIcon
                icon={faCalendarWeek}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>Duration</span>
            </label>
            <select
              id="duration"
              name="duration"
              className="cursor-pointer border rounded-md w-full p-2"
              value={data.duration || "day"}
              onChange={(e) => handleInputChange(e, "duration")}
            >
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="participation"
              className="block mb-1 text-[#07074D]"
            >
              <FontAwesomeIcon
                icon={faChalkboardUser}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>Participation</span>
            </label>
            <select
              id="participation"
              name="participation"
              className="cursor-pointer border rounded-md w-full p-2"
              value={data.participation || "remote"}
              onChange={(e) => handleInputChange(e, "participation")}
            >
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          {/* ADDRESS */}
          <div className="w-full">
            <label htmlFor="city" className="block mb-1 text-[#07074D]">
              <FontAwesomeIcon
                icon={faCity}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>City</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="border rounded-md w-full p-2"
              placeholder="Enter city location"
              value={data.address?.city || ""}
              onChange={(e) => handleInputChange(e, "address.city")}
            />
          </div>
          <div className="w-full">
            <label htmlFor="state" className="block mb-1 text-[#07074D]">
              <FontAwesomeIcon
                icon={faFlag}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>State</span>
            </label>
            <input
              id="state"
              name="state"
              type="text"
              className="border rounded-md w-full p-2"
              placeholder="Enter state"
              value={data.address?.state || ""}
              onChange={(e) => handleInputChange(e, "address.state")}
            />
          </div>
          <div className="w-full">
            <label htmlFor="zip_code" className="block mb-1 text-[#07074D]">
              <FontAwesomeIcon
                icon={faEnvelopesBulk}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>ZIP</span>
            </label>
            <input
              id="zip_code"
              name="zip_code"
              type="text"
              className="border rounded-md w-full p-2"
              placeholder="Enter zip code"
              value={data.address?.zip_code || ""}
              onChange={(e) => handleInputChange(e, "address.zip_code")}
            />
          </div>
          <div className="w-full col-span-2">
            <label htmlFor="street" className="block mb-1 text-[#07074D]">
              <FontAwesomeIcon
                icon={faRoad}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>Street</span>
            </label>
            <input
              id="street"
              name="street"
              type="text"
              className="border rounded-md w-full p-2"
              placeholder="Enter street address"
              value={data.address?.street || ""}
              onChange={(e) => handleInputChange(e, "address.street")}
            />
          </div>
          {/* Approval */}
          <ApprovalBtn />
          <ApprovalMember />
          {/*  */}
          <div className="w-full col-span-3">
            <label htmlFor="description" className="block mb-1 text-[#07074D]">
              <FontAwesomeIcon
                icon={faNoteSticky}
                className="pr-2 text-xs lg:text-sm text-gray-600"
              />
              <span>Description</span>
            </label>
            <textarea
              id="street"
              name="street"
              className="border rounded-md w-full p-2"
              placeholder="Enter project description"
              rows={5}
              value={data.description || ""}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
