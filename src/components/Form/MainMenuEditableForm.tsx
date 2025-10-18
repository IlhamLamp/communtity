"use client";
import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import MainMenuEditableStepper from "../Stepper/MainMenuEditableStepper";
import { TProjectResponse, TProjects } from "@/types/project";
import { CreateProjectsService } from "@/api/core/project";
import toast from "react-hot-toast";

type MainMenuEditableFormProps = {
  title: string;
  description: string;
  steps: string[];
  children: React.ReactNode[];
  initialData: TProjects;
};

const MainMenuEditableForm: React.FC<MainMenuEditableFormProps> = ({
  title,
  description,
  steps,
  children,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const currentChildIndex = currentStep - 1;

  const handleSubmitClick = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const createProjects = CreateProjectsService(initialData);
    toast
      .promise(createProjects, {
        loading: "Create new projects...",
        success: "📧 Project created successfully! Please check home project.",
        error: (err: TProjectResponse) =>
          err.message || "An error occurred during creating project.",
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="py-4 lg:py-2 lg:px-10">
      {/* Header */}
      <h1 className="text-center text-xl lg:text-2xl font-medium text-gray-200">
        {title}
      </h1>
      <p className="text-center text-gray-400 text-xs max-w-[280px] lg:max-w-full mx-auto lg:text-sm font-light">
        {description}
      </p>
      {/* Stepper */}
      <MainMenuEditableStepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleSubmit={handleSubmitClick}
        steps={steps}
        data={initialData}
      >
        {children[currentChildIndex]}
      </MainMenuEditableStepper>
    </section>
  );
};

export default MainMenuEditableForm;
