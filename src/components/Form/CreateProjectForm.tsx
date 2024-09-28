'use client';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const CreateProjectForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [previewImgSrc, setPreviewImgSrc] = useState<string>("/assets/avatar.png");

    const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const loadFileImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileType = file.type;    
            if (fileType.startsWith("image/")) {
                const fileURL = URL.createObjectURL(file);
                setPreviewImgSrc(fileURL);
        
                // Free memory once the image is loaded
                const imageElement = new Image();
                imageElement.src = fileURL;
                imageElement.onload = () => {
                    URL.revokeObjectURL(fileURL);
                };
            } else {
                alert("Please upload a valid image file.");
            }
        }
    };

    return (
        <section className="py-2 px-10">
            <h1 className="text-center text-2xl font-medium text-gray-200">Create Projects</h1>
            <p className="text-center text-gray-400 text-sm font-light">Define your project details with this step-by-step process</p>

            {/* Steps Navigation */}
            <div className="hidden lg:flex justify-center items-center my-6">
                <div className={`text-sm flex gap-2 items-center border-2 text-gray-300 rounded-full px-2 py-1 ${currentStep >= 1 ? 'border-purple-600' : 'border-gray-400'}`}>
                    <span className={`text-xs rounded-full border py-1.5 px-3 ${currentStep >= 1 ? 'bg-purple-600' : 'border-gray-400'}`}>1</span>
                    <span>Project Title</span>
                </div>
                <hr className={`border w-[40px] rounded-full ${currentStep > 1 ? 'border-purple-600' : 'border-gray-400'}`} />
                <div className={`text-sm flex gap-2 items-center border-2 text-gray-300 rounded-full px-2 py-1 ${currentStep >= 2 ? 'border-purple-600' : 'border-gray-400'}`}>
                    <span className={`text-xs rounded-full border py-1.5 px-3 ${currentStep >= 2 ? 'bg-purple-600' : 'border-gray-400'}`}>2</span>
                    <span>General Info</span>
                </div>
                <hr className={`border w-[40px] rounded-full ${currentStep > 2 ? 'border-purple-600' : 'border-gray-400'}`} />
                <div className={`text-sm flex gap-2 items-center border-2 text-gray-300 rounded-full px-2 py-1 ${currentStep === 3 ? 'border-purple-600' : 'border-gray-400'}`}>
                    <span className={`text-xs rounded-full border py-1.5 px-3 ${currentStep === 3 ? 'bg-purple-600' : 'border-gray-400'}`}>3</span>
                    <span>Tags & Extras</span>
                </div>
            </div>

            {/* Steps Content */}
            <form className="bg-gray-100 p-4 rounded-lg shadow-lg">
                {currentStep === 1 && (
                    <div>
                        <span className="text-sm font-light text-gray-500">Step 1</span>
                        <h2 className="text-lg font-semibold mb-4 text-slate-800">Project Title</h2>
                        <div className="flex flex-row space-x-6">
                            <div className="relative flex justify-center items-center">
                                {/* Image preview */}
                                <img id="preview_img" className="h-[8rem] w-[9rem] object-cover rounded-full" src={previewImgSrc} alt="Current profile photo" />   
                                {/* Pencil icon overlay */}
                                <label htmlFor="img-projects-upload" className="absolute top-0 right-0 bg-purple-600 p-1 rounded-full cursor-pointer hover:bg-purple-800">
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-white" />
                                </label>
                                {/* Hidden file input */}
                                <input type="file" accept="image/*" onChange={loadFileImg} className="hidden" id="img-projects-upload" />
                            </div>
                            <div className="flex flex-col w-full">
                                <div>
                                    <label className="block">Owner</label>
                                    <input type="text" disabled={true} className="border rounded-md w-full p-2 mb-2" placeholder="Enter project title" />
                                </div>
                                <div>
                                    <label className="block mb-2">Project Title</label>
                                    <input type="text" className="border rounded-md w-full p-2 mb-4" placeholder="Enter project title" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )}
                {currentStep === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Step 2: Payment Details</h2>
                        <label className="block mb-2">Payment Method</label>
                        <select className="border rounded-md w-full p-2 mb-4">
                            <option>Fixed Rate</option>
                            <option>Pay As You Go</option>
                        </select>
                    </div>
                    
                )}
                {currentStep === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Step 3: Benefits & Extras</h2>
                        <label className="block mb-2">Project Tags</label>
                        <input type="text" className="border rounded-md w-full p-2 mb-4" placeholder="Enter project tags" />
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`py-2 px-4 bg-gray-300 rounded-md ${currentStep === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-400'}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={currentStep === 3}
                        className={`py-2 px-4 bg-purple-600 text-white rounded-md ${currentStep === 3 ? 'cursor-not-allowed' : 'hover:bg-purple-700'}`}
                    >
                        Next
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreateProjectForm;
