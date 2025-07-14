import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../../Hooks/useDebounce";
import useFetch from "../../Hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar({ className = "" }) {
  let navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue);
     const[suggestions,setSuggestions]=useState([])
  const fetchurl = debouncedSearchValue.trim()
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchValue}`
    : null;
  const { data, isLoading } = useFetch(fetchurl);
      useEffect(()=>{
        if(!isLoading && data.meals){
          setSuggestions(data?.meals.slice(0, 5))
        }
        if(debouncedSearchValue.trim().length==0) setSuggestions([])
      },[debouncedSearchValue,data])
     
  function handleSearch(e) {
    if (e.key == "Enter" && searchValue.length > 0) {
      navigate(`/search?q=${searchValue}`);
      setSuggestions([])
      setSearchValue("");
    }
  }
  return (
    <div className="search-bar relative max-w-fit dark:text-light-text ">
      <input
        onKeyDown={handleSearch}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search recipes..."
        className={`bg-light-background  min-w-[300px]  p-2 outline-none focus:border-light-primary dark:focus:border-light-primary focus:border-2 rounded-4xl ${className}`}
      />
      <FaSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-dark-primary font-medium text-xl" />

      <div
        className={`suggestions absolute z-10 top-11 right-1 w-[95%] rounded-t-xl pt-1 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000] ${suggestions.length==0 ? "hidden":""}`}
      >
        {isLoading ? (
          <div className=" loader p-10 text-center">Loading...</div>
        ) : (
           suggestions.length>0 &&
              suggestions.map((suggestion, index) => (
            <Link   key={index}
            onClick={() => {
              setSearchValue("")
              setSuggestions([])
            }}
              to={`/recipe/${suggestion.idMeal}`}
            >
              <span 
                className="p-2 py-1 border-b w-full inline-block border-b-light-primary"
              >
                {suggestion.strMeal}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
