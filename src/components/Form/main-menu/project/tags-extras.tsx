import SearchResult from "@/components/Dropdown/SearchResult";
import { useFilter } from "@/context/FilterContext";
import { useMainMenu } from "@/context/MainMenuContext";
import { TProjects } from "@/types/project";
import { faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export const ProjectFormStep3: React.FC<{ data: TProjects }> = ({ data }) => {
  const {
    previewImgSrc,
    loadFileImg,
    handleRemoveTag,
    handleInputChange,
    handleUpdateItem,
  } = useMainMenu();

  const {
    searchTerm,
    setIsInputFocused,
    isInputFocused,
    setVisibleItemCount,
    setCurrentItemType,
  } = useFilter();
  return (
    <div>
      <span className="text-sm font-light text-gray-500">Step 3</span>
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        Tags & Extras
      </h2>
      <div className="flex flex-row space-x-6 items-start">
        <div className="relative flex-shrink-0 my-2">
          <Image
            id="preview_img"
            className="h-[7rem] w-[7rem] object-cover rounded-full"
            src={previewImgSrc}
            alt="Current profile photo"
            width={500}
            height={100}
          />
          <label
            htmlFor="img-projects-upload"
            className="absolute bottom-0 right-0 bg-purple-600 py-1 px-2 rounded-full cursor-pointer hover:bg-purple-800"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-white" />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={loadFileImg}
            className="hidden"
            id="img-projects-upload"
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-2 text-sm">
          <div className="w-full relative col-span-2">
            <label htmlFor="tags" className="block mb-1">
              Tags
            </label>
            <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
              {Array.isArray(data?.tags) &&
                data.tags.length > 0 &&
                data.tags.map((tag) => (
                  <div
                    key={tag._id}
                    className={`curoser-default py-1 px-3 text-sm rounded-full flex items-center ${tag.color}`}
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
              <SearchResult<TProjects>
                data={data}
                handleUpdateData={handleUpdateItem}
                inputKey="tags"
              />
            )}
          </div>
          <div className="w-full">
            <label htmlFor="salary" className="block mb-1">
              Salary
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-[#e0e0e0] bg-gray-100 text-gray-600 text-sm">
                Rp
              </span>
              <input
                type="text"
                name="salary"
                id="salary"
                className="border w-full p-2"
                placeholder="Enter project salary"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
                onChange={(e) => handleInputChange(e, "salary")}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="priority" className="block mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={data?.priority || ""}
              onChange={(e) => handleInputChange(e, "priority")}
              className="cursor-pointer border rounded-md w-full p-2"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
