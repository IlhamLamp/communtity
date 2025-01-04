"use client";
import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import MainMenuEditableStepper from "../Stepper/MainMenuEditableStepper";

type MainMenuEditableFormProps = {
  title: string;
  description: string;
  steps: string[];
  children: React.ReactNode[];
};

const MainMenuEditableForm: React.FC<MainMenuEditableFormProps> = ({
  title,
  description,
  steps,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const currentChildIndex = currentStep - 1;

  return (
    <section className="py-2 px-10">
      {/* Header */}
      <h1 className="text-center text-2xl font-medium text-gray-200">
        {title}
      </h1>
      <p className="text-center text-gray-400 text-sm font-light">
        {description}
      </p>
      {/* Stepper */}
      <MainMenuEditableStepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
      >
        {children[currentChildIndex]}
      </MainMenuEditableStepper>
    </section>
  );
};

export default MainMenuEditableForm;
