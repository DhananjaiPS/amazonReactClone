import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { suggestion } from "../data/mockData";
import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Searchbar = ({ SearchTerm, setSearchTerm }) => {
    const navigate = useNavigate();
    const [value, setValue] = useState(SearchTerm);

    const filterSuggestions = useMemo(() => {
        if (!value) {
            return [];
        }
        const data = suggestion?.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
        return data;

    })

    return (
        <div className="flex flex-grow text-black">
            <select className="rounded-l-md w-[60px] px-2 text-sm bg-gray-100 border-r">
                <option value="all">All</option>
            </select>
            <input
                type="text"
                onChange={(e) => setValue(e.target.value)}
                vaule={value}
                className="flex-grow px-2"
                placeholder="Search Amazon.in"
            />
            <div
                className="bg-orange-300 rounded-r-md w-[50px] h-[40px] bg-no-repeat bg-[url('/logos.png')] bg-[contain]"

                onClick={() => {

                    navigate(`/search?q=${encodeURIComponent(value)}`)

                }}
                style={{ backgroundPosition: "-15px -580px" }}
            >
                <span className="flex items-center justify-center h-full w-full">
                    <MagnifyingGlass size={28} />
                </span>
            </div>

            {filterSuggestions.length > 0 && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-[90vh] items-start flex flex-col justify-start top-12 left-280 transform translate-x-[-0%]">
                    {filterSuggestions.map((suggestion, index) => (
                        <div key={index} className="p-2 hover:bg-gray-200 h-10 cursor-pointer relative items-start flex w-full">
                            <p
                                className="text-sm text-left w-full"
                                onClick={() => {
                                    setValue(suggestion);
                                    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                                }}
                            >
                                {suggestion}
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Searchbar;
// ReactDOM.render(<App />, document.getElementById("root"));