import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const HeroFilterBtn: React.FC<{ data: any; isOpen: boolean; toggleDropdown: () => void; resetKey: number; }> = ({ data, isOpen, toggleDropdown, resetKey }) => {
    const [selectedOption, setSelectedOption] = useState<string>(data?.name);

    useEffect(() => {
        setSelectedOption(data?.name);
    }, [resetKey]);

    const handleOptionClick = (optionName: string) => {
        setSelectedOption(optionName);
        toggleDropdown();
    };

    const handleReset = () => {
        setSelectedOption(data?.name);
        toggleDropdown();
    };

    const buttonColorClass = selectedOption !== data?.name 
        ? 'bg-Navy text-white '  
        : 'bg-white text-Navy border hover:border-NavyLight transition ease-in-out duration-100'; 

    return (
        <div className="relative cursor-pointer">
            <button 
                className={`flex items-center justify-between space-x-5 border border-Navy rounded-lg px-4 ${buttonColorClass}`}
                onClick={toggleDropdown}
            >
                <span className="menu-hover py-2 text-sm font-medium">
                    {selectedOption}
                </span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </button>

            {isOpen && (
                <div className="absolute z-50 flex w-full flex-col bg-gray-50 py-1 px-4 text-gray-800 shadow-xl mt-1">
                    {selectedOption !== data?.name && (
                        <button 
                            onClick={handleReset} 
                            className="mt-2 block w-full rounded-lg bg-red-100 text-Red py-1 text-sm font-medium hover:bg-red-200"
                        >
                            Reset
                        </button>
                    )}

                    {data?.options.map((d: any) => (
                        <button key={d?.id}
                           onClick={() => handleOptionClick(d?.name)} 
                           className="my-2 block border-b border-gray-100 text-sm text-gray-500 hover:text-Navy">
                            {d?.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroFilterBtn;
