"use client";
import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { usePublicResource } from "./PublicContext";
import { usePathname } from "next/navigation";

type PublicItemType = "role" | "tags";
type TSearchTerm = {
  [key: string]: string;
};

interface IFilterContext {
  searchTerm: TSearchTerm;
  setSearchTerm: React.Dispatch<React.SetStateAction<TSearchTerm>>;
  filteredItems: { [key: string]: TRoleUser[] | TTag[] | null };
  setFilteredItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: TRoleUser[] | TTag[] | null }>
  >;
  isInputFocused: {
    [key: string]: boolean;
  };
  setIsInputFocused: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  visibleItemCount: number;
  setVisibleItemCount: React.Dispatch<React.SetStateAction<number>>;
  currentItemType: PublicItemType;
  setCurrentItemType: React.Dispatch<React.SetStateAction<PublicItemType>>;
  handleScrollRole: (e: React.UIEvent<HTMLUListElement, UIEvent>) => void;
  updateSearchTerm: (key: string, value: string) => void;
  deleteSearchTerm: (key: string) => void;
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const { roles, tags } = usePublicResource();

  const [searchTerm, setSearchTerm] = useState<TSearchTerm>({});
  const [filteredItems, setFilteredItems] = useState<{
    [key: string]: TRoleUser[] | TTag[] | null;
  }>({});
  const [isInputFocused, setIsInputFocused] = useState<{
    [key: string]: boolean;
  }>({});
  const [visibleItemCount, setVisibleItemCount] = useState<number>(10);
  const [currentItemType, setCurrentItemType] =
    useState<PublicItemType>("role");

  useEffect(() => {
    const handler = setTimeout(() => {
      const arrKey = Object.keys(searchTerm);

      const updatedFilteredItems: {
        [key: string]: TRoleUser[] | TTag[] | null;
      } = {};

      for (const key of arrKey) {
        const itemsToFilter = (currentItemType === "role" ? roles : tags) as
          | TRoleUser[]
          | TTag[];
        const searchValue = searchTerm[key] || "";

        if (searchValue && itemsToFilter) {
          const filtered = itemsToFilter.filter((item) =>
            item.name?.toLowerCase().includes(searchValue.toLowerCase())
          );
          updatedFilteredItems[key] = filtered;
        } else {
          updatedFilteredItems[key] = itemsToFilter || [];
        }
      }

      setFilteredItems(updatedFilteredItems);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, currentItemType, roles, tags]);

  useEffect(() => {
    setSearchTerm({});
    setIsInputFocused({});
    setFilteredItems({});
  }, [pathname]);

  const handleScrollRole = useCallback(
    (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight) {
        setVisibleItemCount((prevCount) => prevCount + 10);
      }
    },
    []
  );

  const updateSearchTerm = useCallback((key: string, value: string) => {
    setSearchTerm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const deleteSearchTerm = useCallback((key: string) => {
    setSearchTerm((prev) => {
      const updated = { ...prev };
      delete updated[key];

      const newSearchTerm: TSearchTerm = {};
      Object.keys(updated).forEach((k) => {
        const [field, index, subField] = k.split(/[-.]/);
        const currentIndex = parseInt(index, 10);
        const deletedIndex = parseInt(key.split(/[-.]/)[1], 10);
        const newIndex =
          currentIndex > deletedIndex ? currentIndex - 1 : currentIndex;
        const newKey = `${field}-${newIndex}.${subField}`;
        newSearchTerm[newKey] = updated[k];
      });

      return newSearchTerm;
    });
  }, []);

  const filterMemo = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      filteredItems,
      setFilteredItems,
      isInputFocused,
      setIsInputFocused,
      visibleItemCount,
      setVisibleItemCount,
      currentItemType,
      setCurrentItemType,
      handleScrollRole,
      updateSearchTerm,
      deleteSearchTerm,
    }),
    [
      searchTerm,
      setSearchTerm,
      filteredItems,
      setFilteredItems,
      isInputFocused,
      setIsInputFocused,
      visibleItemCount,
      setVisibleItemCount,
      currentItemType,
      setCurrentItemType,
      handleScrollRole,
      updateSearchTerm,
      deleteSearchTerm,
    ]
  );

  return (
    <FilterContext.Provider value={filterMemo}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within an FilterProvider");
  }
  return context;
};
