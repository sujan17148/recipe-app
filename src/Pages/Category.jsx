import { useLoaderData, useNavigate, useParams, Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import RecipeCard from "../Components/RecipeCard";
 import NotFound from "../Pages/NotFound"

export default function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  const categoriesList = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState(category);
  const { data, error, isLoading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
  );
  function handleChange(e) {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory); 
    navigate(`/category/${newCategory}`);
  }
  return (
    <div className="Category-page min-h-[calc(100dvh-64px-64px)]  p-5 lg:px-10 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      <div className="top-setcion flex justify-between items-center">
        <h1 className="font-bold text-xl">{category}</h1>
        <div className="options relative">
          <select
            value={category}
            onChange={handleChange}
            className="appearance-none inline-block outline-none w-40 border-2  bg-light-background dark:bg-dark-background border-light-primary p-2 rounded text-light-text dark:text-dark-text"
          >
            {categoriesList.meals.map((category, index) => (
              <option key={index} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
          <IoIosArrowForward className="absolute top-1/2 text-light-text dark:text-dark-text -translate-y-1/2 right-2 text-lg font-bold clicked:rotate-90" />
        </div>
      </div>
      <div className="cards flex flex-wrap gap-5 my-10">
        {isLoading ? (
          <div className="min-h-[calc(100dvh-64px-64px)] text-center flex items-center justify-center">
            Loading...
          </div>
        ) : error ? (
          <NotFound/>
        ) : (
          data?.meals?.map((category, index) => (
            <Link
              key={category.idMeal}
              to={`/recipe/${Number(category.idMeal)}`}
              className="custom-flexible-cards"
            >
              <RecipeCard
                id={category.idMeal}
                image={category.strMealThumb}
                title={category.strMeal}
                showFavourite={true}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export async function loadCategories() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    if (!response.ok) throw new Error("Error fetching Data");
    return response.json();
  } catch (error) {
    return error;
  }
}
