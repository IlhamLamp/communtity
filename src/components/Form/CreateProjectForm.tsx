'use client';
import { useState } from "react";

const CreateProjectForm: React.FC = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <section className="p-6">
            <h1 className="text-center text-2xl font-semibold">Create Projects</h1>
            <p className="text-center text-gray-500 mb-6">
                Create the contract terms with this guided process
            </p>

            {/* Steps Navigation */}
            <div className="flex justify-center items-center mb-8">
                <div className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            step === 1 ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        1
                    </div>
                    <span className="w-24 h-[2px] bg-gray-200"></span>
                </div>

                <div className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            step === 2 ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        2
                    </div>
                    <span className="w-24 h-[2px] bg-gray-200"></span>
                </div>

                <div className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            step === 3 ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        3
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                {step === 1 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Step 1: General Info</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Step 2: Payment Details</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Payment Method</label>
                            <input
                                type="text"
                                placeholder="Enter payment method"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Step 3: Benefits & Extras</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Additional Benefits</label>
                            <input
                                type="text"
                                placeholder="Enter benefits"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="bg-gray-500 text-white py-2 px-4 rounded-md"
                        >
                            Back
                        </button>
                    )}
                    {step < 3 && (
                        <button
                            onClick={nextStep}
                            className="bg-purple-500 text-white py-2 px-4 rounded-md"
                        >
                            Next
                        </button>
                    )}
                    {step === 3 && (
                        <button
                            onClick={() => alert("Form submitted!")}
                            className="bg-green-500 text-white py-2 px-4 rounded-md"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CreateProjectForm;
