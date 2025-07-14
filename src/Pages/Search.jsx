import { useLocation,Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import RecipeCard from "../Components/RecipeCard";
export default function Search() {
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const { data, isLoading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  return (
    <div className="Search-page p-5 lg:p-10 bg-light-background dark:bg-dark-background min-h-[calc(100dvh-64px-64px)] text-light-text dark:text-dark-text">
      <h1 className="title text-xl font-semibold capitalize">
        Search Results: {decodeURIComponent(query)}
      </h1>
      <div className="search-cards flex flex-wrap py-5 gap-5 justify-center">
        {!isLoading && !error ? (data?.meals?.map(recipe=><Link className="custom-flexible-cards" key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`}><RecipeCard id={recipe.idMeal} image={recipe.strMealThumb} title={recipe.strMeal} showFavourite={true} /></Link>)) : <div></div>}
      </div>
    </div>
  );
}
