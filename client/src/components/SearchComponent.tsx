import { useState } from "react";
import useFilterHook from "../hooks/useFilterHook";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState("");
  const { setQ } = useFilterHook();
  const navigate = useNavigate();

  const handleSearch = () => {
    setQ(searchResults);
    navigate(`/files?q=${encodeURIComponent(searchResults)}`);
  };

  return (
    <div className="flex items-center w-[50vw] my-5  shadow-md">
      <svg
        onClick={() => handleSearch()}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className=" size-10 p-1 bg-white rounded-l-lg hover:cursor-pointer text-purple-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        onChange={(e) => setSearchResults(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search files and folders"
        className="rounded-r-lg bg-white text-gray-500 p-2 focus:outline-none px-3 w-full "
      ></input>
    </div>
  );
};

export default SearchComponent;
