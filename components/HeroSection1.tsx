"use client";
import { useState } from "react";

export default function HeroSection1() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);

    const keywords = [
        "Registered Nurse",
        "Nurse Practitioner",
        "Pediatric Nurse",
        "ICU Nurse",
        "Emergency Nurse",
        "Clinical Nurse",
        "Surgical Nurse",
        "Healthcare Assistant",
        "Nursing Supervisor",
        "Geriatric Nurse",
        "Nurse Educator",
        "Community Health Nurse",
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === "") {
            setFilteredKeywords([]);
        } else {
            const filtered = keywords.filter((k) =>
                k.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredKeywords(filtered);
        }
    };

    const handleSearch = (keyword?: string) => {
        const term = keyword || searchTerm;
        if (!term) return;
        alert(`Searching for: ${term}`);
        setSearchTerm(term);
        setFilteredKeywords([]);
    };

    return (
        <div className=" py-15 px-4 text-center mx-auto container mt-5">
            <div
                className="bg-cover bg-center bg-no-repeat py-5 px-4 text-center "
                style={{ backgroundImage: "url('/assets/')" }}
            >

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Find Your Dream Job With{" "}
                    <span className="text-blue-600">VFind</span>
                </h1>

                <div className="max-w-xl mx-auto relative">
                    <div className="flex rounded-md overflow-hidden shadow">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Search for nurse jobs or healthcare roles"
                            className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={() => handleSearch()}
                            className="bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
                        >
                            Search
                        </button>
                    </div>

                   

                    {filteredKeywords.length > 0 && (
                        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-auto rounded-md shadow z-10 text-left">
                            {filteredKeywords.map((keyword) => (
                                <li
                                    key={keyword}
                                    onClick={() => handleSearch(keyword)}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                >
                                    {keyword}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
