import { TProfileUser } from "@/types/profile";

const FormProfileWorkingStatus: React.FC<{
  data: TProfileUser | null;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => void;
}> = ({ data, handleInputChange }) => {
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
            value={searchTerm.role}
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
          {isInputFocused.role && filteredItems && filteredItems.length > 0 && (
            <ul
              className="bg-white border border-[#e0e0e0] rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
              onMouseDown={(e) => e.preventDefault()}
              onScroll={handleScrollRole}
            >
              {filteredItems
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
            value={data?.experience?.value}
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
          Tags {JSON.stringify(searchTerm)}
        </label>
        <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
          {Array.isArray(data?.tags) &&
            data.tags.length > 0 &&
            data.tags.map((tag, index) => (
              <div
                key={tag._id}
                className={`cursor-default py-1 px-3 text-sm rounded-full flex items-center ${tag.color}`}
              >
                <span className="text-sm text-[#07074D]">{tag.name}</span>
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleRemoveTag(tag, e)
                  }
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
            value={searchTerm.tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, "tags")
            }
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

        {/* Dropdown suggestion */}
        {isInputFocused.tags && filteredItems && filteredItems.length > 0 && (
          <ul
            onMouseDown={(e) => e.preventDefault()}
            onScroll={handleScrollRole}
            className="border border-gray-300 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
          >
            {filteredItems.slice(0, visibleItemCount).map((tag: TTag) => (
              <li
                key={tag._id}
                onClick={() => {
                  handleSelectItem(tag);
                }}
                className="cursor-pointer py-2 px-4 text-sm hover:bg-gray-200"
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormProfileWorkingStatus;
