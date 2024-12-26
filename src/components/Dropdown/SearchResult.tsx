"use client";
import {
  CreateAdditionalRoleService,
  CreateAdditionalTagService,
} from "@/api/extras/additionalProfile";
import { useFilter } from "@/context/FilterContext";
import { TRoleResponse, TRoleUser } from "@/types/role";
import { TTag, TTagResponse } from "@/types/tag";
import React from "react";

type ItemType = "role" | "tags";

interface SearchResultProps<T extends { role?: TRoleUser; tags?: TTag[] }> {
  data: T;
  handleUpdateData: (field: keyof T, value: any) => void;
}

const SearchResult = <T extends { role?: TRoleUser; tags?: TTag[] }>({
  data,
  handleUpdateData,
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
    if (!data) return null;

    if (currentItemType === "role" && !(item as TRoleUser)._id) {
      console.error("Invalid role item selected.");
      return;
    }
    if (currentItemType === "tags" && !(item as TTag).name) {
      console.error("Invalid tag item selected.");
      return;
    }
    const handlers: { [key in ItemType]: (item: TRoleUser | TTag) => void } = {
      role: (item: TRoleUser) => handleUpdateData("role", item),
      tags: (item: TTag) => {
        const isTagExist = data.tags?.find((t: any) => t.name === item.name);
        if (!isTagExist) {
          handleUpdateData("tags", [...(data?.tags || []), item]);
        } else {
          return alert("You have already added");
        }
      },
    };
    const handler = handlers[currentItemType];
    if (handler) {
      handler(item);
    }
    setSearchTerm((prev) => ({
      ...prev,
      [currentItemType]: "",
    }));
    setIsInputFocused((prev) => ({ ...prev, [currentItemType]: false }));
    setFilteredItems(null);
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
    ? filteredItems &&
      filteredItems?.filter(
        (tag) =>
          !(data?.tags || []).some((selectedTag) => selectedTag._id === tag._id)
      )
    : filteredItems;

  if (isInputFocused[currentItemType] && filteredData) {
    return (
      <ul
        className="bg-white border border-[#e0e0e0] rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
        onMouseDown={(e) => e.preventDefault()}
        onScroll={handleScrollRole}
      >
        {/* FILTER SUGGESTIONS */}
        {filteredData.length > 0 &&
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
        {filteredData.length === 0 && searchTerm[currentItemType] && (
          <li
            onClick={() =>
              handleAddNewItem(searchTerm[currentItemType], currentItemType)
            }
            className="cursor-pointer py-2 px-4 text-sm text-blue-600 hover:bg-gray-200"
          >
            Add &quot;{searchTerm[currentItemType]}&quot; as new{" "}
            {currentItemType}
          </li>
        )}
      </ul>
    );
  }

  return null;
};

export default SearchResult;
