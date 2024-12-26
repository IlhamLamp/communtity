import SearchResult from "@/components/Dropdown/SearchResult";
import { useFilter } from "@/context/FilterContext";
import { TProfileUser } from "@/types/profile";
import { TTag } from "@/types/tag";
import {
  faIdCardClip,
  faNoteSticky,
  faTags,
  faTimes,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormProfileWorkingStatusProps {
  data: TProfileUser | null;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof TProfileUser
  ) => void;
  handleUpdateData: (field: keyof TProfileUser, value: any) => void;
  handleRemoveTag: (tag: TTag, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormProfileWorkingStatus: React.FC<FormProfileWorkingStatusProps> = ({
  data,
  handleInputChange,
  handleUpdateData,
  handleRemoveTag,
}) => {
  const {
    searchTerm,
    setIsInputFocused,
    isInputFocused,
    setVisibleItemCount,
    setCurrentItemType,
  } = useFilter();

  return (
    <div id="form-working-status" className="mb-2 pt-2">
      <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
        Working Status
      </label>
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full relative">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faIdCardClip}
              className="pr-2 text-sm text-gray-600"
            />
            <span>Role</span>
          </label>
          <input
            type="text"
            name="role"
            id="role"
            placeholder="Type to add role"
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
          {isInputFocused.role && data && (
            <SearchResult<TProfileUser>
              data={data}
              handleUpdateData={handleUpdateData}
            />
          )}
        </div>
        <div className="w-full">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faUserGear}
              className="pr-2 text-sm text-gray-600"
            />
            <span>Experience</span>
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
        <div className="w-full relative col-span-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faTags}
              className="pr-2 text-sm text-gray-600"
            />
            <span>Tags</span>
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
          {isInputFocused.tags && data && (
            <SearchResult<TProfileUser>
              data={data}
              handleUpdateData={handleUpdateData}
            />
          )}
        </div>
        <div className="w-full col-span-2">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faNoteSticky}
              className="pr-2 text-sm text-gray-600"
            />
            <span>About</span>
          </label>
          <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
            <textarea
              name="about"
              id="about"
              placeholder="Wrote about you here"
              value={data?.about || ""}
              onChange={(e) => handleInputChange(e, "about")}
              className="w-full h-24 resize-none outline-none text-sm text-gray-700 font-thin bg-transparent overflow-y-clip"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProfileWorkingStatus;
