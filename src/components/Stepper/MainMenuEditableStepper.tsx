import React from "react";
type StepperProps = {
  steps: string[];
  currentStep: number;
  children: React.ReactNode;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const MainMenuEditableStepper: React.FC<StepperProps> = ({
  steps,
  children,
  currentStep,
  setCurrentStep,
}) => {
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex + 1 !== currentStep) {
      setCurrentStep(stepIndex + 1);
    }
  };

  return (
    <>
      {/* STEPPER */}
      <div className="hidden lg:flex justify-center items-center my-6">
        {steps.map((step, index) => (
          <button
            key={step}
            className="flex items-center"
            onClick={() => goToStep(index)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                goToStep(index);
              }
            }}
          >
            <div
              className={`flex gap-2 items-center border-2 text-gray-300 rounded-full px-2 py-1 ${
                currentStep > index ? "border-purple-600" : "border-gray-400"
              }`}
            >
              <span
                className={`text-xs rounded-full border py-1.5 px-3 ${
                  currentStep > index ? "bg-purple-600" : "border-gray-400"
                }`}
              >
                {index + 1}
              </span>
              <span>{step}</span>
            </div>
            {index + 1 < steps.length && (
              <hr
                className={`border w-[40px] rounded-full ${
                  currentStep > index ? "border-purple-600" : "border-gray-400"
                }`}
              />
            )}
          </button>
        ))}
      </div>
      {/* STEPPER CONTENT */}
      <div className="flex max-w-[95%] lg:max-w-[70%] mx-auto mt-6 lg:mt-0 justify-center">
        <form action="" className="w-full bg-gray-100 p-4 rounded-lg shadow-lg">
          {/* Content */}
          {children}
          {/* Navigation Buttons */}
          <div
            className={`flex mt-4 text-xs ${
              currentStep === 1 ? "justify-end" : "justify-between"
            }`}
          >
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`py-2 px-4 bg-gray-300 rounded-md ${
                currentStep === 1 ? "hidden" : "hover:bg-gray-400"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className={`py-2 px-4 bg-purple-600 text-white rounded-md ${
                currentStep === steps.length
                  ? "cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MainMenuEditableStepper;
