import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileInfoModal: React.FC<{ data: any; toggle: any; }> = ({ data, toggle }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-2 lg:p-0">
            <div className="relative mx-auto w-full max-w-[800px] bg-white p-8 rounded-lg">

                <button onClick={toggle} className="absolute -top-4 -right-2 text-xl">
                    <FontAwesomeIcon icon={faCircleXmark} size="xl" className="bg-white rounded-full text-red-400" />
                </button>

                <div className="max-h-[70vh] overflow-y-auto pr-2">
                    <form>
                        <div className="mb-2">
                            <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
                                Contact Information
                            </label>
                            <div className="gap-2 grid grid-cols-2 lg:grid-cols-3">
                                <div className="w-full">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-[#07074D]">First Name</label>
                                    <input type="text" name="first_name" id="first_name" placeholder="John" className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="last_name" className="block text-sm font-medium text-[#07074D]">Last Name</label>
                                    <input type="text" name="last_name" id="last_name" disabled={true} placeholder="Doe" className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] cursor-not-allowed" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="username" className="block text-sm font-medium text-[#07074D]">Username</label>
                                    <input type="text" name="username" id="username" placeholder="jdoe99" value={data?.username} className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="email" className="block text-sm font-medium text-[#07074D]">Email</label>
                                    <input type="email" name="email" id="email" disabled={true} placeholder="user@mail.com" value={data?.email} className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-2 px-4 text-sm font-medium text-[#6B7280] cursor-not-allowed" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="phone" className="block text-sm font-medium text-[#07074D]">Phone Number</label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-[#e0e0e0] bg-gray-100 text-gray-600 text-sm">+62</span>
                                        <input type="number" name="phone" id="phone" placeholder="8123456789" value={data?.phone} className="w-full rounded-r-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md no-sp" />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="date" className="block text-sm font-medium text-[#07074D]">Born Date</label>
                                    <input type="date" name="date" id="date" className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>
                            </div>
                        </div>

                        <div className="mb-2 pt-2">
                            <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
                                Address Details
                            </label>
                            <div className="gap-2 grid grid-cols-1 lg:grid-cols-3">
                                <div className="w-full">
                                    <label htmlFor="city" className="block text-sm font-medium text-[#07074D]">City</label>
                                    <input type="text" name="city" id="city" placeholder="Jakarta" value={data?.address.city} className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="state" className="block text-sm font-medium text-[#07074D]">State</label>
                                    <input type="text" name="state" id="state" placeholder="Indonesia" value={data?.address.state} className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="zip_code" className="block text-sm font-medium text-[#07074D]">ZIP Code</label>
                                    <input type="number" name="zip_code" id="zip_code" placeholder="11111" value={data?.address.zip_code} className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full py-1">
                                <label htmlFor="street" className="block text-sm font-medium text-[#07074D]">Street</label>
                                <input type="text" name="street" id="street" placeholder="Jl. Mawar No.80" value={data?.address.state} className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>

                        <div className="mb-2 pt-2">
                            <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
                                Working Status
                            </label>
                            <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
                                <div className="w-full">
                                    <label htmlFor="role" className="block text-sm font-medium text-[#07074D]">Role</label>
                                    <input type="text" name="role" id="role" placeholder="Programmer" value={data?.role} className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="experience" className="block text-sm font-medium text-[#07074D]">Experience</label>
                                    <input type="text" name="experience" id="experience" placeholder="0 Years" className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full py-1">
                                <label htmlFor="street" className="block text-sm font-medium text-[#07074D]">Interest</label>
                                <input type="text" name="street" id="street" placeholder="Jl. Mawar No.80" className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-2">
                    <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-sm font-semibold text-white outline-none">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoModal;
