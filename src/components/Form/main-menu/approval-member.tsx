import SearchResult from "@/components/Dropdown/SearchResult";
import { ShowMemberLength } from "@/components/Icons/ShowMemberLength";
import { useFilter } from "@/context/FilterContext";
import { useMainMenu } from "@/context/MainMenuContext";
import { TProjects } from "@/types/project";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ApprovalMember: React.FC = () => {
  const {
    itemData,
    handleInputChange,
    handleUpdateItem,
    handleAddMember,
    handleDeleteMember,
  } = useMainMenu();
  const {
    searchTerm,
    isInputFocused,
    setIsInputFocused,
    setCurrentItemType,
    setVisibleItemCount,
  } = useFilter();

  return (
    itemData?.approval === "yes" && (
      <div className="w-full col-span-3">
        <label htmlFor="member" className="block mb-1 text-[#07074D]">
          <ShowMemberLength memberCount={itemData.member?.length ?? 1} />
          Member {`${itemData?.member?.length}`}
        </label>
        <div className="w-full grid grid-cols-1 gap-2 text-xs max-h-[300px] overflow-y-auto">
          {Array.isArray(itemData?.member) &&
            itemData?.member?.map((user, index) => (
              <div
                key={`member-${index}`}
                className="flex flex-col lg:flex-row gap-2 pb-1"
              >
                <div className="w-1/5 text-left flex">
                  <span className="block lg:hidden">No. </span>
                  {index + 1}
                </div>
                <div className="w-full relative">
                  <label htmlFor="role" className="block mb-1 text-[#07074D]">
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
                  {isInputFocused[`member-${index}.role`] && itemData && (
                    <SearchResult<TProjects>
                      data={itemData}
                      handleUpdateData={handleUpdateItem}
                      inputKey={`member-${index}.role`}
                    />
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="experience"
                    className="block mb-1 text-[#07074D]"
                  >
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
                  <label htmlFor="actions" className="block mb-1 text-left">
                    Actions
                  </label>
                  <div
                    className={`w-1/2 flex flex-row h-10 gap-2 items-center relative text-lg lg:text-xl ${
                      itemData.member && itemData.member.length > 1
                        ? "justify-between"
                        : "justify-center"
                    }`}
                  >
                    {itemData.member && itemData.member.length > 1 && (
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
                <hr className="h-2 border-gray-300" />
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default ApprovalMember;
