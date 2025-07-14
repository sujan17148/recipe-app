import { useState,useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import FavouriteIcon from "./FavouriteIcon"
import NotFound from "../Pages/NotFound"
export default function Recipe({data,error,isLoading}){
    const [ingridents, setIngridents] = useState([]);
    useEffect(() => {
        //extract ingridents and measurements
        const ingridents = [];
        if (data && Object.keys(data).length > 0) {
          for (let i = 1; i < 20; i++) {
            const ingrident = data?.meals[0][`strIngredient${i}`];
            const measure = data?.meals[0][`strMeasure${i}`];
            if (ingrident && ingrident.trim() != "") {
              ingridents.push({ ingrident: ingrident, measure: measure });
            }
          }
        }
    
        setIngridents(ingridents);
      }, [data]);

      return (
        <div className="bg-light-background min-h-[calc(100dvh-64px-64px)] dark:bg-dark-background text-light-text dark:text-dark-text p-5 xl:px-10">
      {isLoading ? (
        <div className="flex justify-center items-center font-bold text-2xl min-h-[calc(100dvh-64px-64px)]">
          Loading...
        </div>
      ) : error ? (
        <NotFound/>
      ) : (
        <div className="recipe-details lg:px-10">
          <div className="heros-section lg:flex p-5 lg:p-10 justify-center items-center gap-25 bg-light-background dark:bg-dark-background ">
          <div className="hero-section-right flex   items-center gap-5">
          <img
              src={data.meals[0].strMealThumb}
              alt="recipe-image"
              className="aspect-[9/16] max-h-92 w-[calc(40%)] max-w-44  rounded-xl shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000] "
            />
            <div className="right space-y-2.5">
              <h1 className="title text-4xl font-bold font-roboto">
                {data.meals[0].strMeal}
              </h1>
              <div className="details flex flex-wrap items-center gap-2.5 ">
                {" "}
                <span className="location">{data.meals[0].strArea}</span>
                <span className="category">{data.meals[0].strCategory}</span>
                <FavouriteIcon
                  details={{image:data.meals[0].strMealThumb,title:data.meals[0].strMeal,id:data.meals[0].idMeal}}
                  className="h-10 w-10 rounded-full px-2 text-light-primary hover:bg-dark-primary "
                />
                <a href={data.meals[0].strYoutube} target="_blank" className=" custom-button flex items-center justify-center gap-3 px-2">Watch<FaPlay/></a>
               
              </div>
              {data.meals[0].strTags && (
                  data.meals[0].strTags.split(",").map(tag=>(<span className="tags p-1 m-1 bg-light-primary rounded ">{tag}</span>))
                )}
            </div>
          </div>
          <Ingridents ingridents={ingridents} />
          </div>
            <RecipeSteps data={data} />
        </div>
      )}
    </div>
      )
}

function Ingridents({ ingridents }) {
    return (
      <div className=" rounded-xl shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000] w-full h-fit  lg:w-[45%] font-medium p-5 my-5">
        <h1 className="font-bold text-3xl mb-3">Ingridents</h1>
        {ingridents.map((item, index) => (
          <div key={index} className="flex justify-between">
            {" "}
            <span>{item.ingrident}</span> <span>{item.measure}</span>
          </div>
        ))}
      </div>
    );
  }
  function RecipeSteps({ data }) {
    let recipeInstruction = data.meals[0].strInstructions
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return (
      <div className="recipe-steps  rounded-2xl  shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000]">
        <h1 className="font-bold text-3xl mb-3">Recipe</h1>
        {recipeInstruction.map((instruction, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="flex justify-center items-center h-10 w-10 p-2 font-bold bg-dark-primary text-light-primary text-xl rounded-full">
              {index + 1}
            </span>
            <p className="my-3 inline-block">{instruction}.</p>
          </div>
        ))}
      </div>
    );
  }