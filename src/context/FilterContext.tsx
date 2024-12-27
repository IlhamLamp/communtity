"use client";
import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { usePublicResource } from "./PublicContext";
import { usePathname } from "next/navigation";

type PublicItemType = "role" | "tags";
type TSearchTerm = {
  role: string;
  tags: string;
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
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const { roles, tags } = usePublicResource();

  const [searchTerm, setSearchTerm] = useState<TSearchTerm>({
    role: "",
    tags: "",
  });
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
      const itemsToFilter = currentItemType === "role" ? roles : tags;
      const searchValue =
        currentItemType === "role" ? searchTerm.role : searchTerm.tags;
      if (itemsToFilter && searchTerm) {
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
    setSearchTerm({ role: "", tags: "" });
    setIsInputFocused({});
    console.log("pathname", pathname);
  }, [pathname]);

  const handleScrollRole = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      setVisibleItemCount((prevCount) => prevCount + 10);
    }
  };

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
