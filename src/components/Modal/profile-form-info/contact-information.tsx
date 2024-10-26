import { TProfileUser } from "@/types/profile";

const FormProfileContactInformation: React.FC<{
  data: TProfileUser | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
}> = ({ data, handleInputChange }) => {
  const email = sessionStorage.getItem("email") ?? "";
  return (
    <div className="mb-2">
      <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
        Contact Information
      </label>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-[#07074D]"
          >
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="John"
            value={data?.first_name}
            onChange={(e) => handleInputChange(e, "first_name")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-[#07074D]"
          >
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Doe"
            value={data?.last_name}
            onChange={(e) => handleInputChange(e, "last_name")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] cursor-not-allowed"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#07074D]"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="jdoe99"
            value={data?.username}
            onChange={(e) => handleInputChange(e, "username")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#07074D]"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            disabled={true}
            placeholder="user@mail.com"
            value={email}
            className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-2 px-4 text-sm font-medium text-[#6B7280] cursor-not-allowed"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#07074D]"
          >
            Phone Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-[#e0e0e0] bg-gray-100 text-gray-600 text-sm">
              +62
            </span>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="8123456789"
              value={data?.phone}
              onChange={(e) => handleInputChange(e, "phone")}
              className="w-full rounded-r-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md no-sp"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-[#07074D]"
          >
            Birthday
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            value={
              data?.birthday ? data.birthday.toISOString().split("T")[0] : ""
            }
            onChange={(e) => handleInputChange(e, "birthday")}
          />
        </div>
      </div>
    </div>
  );
};

export default FormProfileContactInformation;
