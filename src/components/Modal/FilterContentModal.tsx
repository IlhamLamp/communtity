import { faCircleXmark, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type TFilterData = {
  types: string;
  tags: { label: string; color: string }[];
  role: string;
  location: string;
  duration: string;
  participation: string;
  experience: string;
};

const FilterContentModal: React.FC<{
  data: TFilterData;
  toggle: any;
  onApplyFilters: (filters: any) => void;
}> = ({ data, toggle, onApplyFilters }) => {
  const [types, setTypes] = useState<string>(data?.types || "");
  const [tags, setTags] = useState<{ label: string; color: string }[]>(
    data?.tags || []
  );
  const [tagsInput, setTagsInput] = useState<string>("");
  const [roleInput, setRoleInput] = useState(data?.role || "");
  const [locationInput, setLocationInput] = useState<string>(
    data?.location || ""
  );
  const [duration, setDuration] = useState<string>(data?.duration || "");
  const [participation, setParticipation] = useState<string>(
    data?.participation || ""
  );
  const [experience, setExperience] = useState<string>(data?.experience || "");

  const [roleSuggestions, setRoleSuggestions] = useState<string[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [lastColor, setLastColor] = useState<string | null>(null);

  const allRoles = [
    "Programmer",
    "Designer",
    "Data Scientist",
    "DevOps Engineer",
    "Product Manager",
    "Backend Developer",
    "Frontend Developer",
  ];
  const allTags = [
    "Technology",
    "Programming",
    "Web Development",
    "Design",
    "AI",
    "Machine Learning",
  ];
  const allLocations = ["Aceh", "Bandung", "Other"];

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
      case "role":
        setRoleInput(value);
        if (value.trim() !== "") {
          const filteredSuggestions = allRoles.filter((role) =>
            role.toLowerCase().includes(value.toLowerCase())
          );
          setRoleSuggestions(filteredSuggestions);
        } else {
          setRoleSuggestions([]);
        }
        break;
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
      case "location":
        setLocationInput(value);
        if (value.trim() !== "") {
          const filteredSuggestions = allLocations.filter((loc) =>
            loc.toLowerCase().includes(value.toLowerCase())
          );
          setLocationSuggestions(filteredSuggestions);
        } else {
          setLocationSuggestions([]);
        }
        break;
      default:
        break;
    }
  };

  // Fungsi untuk memilih role dari suggestion
  const handleSelectRole = (role: string) => {
    setRoleInput(role);
    setRoleSuggestions([]);
  };

  const handleSelectLocation = (loc: string) => {
    setLocationInput(loc);
    setLocationSuggestions([]);
  };

  const handleAddTag = (tag: string) => {
    if (!tags.some((t) => t.label === tag)) {
      const color = getRandomBgColor();
      setTags((prevTags) => [...prevTags, { label: tag, color }]);
    }
    setTagsInput("");
    setTagSuggestions([]);
  };

  // Fungsi untuk menghapus tag
  const handleRemoveTag = (
    tag: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Tambahkan ini untuk mencegah refresh
    setTags(tags.filter((t) => t.label !== tag));
  };

  const getRandomBgColor = () => {
    let randomIndex = Math.floor(Math.random() * bgColors.length);
    let newColor = bgColors[randomIndex];

    // Pastikan warna baru tidak sama dengan warna sebelumnya
    while (newColor === lastColor) {
      randomIndex = Math.floor(Math.random() * bgColors.length);
      newColor = bgColors[randomIndex];
    }

    // Simpan warna baru sebagai warna terakhir yang digunakan
    setLastColor(newColor);
    return newColor;
  };

  const handleApplyFilterClick = () => {
    // Prepare the filter object with selected values
    const filters = {
      types,
      tags,
      role: roleInput,
      location: locationInput,
      duration,
      participation,
      experience,
    };

    // Call the onApplyFilters function from the parent with the new filter values
    onApplyFilters(filters);
  };

  // Reset semua input ke nilai awal
  const handleResetFilters = () => {
    setTypes("");
    setTags([]);
    setTagsInput("");
    setRoleInput("");
    setLocationInput("");
    setDuration("");
    setParticipation("");
    setExperience("");
  };

  // Periksa apakah ada input yang terisi
  const hasMoreThanOneInputFilled = () => {
    let filledInputs = 0;
    if (types) filledInputs++;
    if (tags.length > 0) filledInputs++;
    if (roleInput) filledInputs++;
    if (locationInput) filledInputs++;
    if (duration) filledInputs++;
    if (participation) filledInputs++;
    if (experience) filledInputs++;
    return filledInputs > 0;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-2 lg:p-0">
      <div className="relative mx-auto w-full max-w-[800px] bg-white p-8 rounded-lg">
        <button onClick={toggle} className="absolute -top-4 -right-2 text-xl">
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="bg-white rounded-full text-red-400"
          />
        </button>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <form>
            <div className="mb-2 pt-2">
              <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
                <div className="w-full">
                  <label
                    htmlFor="types"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Types
                  </label>
                  <select
                    name="types"
                    id="types"
                    value={types}
                    onChange={(e) => setTypes(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="events">Events</option>
                    <option value="projects">Projects</option>
                    <option value="group">Group</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Duration
                  </label>
                  <select
                    name="duration"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="participation"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Participation
                  </label>
                  <select
                    name="participation"
                    id="participation"
                    value={participation}
                    onChange={(e) => setParticipation(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Bekasi"
                    value={locationInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "location")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {locationSuggestions.length > 0 && (
                    <ul className="absolute border border-gray-300 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                      {locationSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectLocation(suggestion)}
                          className="cursor-pointer py-2 px-4 hover:bg-gray-200 text-sm"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Programmer"
                    value={roleInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "role")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {roleSuggestions.length > 0 && (
                    <ul className="absolute border border-gray-300 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                      {roleSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectRole(suggestion)}
                          className="cursor-pointer py-2 px-4 hover:bg-gray-200 text-sm"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Experience
                  </label>
                  <select
                    name="experience"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="no">No Experience</option>
                    <option value="< 1 year">&lt; 1 year</option>
                    <option value="> 1 year">&gt; 1 year</option>
                  </select>
                </div>
              </div>
              <div className="w-full pt-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-[#07074D]"
                >
                  Tags
                </label>
                <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
                  {tags.map((tag, index) => (
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

                {/* Dropdown suggestion */}
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
            </div>
          </form>
        </div>
        {/* BUTTON */}
        <div className="mt-2">
          <button
            onClick={handleApplyFilterClick}
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-sm font-semibold text-white outline-none"
          >
            Apply filter
          </button>
          {hasMoreThanOneInputFilled() && (
            <button
              onClick={handleResetFilters}
              className="hover:shadow-form w-full rounded-md bg-red-400 py-2 px-8 text-center text-sm font-semibold text-white outline-none"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterContentModal;
