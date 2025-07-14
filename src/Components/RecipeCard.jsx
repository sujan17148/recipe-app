import FavouriteIcon from "./FavouriteIcon";

export default function RecipeCard({
  image,
  title,
  showFavourite = false,
  id,
}) {
  return (
    <div className={`w-full relative aspect-[12/16]  rounded-xl bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text hover:scale-105 transition duration-300 ease-linear shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000]`}>
      <img src={image} alt="food" className="w-full rounded-t-xl h-[85%] " />
     <div className="relative h-[15%] flex items-center">
      <p className="font-bold text-xl mx-3 w-4/6 line-clamp-1">{title}</p>
      {!!showFavourite && (
        <FavouriteIcon
          className="hover:bg-dark-primary absolute right-2 top-1/2 -translate-y-1/2 rounded-full  h-12 w-12 px-3 text-dark-secondary"
          details={{ image, title, id }}
        />
      )}</div>
    </div>
  );
}