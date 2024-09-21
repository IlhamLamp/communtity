'use client';
import { filterData } from "@/components/Buttons/data";
import HeroFilterBtn from "@/components/Buttons/HeroFilterBtn";
import { useState } from "react";

const ContentHome: React.FC = () => {

    const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null);
    const [resetKey, setResetKey] = useState<number>(0);

    const toggleDropdown = (id: number) => {
        setSelectedDropdown(selectedDropdown === id ? null : id);
    };

    const resetDropdowns = () => {
        setResetKey(prevKey => prevKey + 1); 
        setSelectedDropdown(null);
    };

    return (
        <section className="mx-auto w-full flex justify-center">
            <div className="hidden lg:flex mx-8 items-center justify-center w-full rounded-md bg-white shadow-lg">
                <div className="flex flex-row items-center gap-2 w-full p-4">
                    <div className="flex flex-row gap-2 w-3/4">
                        {filterData.map((data) => (
                            <HeroFilterBtn 
                                key={data.id} 
                                data={data} 
                                isOpen={selectedDropdown === data.id} 
                                toggleDropdown={() => toggleDropdown(data.id)}
                                resetKey={resetKey}
                            />
                        ))}
                    </div>
                    <div className="flex w-1/4 items-end justify-end">
                        <button onClick={resetDropdowns} className="px-4 py-2 bg-Red text-white rounded-lg hover:bg-red-500 transition ease-linear duration-100">
                            Reset All Filters
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex">
            </div>
        </section>
    )
}

export default ContentHome;