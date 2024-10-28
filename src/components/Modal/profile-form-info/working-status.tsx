import { saveRoleToDatabase, saveTagToDatabase } from "@/service/public";
import { TAddressFieldInputProfile, TProfileUser } from "@/types/profile";
import { TRoleResponse, TRoleUser } from "@/types/role";
import { TTag, TTagResponse } from "@/types/tag";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface FormProfileWorkingStatusProps {
  data: TProfileUser | null;
  filteredItems: TRoleUser[] | TTag[] | null;
  isInputFocused: { [key: string]: boolean };
  visibleItemCount: number;
  searchTerm: { role: string; tags: string };
  setVisibleItemCount: (count: number) => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof TProfileUser | TAddressFieldInputProfile
  ) => void;
  handleRemoveTag: (tag: TTag, e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsInputFocused: (focused: { [key: string]: boolean }) => void;
  setCurrentItemType: Dispatch<SetStateAction<"tags" | "role">>;
  handleSelectItem: (item: TRoleUser | TTag) => void;
  handleScrollRole: (e: React.UIEvent<HTMLUListElement>) => void;
}

const FormProfileWorkingStatus: React.FC<FormProfileWorkingStatusProps> = ({
  data,
  filteredItems,
  isInputFocused,
  visibleItemCount,
  searchTerm,
  setVisibleItemCount,
  handleInputChange,
  handleRemoveTag,
  setIsInputFocused,
  setCurrentItemType,
  handleSelectItem,
  handleScrollRole,
}) => {
  const handleAddNewItemOtherThanSuggestions = async (
    newItemName: string,
    itemType: "tags" | "role"
  ) => {
    try {
      const saveFunction =
        itemType === "tags" ? saveTagToDatabase : saveRoleToDatabase;
      const newItem: TTagResponse | TRoleResponse = await saveFunction(
        newItemName
      );

      if (newItem && newItem.data && newItem.data._id) {
        handleSelectItem(newItem.data);
      } else {
        console.error(`Failed to save the new ${itemType} to the database.`);
      }
    } catch (error) {
      console.error(`An error occurred while adding a new ${itemType}:`, error);
    }
  };

  return (
    <div className="mb-2 pt-2">
      <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
        Working Status
      </label>
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full relative">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-[#07074D]"
          >
            Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            placeholder="Search role"
            value={searchTerm.role || ""}
            onChange={(e) => handleInputChange(e, "role")}
            onFocus={() => {
              setIsInputFocused({ ...isInputFocused, role: true });
              setCurrentItemType("role");
            }}
            onBlur={() => {
              setTimeout(
                () => setIsInputFocused({ ...isInputFocused, role: false }),
                150
              );
              setVisibleItemCount(10);
            }}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {isInputFocused.role && filteredItems && (
            <ul
              className="bg-white border border-[#e0e0e0] rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
              onMouseDown={(e) => e.preventDefault()}
              onScroll={handleScrollRole}
            >
              {/* FILTER ROLE SUGGESTIONS*/}
              {filteredItems.length > 0 &&
                filteredItems
                  .slice(0, visibleItemCount)
                  .map((role: TRoleUser) => (
                    <li
                      key={role._id}
                      onClick={() => handleSelectItem(role)}
                      className="cursor-pointer py-2 px-4 hover:bg-gray-200 text-sm"
                    >
                      {role.name}
                    </li>
                  ))}
              {/* OTHER THAN SUGGESION */}
              {filteredItems.length === 0 && searchTerm.role && (
                <li
                  onClick={() =>
                    handleAddNewItemOtherThanSuggestions(
                      searchTerm.role,
                      "role"
                    )
                  }
                  className="cursor-pointer py-2 px-4 text-sm text-blue-600 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" className="pr-2" />
                  Add "{searchTerm.role}" as new role
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="w-full">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-[#07074D]"
          >
            Experience
          </label>
          <select
            name="experience"
            id="experience"
            value={data?.experience?.value || ""}
            onChange={(e) => handleInputChange(e, "experience")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option value="no_experience">No Experience</option>
            <option value="less_than_year">&lt; 1 year</option>
            <option value="more_than_year">&gt; 1 year</option>
          </select>
        </div>
      </div>
      <div className="w-full pt-2 relative">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-[#07074D]"
        >
          Tags
        </label>
        <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
          {Array.isArray(data?.tags) &&
            data.tags.length > 0 &&
            data.tags.map((tag) => (
              <div
                key={tag._id}
                className={`cursor-default py-1 px-3 text-sm rounded-full flex items-center ${tag.color}`}
              >
                <span className="text-sm text-[#07074D]">{tag.name}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(tag, e)}
                  className="ml-2 text-slate-800 hover:text-slate-600"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}

          <input
            type="text"
            name="tags"
            id="tags"
            value={searchTerm.tags || ""}
            onChange={(e) => handleInputChange(e, "tags")}
            onFocus={() => {
              setIsInputFocused({ ...isInputFocused, tags: true });
              setCurrentItemType("tags");
            }}
            onBlur={() => {
              setTimeout(
                () => setIsInputFocused({ ...isInputFocused, tags: false }),
                150
              );
              setVisibleItemCount(10);
            }}
            placeholder="Type to add tags"
            className="flex-grow outline-none text-sm font-medium bg-transparent"
          />
        </div>

        {isInputFocused.tags && filteredItems && (
          <ul
            className="border border-gray-300 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
            onMouseDown={(e) => e.preventDefault()}
            onScroll={handleScrollRole}
          >
            {/* FILTER TAGS SUGGESTION */}
            {filteredItems.length > 0 &&
              filteredItems
                .filter(
                  (tag) =>
                    !(data?.tags || []).some(
                      (selectedTag) => selectedTag._id === tag._id
                    )
                )
                .slice(0, visibleItemCount)
                .map((tag: TTag) => (
                  <li
                    key={tag._id}
                    onClick={() => handleSelectItem(tag)}
                    className="cursor-pointer py-2 px-4 text-sm hover:bg-gray-200"
                  >
                    {tag.name}
                  </li>
                ))}
            {/* OTHER THAN SUGGESTION */}
            {filteredItems.length === 0 && searchTerm.tags && (
              <li
                onClick={() =>
                  handleAddNewItemOtherThanSuggestions(searchTerm.tags, "tags")
                }
                className="cursor-pointer py-2 px-4 text-sm text-blue-600 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faPlus} size="lg" className="pr-2" />
                Add "{searchTerm.tags}" as new tag
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormProfileWorkingStatus;
