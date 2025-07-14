import Recipe from "../Components/Recipe"
import useFetch from "../Hooks/useFetch"
export default function Random(){
    const {data,error,isLoading}=useFetch("https://www.themealdb.com/api/json/v1/1/random.php")
    return <Recipe data={data} error={error} isLoading={isLoading} />
}

