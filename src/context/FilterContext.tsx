import React, { createContext, useState, useMemo, ReactNode } from "react";

interface IFilterContext {
  search: string;
  tags: string[];
  roles: string[];
}

const FilterContext = createContext<IFilterContext | undefined>;

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<IFilter>({
    search: "",
    tags: [],
    roles: [],
  });

  const filterMemo = useMemo(
    () => ({
      filter,
      setFilter,
    }),
    [filter]
  );

  return (
    <FilterContext.Provider value={filterMemo}>
      {children}
    </FilterContext.Provider>
  );
};
