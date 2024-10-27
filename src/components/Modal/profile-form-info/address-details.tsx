import { TAddressFieldInputProfile, TProfileUser } from "@/types/profile";
import { ChangeEvent } from "react";

const FormProfileAddressDetails: React.FC<{
  data: TProfileUser | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TProfileUser | TAddressFieldInputProfile
  ) => void;
}> = ({ data, handleInputChange }) => {
  return (
    <div className="mb-2 pt-2">
      <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
        Address Details
      </label>
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-3">
        <div className="w-full">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-[#07074D]"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Jakarta"
            value={data?.address?.city || ""}
            onChange={(e) => handleInputChange(e, "address.city")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-[#07074D]"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            placeholder="Indonesia"
            value={data?.address?.state || ""}
            onChange={(e) => handleInputChange(e, "address.state")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="zip_code"
            className="block text-sm font-medium text-[#07074D]"
          >
            ZIP Code
          </label>
          <input
            type="text"
            name="zip_code"
            id="zip_code"
            placeholder="11111"
            value={data?.address?.zip_code || ""}
            pattern="\d{0,6}"
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              if (e.target.value.length > 6)
                e.target.value = e.target.value.slice(0, 6);
            }}
            onChange={(e) => handleInputChange(e, "address.zip_code")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
      </div>
      <div className="w-full pt-2">
        <label
          htmlFor="street"
          className="block text-sm font-medium text-[#07074D]"
        >
          Street
        </label>
        <input
          type="text"
          name="street"
          id="street"
          placeholder="Jl. Mawar No.80"
          value={data?.address?.street || ""}
          onChange={(e) => handleInputChange(e, "address.street")}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </div>
  );
};

export default FormProfileAddressDetails;
