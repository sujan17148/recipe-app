import Recipe from "../Components/Recipe";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
export default function RecipeDetails() {
  let { id } = useParams();
  let { data, error, isLoading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  console.log(data)
  return <Recipe data={data} error={error} isLoading={isLoading}/>
}


