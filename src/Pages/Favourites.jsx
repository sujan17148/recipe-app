import { useContext } from "react";
import { currentUserContext } from "../Context/UserContext";
import RecipeCard from "../Components/RecipeCard";
import { Link } from "react-router-dom";

export default function Favourites() {
  const { currentUser} = useContext(currentUserContext);
  return (
    <div className="min-h-[calc(100dvh-64px-64px)] bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text py-10 px-5 xl:px-10 ">
      {currentUser ? (
        currentUser.favourites.length > 0 ? (
          <div >
           <h1 className="font-roboto text-2xl font-bold ">Your Favourite Recipe</h1>
           <FavouritesCardContainer/>
          </div>
        ) : (
          <div className="h-full min-h-[calc(100dvh-64px-64px)] flex justify-center items-center font-bold text-xl ">
            No Favourites Yet
          </div>
        )
      ) : (
        <div className="text-center min-h-[calc(100dvh-64px-64px)] font-bold flex flex-col gap-2.5 items-center justify-center">
          Don't have an Account ?{" "}
          <Link to="/signup" className="custom-button font-bold">
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
}
function FavouritesCardContainer(){
  const { currentUser} = useContext(currentUserContext);
  return <div className="flex items-center gap-5 flex-wrap py-5">
  {currentUser.favourites.map(recipe=> <Link className="custom-flexible-cards" to={`/recipe/${Number(recipe.id)}`}><RecipeCard key={recipe.id} id={recipe.id} image={recipe.image} title={recipe.title}  showFavourite={true}/></Link>)}
  </div>
}
