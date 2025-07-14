import { useContext, useEffect, useState } from "react";
import { userContext,currentUserContext } from "../Context/UserContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function FavouriteIcon({ details,className }) {
  let navigate = useNavigate();
  const { users, setUsers }=useContext(userContext)
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [isFavourite, setIsFavourite] = useState(false);
  function addToFavourite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!currentUser) {
      navigate("/signup");
    }
    else{
        setCurrentUser((prev) => ({
            ...prev,
            favourites:[...prev.favourites,{ id: details.id, title: details.title, image: details.image }] || [] 
          }));
          setUsers(prev=>prev.map(user=>user.email==currentUser.email?{...user,favourites:[...user.favourites,{ id: details.id, title: details.title, image: details.image }] || [] }:user))
    }
  }
  function removeFromFavourites(e){
    e.stopPropagation();
    e.preventDefault();
       setCurrentUser(prev=>({...prev,favourites:prev.favourites.filter(recipe=>recipe.id!=details.id)}))
  }
  useEffect(() => {
    if (currentUser?.favourites?.find((recipe) => recipe.id == details.id)) setIsFavourite(true);
    else setIsFavourite(false)
  }, [currentUser]);
  return (
    <>
      {isFavourite ? (
        <FaHeart onClick={removeFromFavourites} className={className}/>
      ) : (
        <FaRegHeart
          onClick={addToFavourite}
          className={className}
        />
      )}
    </>
  );
}
<FaRegHeart />;
