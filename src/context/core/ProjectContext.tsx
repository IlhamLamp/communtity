"use client";

import { TProjects } from "@/types/project";
import { createContext, useContext, useMemo, useState } from "react";

interface IProjectContext {}

const ProjectContext = createContext<IProjectContext | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [project, setProject] = useState<TProjects | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const projectMemo = useMemo(
    () => ({
      project,
      isLoading,
      setProject,
      setIsLoading,
    }),
    [project, isLoading]
  );

  return (
    <ProjectContext.Provider value={projectMemo}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within an ProjectProvider");
  }
  return context;
};
