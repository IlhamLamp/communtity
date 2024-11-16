"use client";
import {
  faPenToSquare,
  faPlus,
  faTimes,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
interface Member {
  role: string;
  experience: string;
}

const CreateProjectForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [previewImgSrc, setPreviewImgSrc] =
    useState<string>("/assets/avatar.png");
  const [selectedApproval, setSelectedApproval] = useState<"yes" | "no">("no");
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([
    { role: "", experience: "no_experience" },
  ]);
  const [selectedTags, setSelectedTags] = useState<
    { label: string; color: string }[]
  >([]);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [lastTagColors, setLastTagColors] = useState<string | null>(null);

  const allTags = [
    "Technology",
    "Programming",
    "Web Development",
    "Design",
    "AI",
    "Machine Learning",
  ];

  const bgColors = [
    "bg-blue-200 hover:bg-blue-300",
    "bg-green-200 hover:bg-green-300",
    "bg-yellow-200 hover:bg-yellow-300",
    "bg-indigo-200 hover:bg-indigo-300",
    "bg-purple-200 hover:bg-purple-300",
    "bg-pink-200 hover:bg-pink-300",
    "bg-red-200 hover:bg-red-300",
    "bg-orange-200 hover:bg-orange-300",
    "bg-teal-200 hover:bg-teal-300",
    "bg-gray-200 hover:bg-gray-300",
    "bg-lime-200 hover:bg-lime-300",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;

    switch (type) {
      case "tags":
        setTagsInput(value);
        if (value.trim() !== "") {
          const filteredSuggestions = allTags.filter((tag) =>
            tag.toLowerCase().includes(value.toLowerCase())
          );
          setTagSuggestions(filteredSuggestions);
        } else {
          setTagSuggestions([]);
        }
        break;
      default:
        break;
    }
  };

  const getRandomBgColor = () => {
    let randomIndex = Math.floor(Math.random() * bgColors.length);
    let newColor = bgColors[randomIndex];

    while (newColor === lastTagColors) {
      randomIndex = Math.floor(Math.random() * bgColors.length);
      newColor = bgColors[randomIndex];
    }

    setLastTagColors(newColor);
    return newColor;
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.some((t) => t.label === tag)) {
      const color = getRandomBgColor();
      setSelectedTags((prevTags) => [...prevTags, { label: tag, color }]);
    }
    setTagsInput("");
    setTagSuggestions([]);
  };

  const handleRemoveTag = (
    tag: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Tambahkan ini untuk mencegah refresh
    setSelectedTags(selectedTags.filter((t) => t.label !== tag));
  };

  const handleSelectionApproval = (value: "yes" | "no") => {
    setSelectedApproval(value);
  };

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

        const imageElement = new window.Image();
        imageElement.src = fileURL;
        imageElement.onload = () => {
          URL.revokeObjectURL(fileURL);
        };
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const addMember = () => {
    setSelectedMembers([...selectedMembers, { role: "", experience: "" }]);
  };

  const removeMember = (index: number) => {
    const updatedRmMembers = selectedMembers.filter((_, i) => i !== index);
    setSelectedMembers(updatedRmMembers);
  };

  const updatedMember = (index: number, field: keyof Member, value: string) => {
    const updatedSelectedMember = selectedMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setSelectedMembers(updatedSelectedMember);
  };

  return (
    <section className="py-2 px-10">
      <h1 className="text-center text-2xl font-medium text-gray-200">
        Create Projects
      </h1>
      <p className="text-center text-gray-400 text-sm font-light">
        Define your project details with this step-by-step process
      </p>

      {/* Steps Navigation */}
      <div className="hidden lg:flex justify-center items-center my-6">
        <div
          className={`text-sm flex gap-2 items-center border-2 text-gray-300 rounded-full px-2 py-1 ${
            currentStep >= 1 ? "border-purple-600" : "border-gray-400"
          }`}
        >
          <span
            className={`text-xs rounded-full border py-1.5 px-3 ${
              currentStep >= 1 ? "bg-purple-600" : "border-gray-400"
            }`}
          >
            1
          </span>
          <span>Project Title</span>
        </div>
        <hr
          className={`border w-[40px] rounded-full ${
            currentStep > 1 ? "border-purple-600" : "border-gray-400"
          }`}
        />
        <div
          className={`text-sm flex gap-2 items-center border-2 text-gray-300 rounded-full px-2 py-1 ${
            currentStep >= 2 ? "border-purple-600" : "border-gray-400"
          }`}
        >
          <span
            className={`text-xs rounded-full border py-1.5 px-3 ${
              currentStep >= 2 ? "bg-purple-600" : "border-gray-400"
            }`}
          >
            2
          </span>
          <span>General Info</span>
        </div>
        <hr
          className={`border w-[40px] rounded-full ${
            currentStep > 2 ? "border-purple-600" : "border-gray-400"
          }`}
        />
        <div
          className={`text-sm flex gap-2 items-center border-2 text-gray-300 rounded-full px-2 py-1 ${
            currentStep === 3 ? "border-purple-600" : "border-gray-400"
          }`}
        >
          <span
            className={`text-xs rounded-full border py-1.5 px-3 ${
              currentStep === 3 ? "bg-purple-600" : "border-gray-400"
            }`}
          >
            3
          </span>
          <span>Tags & Extras</span>
        </div>
      </div>

      {/* Steps Content */}
      <div className="flex max-w-[70%] mx-auto justify-center">
        <form className="w-full bg-gray-100 p-4 rounded-lg shadow-lg">
          {currentStep === 1 && (
            <div>
              <span className="text-sm font-light text-gray-500">Step 1</span>
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Project Title
              </h2>
              <div className="flex flex-row space-x-6 items-start">
                <div className="relative flex-shrink-0 my-2">
                  <Image
                    id="preview_img"
                    className="h-[7rem] w-[7rem] object-cover rounded-full"
                    src={previewImgSrc}
                    alt="Current profile photo"
                    width={500}
                    height={100}
                  />
                  <label
                    htmlFor="img-projects-upload"
                    className="absolute bottom-0 right-0 bg-purple-600 py-1 px-2 rounded-full cursor-pointer hover:bg-purple-800"
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-white"
                    />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={loadFileImg}
                    className="hidden"
                    id="img-projects-upload"
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-2 text-sm">
                  <div className="w-full col-span-2">
                    <label className="block mb-1">Owner</label>
                    <input
                      type="text"
                      disabled={true}
                      className="cursor-not-allowed border rounded-md w-full p-2"
                      placeholder="Username"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">Project Title</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter project title"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">Company</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter project company"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">Start Date</label>
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={(date: Date | null) =>
                        setSelectedStartDate(date || new Date())
                      }
                      selectsStart
                      startDate={selectedStartDate}
                      minDate={new Date()}
                      className="cursor-pointer border rounded-md w-full p-2"
                      placeholderText="Select start date"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">End Date</label>
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={(date: Date | null) =>
                        setSelectedEndDate(date || new Date())
                      }
                      selectsStart
                      startDate={selectedEndDate}
                      minDate={new Date()}
                      className="cursor-pointer border rounded-md w-full p-2"
                      placeholderText="Select end date"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <span className="text-sm font-light text-gray-500">Step 2</span>
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                General Info
              </h2>
              <div className="flex flex-row space-x-6 items-start">
                <div className="relative flex-shrink-0 my-2">
                  <Image
                    id="preview_img"
                    className="h-[7rem] w-[7rem] object-cover rounded-full"
                    src={previewImgSrc}
                    alt="Current profile photo"
                    width={500}
                    height={100}
                  />
                  <label
                    htmlFor="img-projects-upload"
                    className="absolute bottom-0 right-0 bg-purple-600 py-1 px-2 rounded-full cursor-pointer hover:bg-purple-800"
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-white"
                    />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={loadFileImg}
                    className="hidden"
                    id="img-projects-upload"
                  />
                </div>
                <div className="w-full grid grid-cols-3 gap-2 text-sm">
                  <div className="w-full">
                    <label className="block mb-1">Types</label>
                    <select
                      disabled={true}
                      className="cursor-not-allowed border rounded-md w-full p-2 text-gray-400"
                    >
                      <option value="projects" selected>
                        Projects
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">Duration</label>
                    <select className="cursor-pointer border rounded-md w-full p-2">
                      <option value="day" selected>
                        Day
                      </option>
                      <option value="month" selected>
                        Month
                      </option>
                      <option value="year" selected>
                        Year
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">Participation</label>
                    <select className="cursor-pointer border rounded-md w-full p-2">
                      <option value="remote" selected>
                        Remote
                      </option>
                      <option value="onsite" selected>
                        On-site
                      </option>
                      <option value="Hybrid" selected>
                        Hybrid
                      </option>
                    </select>
                  </div>
                  {/* ADDRESS */}
                  <div className="w-full">
                    <label className="block mb-1">City</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter city location"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">State</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">ZIP</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter zip code"
                    />
                  </div>
                  <div className="w-full col-span-2">
                    <label className="block mb-1">Street</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter street address"
                    />
                  </div>
                  {/* PRIVATE */}
                  <div className="w-full">
                    <label className="block mb-1">Approval</label>
                    <div className="relative w-full h-10 bg-gray-300 rounded-full flex items-center">
                      <div
                        className={`absolute w-1/2 h-full bg-purple-600 rounded-full transition-all duration-300 ${
                          selectedApproval === "no" ? "left-0" : "right-0"
                        }`}
                      />
                      <label className="relative z-10 w-1/2 text-center cursor-pointer">
                        <input
                          type="radio"
                          name="slider"
                          value="no"
                          className="sr-only"
                          checked={selectedApproval === "no"}
                          onChange={() => handleSelectionApproval("no")}
                        />
                        <span
                          className={`text-sm ${
                            selectedApproval === "no"
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          No
                        </span>
                      </label>
                      <label className="relative z-10 w-1/2 text-center cursor-pointer">
                        <input
                          type="radio"
                          name="slider"
                          value="yes"
                          className="sr-only"
                          checked={selectedApproval === "yes"}
                          onChange={() => handleSelectionApproval("yes")}
                        />
                        <span
                          className={`text-sm ${
                            selectedApproval === "yes"
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          Yes
                        </span>
                      </label>
                    </div>
                  </div>
                  {selectedApproval === "yes" && (
                    <div className="w-full col-span-3">
                      <label className="block mb-1">
                        Member {`[${selectedMembers.length}]`}
                      </label>
                      <div className="w-full grid grid-cols-1 gap-2 text-sm">
                        {selectedMembers.map((member, index) => (
                          <div key={index} className="flex flex-row gap-2 pb-1">
                            <div className="w-1/5 text-left">
                              <span>{index}</span>
                            </div>
                            <div className="w-full">
                              <label className="block mb-1">Role</label>
                              <input
                                type="text"
                                className="border rounded-md w-full p-2"
                                placeholder="Enter member role"
                                value={member.role}
                                onChange={(
                                  e: React.FormEvent<HTMLInputElement>
                                ) =>
                                  updatedMember(
                                    index,
                                    "role",
                                    (e.target as HTMLInputElement).value
                                  )
                                }
                              />
                            </div>
                            <div className="w-full">
                              <label className="block mb-1">Experience</label>
                              <select
                                className="cursor-pointer border rounded-md w-full p-2"
                                value={member.experience}
                                onChange={(
                                  e: React.FormEvent<HTMLSelectElement>
                                ) =>
                                  updatedMember(
                                    index,
                                    "experience",
                                    (e.target as HTMLSelectElement).value
                                  )
                                }
                              >
                                <option value="no_experience" selected>
                                  No Experience
                                </option>
                                <option value="less_than_year" selected>
                                  &lt; 1 year
                                </option>
                                <option value="more_than_year" selected>
                                  &gt; 1 year
                                </option>
                              </select>
                            </div>
                            <div className="w-full flex flex-col items-center">
                              <label className="block mb-1 text-left">
                                Actions
                              </label>
                              <div
                                className={`w-1/2 flex flex-row h-10 gap-2 items-center relative text-xl ${
                                  selectedMembers.length > 1
                                    ? "justify-between"
                                    : "justify-center"
                                }`}
                              >
                                {selectedMembers.length > 1 && (
                                  <button
                                    type="button"
                                    aria-label="Delete"
                                    onClick={() => removeMember(index)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      className="cursor-pointer text-red-500 hover:text-red-700"
                                    />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  aria-label="Add"
                                  onClick={addMember}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="cursor-pointer text-purple-500 hover:text-purple-700"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="w-full col-span-3">
                    <label className="block mb-1">Description</label>
                    <textarea
                      className="border rounded-md w-full p-2"
                      placeholder="Enter project description"
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <span className="text-sm font-light text-gray-500">Step 3</span>
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Tags & Extras
              </h2>
              <div className="flex flex-row space-x-6 items-start">
                <div className="relative flex-shrink-0 my-2">
                  <img
                    id="preview_img"
                    className="h-[7rem] w-[7rem] object-cover rounded-full"
                    src={previewImgSrc}
                    alt="Current profile photo"
                    width={500}
                    height={100}
                  />
                  <label
                    htmlFor="img-projects-upload"
                    className="absolute bottom-0 right-0 bg-purple-600 py-1 px-2 rounded-full cursor-pointer hover:bg-purple-800"
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-white"
                    />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={loadFileImg}
                    className="hidden"
                    id="img-projects-upload"
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-2 text-sm">
                  <div className="w-full col-span-2">
                    <label className="block mb-1">Tags</label>
                    <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
                      {selectedTags.map((tag, index) => (
                        <div
                          key={index}
                          className={`py-1 px-3 text-sm rounded-full flex items-center ${tag.color}`}
                        >
                          <span className="text-sm text-[#07074D]">
                            {tag.label}
                          </span>
                          <button
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                              handleRemoveTag(tag.label, e)
                            }
                            className="ml-2 text-slate-800 hover:text-slate-600"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      ))}

                      <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={tagsInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "tags")
                        }
                        placeholder="Type to add tags"
                        className="flex-grow outline-none text-sm font-medium bg-transparent"
                      />
                    </div>
                    {tagSuggestions.length > 0 && (
                      <ul className="absolute border border-gray-300 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                        {tagSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleAddTag(suggestion)}
                            className="cursor-pointer py-2 px-4 text-sm hover:bg-gray-200"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">Project Title</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter project title"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">Company</label>
                    <input
                      type="text"
                      className="border rounded-md w-full p-2"
                      placeholder="Enter project company"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div
            className={`flex mt-4 ${
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
              disabled={currentStep === 3}
              className={`py-2 px-4 bg-purple-600 text-white rounded-md ${
                currentStep === 3 ? "cursor-not-allowed" : "hover:bg-purple-700"
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateProjectForm;
