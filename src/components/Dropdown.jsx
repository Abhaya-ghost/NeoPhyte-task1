import React, { useState } from "react";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownItems = ['Option 1', 'Option 2', 'Option 3'];
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onOptionClick = (value) => {
        setSelectedOption(value);
        setIsOpen(false);
    }
    return (
        <div className="inline-flex ">
            <div className="relative inline-flex min-w-[180px] rounded-md bg-white">
                <button type="button" onClick={toggleDropdown} className="w-[100%] wounded-1-md px-2 py-2 ml-6 border border-gray-400">
                    {selectedOption || 'Select'}
                </button>
                <div className="relative">
                    <button type="button" className="hover:text-gray-700 inline-flex h-full items-center justify-center rounded-r-md border-1 border-gray-10 px-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {isOpen && (
                    <div className="absolute top-6 right-0 min-w-[200px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {dropdownItems.map((option, index) =>
                        (<div>
                            <button type="button" onClick={() => onOptionClick(option)} key={index}>
                                <div className="block rounded-lg px-4 py-2 text-sm text-gray-500 no-underline hover:bg-gray-50">
                                    {option}
                                </div>
                            </button>
                        </div>)
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


export default Dropdown;