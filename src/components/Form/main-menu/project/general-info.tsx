import { AvatarUpload } from "@/components/Cards/AvatarUpload";
import SearchResult from "@/components/Dropdown/SearchResult";
import { useFilter } from "@/context/FilterContext";
import { useMainMenu } from "@/context/MainMenuContext";
import { TProjects } from "@/types/project";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProjectFormStep2: React.FC<{ data: TProjects }> = ({ data }) => {
  const {
    handleInputChange,
    handleAddMember,
    handleDeleteMember,
    handleUpdateItem,
  } = useMainMenu();

  const {
    searchTerm,
    setIsInputFocused,
    isInputFocused,
    setCurrentItemType,
    setVisibleItemCount,
  } = useFilter();

  return (
    <div>
      <span className="text-sm font-light text-gray-500">Step 2</span>
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        General Info
      </h2>
      <div className="flex flex-row space-x-6 items-start">
        <AvatarUpload />
        <div className="w-full grid grid-cols-3 gap-2 text-sm">
          <div className="w-full">
            <label htmlFor="types" className="block mb-1">
              Types
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
            <label htmlFor="duration" className="block mb-1">
              Duration
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
            <label htmlFor="participation" className="block mb-1">
              Participation
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
            <label htmlFor="city" className="block mb-1">
              City
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
            <label htmlFor="state" className="block mb-1">
              State
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
            <label htmlFor="zip_code" className="block mb-1">
              ZIP
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
            <label htmlFor="street" className="block mb-1">
              Street
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
          {/* PRIVATE */}
          <div className="w-full">
            <label htmlFor="approval" className="block mb-1">
              Approval
            </label>
            <div className="relative w-full h-10 bg-gray-300 rounded-full flex items-center">
              <div
                className={`absolute w-1/2 h-full bg-purple-600 rounded-full transition-all duration-300 ${
                  data?.approval === "no" ? "left-0" : "right-0"
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
                    checked={data?.approval === option}
                    onChange={(e) => handleInputChange(e, "approval")}
                  />
                  <span
                    className={`text-sm ${
                      data?.approval === option ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {data?.approval === "yes" && (
            <div className="w-full col-span-3">
              <label htmlFor="member" className="block mb-1">
                Member {`[${data?.member?.length}]`}
              </label>
              <div className="w-full grid grid-cols-1 gap-2 text-sm">
                {Array.isArray(data?.member) &&
                  data?.member?.map((user, index) => (
                    <div
                      key={`member-${index}`}
                      className="flex flex-row gap-2 pb-1"
                    >
                      <div className="w-1/5 text-left">
                        <span>{index + 1}</span>
                      </div>
                      <div className="w-full relative">
                        <label htmlFor="role" className="block mb-1">
                          Role
                        </label>
                        <input
                          id={`member-${index}.role`}
                          name="role"
                          type="text"
                          className="border rounded-md w-full p-2"
                          placeholder="Enter member role"
                          value={searchTerm[`member-${index}.role`] || ""}
                          onChange={(e) =>
                            handleInputChange(e, {
                              key: "member",
                              index,
                              subfield: "role",
                            })
                          }
                          onFocus={() => {
                            setIsInputFocused((prev) => ({
                              ...prev,
                              [`member-${index}.role`]: true,
                            }));
                            setCurrentItemType("role");
                          }}
                          onBlur={() => {
                            setTimeout(
                              () =>
                                setIsInputFocused((prev) => ({
                                  ...prev,
                                  [`member-${index}.role`]: false,
                                })),
                              150
                            );
                            setVisibleItemCount(10);
                          }}
                        />
                        {/* SEARCH RESULTS */}
                        {isInputFocused[`member-${index}.role`] && data && (
                          <SearchResult<TProjects>
                            data={data}
                            handleUpdateData={handleUpdateItem}
                            inputKey={`member-${index}.role`}
                          />
                        )}
                      </div>
                      <div className="w-full">
                        <label htmlFor="experience" className="block mb-1">
                          Experience
                        </label>
                        <select
                          className="cursor-pointer border rounded-md w-full p-2"
                          value={user.experience}
                          onChange={(e) =>
                            handleInputChange(e, {
                              key: "member",
                              index,
                              subfield: "experience",
                            })
                          }
                        >
                          <option value="no_experience">No Experience</option>
                          <option value="less_than_year">&lt; 1 year</option>
                          <option value="more_than_year">&gt; 1 year</option>
                        </select>
                      </div>
                      <div className="w-full flex flex-col items-center">
                        <label className="block mb-1 text-left">Actions</label>
                        <div
                          className={`w-1/2 flex flex-row h-10 gap-2 items-center relative text-xl ${
                            data.member && data.member.length > 1
                              ? "justify-between"
                              : "justify-center"
                          }`}
                        >
                          {data.member && data.member.length > 1 && (
                            <button
                              id="delete-member"
                              type="button"
                              aria-label="Delete"
                              onClick={() => handleDeleteMember(index)}
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                className="cursor-pointer text-red-500 hover:text-red-700"
                              />
                            </button>
                          )}
                          <button
                            type="button"
                            aria-label="Add"
                            onClick={handleAddMember}
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="cursor-pointer text-purple-500 hover:text-purple-700"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className="w-full col-span-3">
            <label htmlFor="description" className="block mb-1">
              Description
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
