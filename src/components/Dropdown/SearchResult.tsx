"use client";
import {
  CreateAdditionalRoleService,
  CreateAdditionalTagService,
} from "@/api/extras/additionalProfile";
import { useFilter } from "@/context/FilterContext";
import { TRoleResponse, TRoleUser } from "@/types/role";
import { TTag, TTagResponse } from "@/types/tag";
import { searchResultValidation } from "@/validation/searchResult.validation";
import React from "react";

type ItemType = "role" | "tags";

interface SearchResultProps<T extends { role?: TRoleUser; tags?: TTag[] }> {
  data: T;
  handleUpdateData: (field: keyof T | string, value: any) => void;
  inputKey: string;
}

const SearchResult = <T extends { role?: TRoleUser; tags?: TTag[] }>({
  data,
  handleUpdateData,
  inputKey,
}: SearchResultProps<T>) => {
  const {
    searchTerm,
    setSearchTerm,
    isInputFocused,
    setIsInputFocused,
    filteredItems,
    setFilteredItems,
    currentItemType,
    handleScrollRole,
    visibleItemCount,
  } = useFilter();

  const handleSelectItem = (item: TRoleUser | TTag) => {
    const validate = searchResultValidation({
      data,
      inputKey,
      isInputFocused,
      currentItemType,
      item,
    });

    if (!validate) return;

    const handlers: {
      [key in ItemType]: (item: TRoleUser | TTag) => void;
    } = {
      role: (item: TRoleUser) => {
        handleUpdateData(inputKey, item);
        setSearchTerm((prev) => ({ ...prev, [inputKey]: item.name || "" }));
      },
      tags: (item: TTag) => {
        const isTagExist = data.tags?.find((t: any) => t.name === item.name);
        if (!isTagExist) {
          handleUpdateData("tags", [...(data?.tags || []), item]);
          setSearchTerm({ ...searchTerm, [inputKey]: "" });
        } else {
          return alert("You have already added");
        }
      },
    };
    const handler = handlers[currentItemType];
    if (handler) {
      handler(item);
    }
    setIsInputFocused((prev) => ({ ...prev, [inputKey]: false }));
    setFilteredItems({});
  };

  const handleAddNewItem = async (
    newItemName: string,
    itemType: "tags" | "role"
  ) => {
    try {
      const saveFunction =
        itemType === "tags"
          ? CreateAdditionalTagService
          : CreateAdditionalRoleService;
      const newItem: TTagResponse | TRoleResponse | null = await saveFunction(
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

  const isTags = currentItemType === "tags";
  const filteredData = isTags
    ? Array.isArray(filteredItems[inputKey]) &&
      filteredItems[inputKey].filter(
        (tag) =>
          // !(data?.tags || []).some((selectedTag) => selectedTag._id === tag._id)
          Array.isArray(data?.tags) &&
          !data.tags.some((selectedTag) => selectedTag._id === tag._id)
      )
    : filteredItems[inputKey];

  console.log("data.tags", data.tags);
  console.log("currentItemType", currentItemType);
  console.log("filteredData", filteredData);
  console.log("filteredItems", filteredItems);

  if (isInputFocused[inputKey] && filteredData) {
    return (
      <ul
        className="bg-white border border-[#e0e0e0] rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
        onMouseDown={(e) => e.preventDefault()}
        onScroll={handleScrollRole}
      >
        {/* FILTER SUGGESTIONS */}
        {Array.isArray(filteredData) &&
          filteredData.length > 0 &&
          Array.isArray(filteredData) &&
          filteredData.slice(0, visibleItemCount).map((item) => (
            <li
              key={item._id}
              onClick={() => handleSelectItem(item)}
              className="cursor-pointer py-2 px-4 hover:bg-gray-200 text-sm"
            >
              {item.name}
            </li>
          ))}
        {/* OTHER THAN SUGGESTIONS */}
        {filteredData.length === 0 && searchTerm[inputKey] && (
          <li
            onClick={() =>
              handleAddNewItem(searchTerm[inputKey], currentItemType)
            }
            className="cursor-pointer py-2 px-4 text-sm text-blue-600 hover:bg-gray-200"
          >
            Add &quot;{searchTerm[inputKey]}&quot; as new {currentItemType}
          </li>
        )}
      </ul>
    );
  }

  return null;
};

export default SearchResult;
