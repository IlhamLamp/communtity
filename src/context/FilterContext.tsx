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
  filteredItems: TRoleUser[] | TTag[] | null;
  setFilteredItems: React.Dispatch<
    React.SetStateAction<TRoleUser[] | TTag[] | null>
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
  resetSearchTerm: (key: string) => void;
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const { roles, tags } = usePublicResource();

  const [searchTerm, setSearchTerm] = useState<TSearchTerm>({});
  const [filteredItems, setFilteredItems] = useState<
    TRoleUser[] | TTag[] | null
  >(null);
  const [isInputFocused, setIsInputFocused] = useState<{
    [key: string]: boolean;
  }>({});
  const [visibleItemCount, setVisibleItemCount] = useState<number>(10);
  const [currentItemType, setCurrentItemType] =
    useState<PublicItemType>("role");

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(searchTerm);
      let itemsToFilter: TRoleUser[] | TTag[] | undefined = undefined;
      let searchValue = "";
      const arrKey = Object.keys(searchTerm);
      console.log("array key", arrKey);

      for (const key of arrKey) {
        if (key.endsWith(currentItemType) || key.startsWith(currentItemType)) {
          searchValue = searchTerm[key] || "";
          itemsToFilter = (currentItemType === "role" ? roles : tags) as
            | TRoleUser[]
            | TTag[];
          break;
        }
      }

      console.log(itemsToFilter, searchValue);
      if (searchValue && itemsToFilter) {
        const filtered = itemsToFilter.filter((item) =>
          item.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredItems(filtered);
      } else {
        setFilteredItems(itemsToFilter || []);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, currentItemType, roles, tags]);

  useEffect(() => {
    setSearchTerm({});
    setIsInputFocused({});
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

  const resetSearchTerm = useCallback((key: string) => {
    setSearchTerm((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
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
      resetSearchTerm,
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
      resetSearchTerm,
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
