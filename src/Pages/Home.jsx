import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { CiForkAndKnife } from "react-icons/ci";
import { LuChefHat } from "react-icons/lu";
import RecipeCard from "../Components/RecipeCard";
export default function Home() {
  return (
    <>
      <Hero />
      <InfoSection />
      <CategorySection />
    </>
  );
}
function Hero() {
  return (
    <div className="hero-section md:flex flex-row-reverse items-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-[calc(100dvh-64px-64px)] font-black px-5 xl:px-10 py-10 md:py-0">
    <div className="right flex justify-center items-center md:w-1/2 mb-10 md:mb-0">
      <img className="object-cover w-full max-w-[400px] md:max-w-full h-auto" src="/burger.webp" loading="lazy" alt="recipe-img" />
    </div>

    <div className="left  text-center md:text-left md:pl-10 md:w-1/2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
        Cook Like a Chef,
      </h1>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-roboto text-light-primary font-extrabold leading-tight mt-2">
        Eat Like Royalty
      </h1>
      <p className="text-base sm:text-lg font-medium mt-4 md:mt-6 max-w-xl mx-auto md:mx-0 line-clamp-3">
        Transform your kitchen into a culinary paradise with over 10,000 chef-tested recipes. From 15-minute weeknight miracles to showstopping dinner party masterpieces — your next food adventure starts here.
      </p>
  
      <Link to="/recipe/53010">
        <button className="custom-button text-base font-semibold mt-6 w-full max-w-[250px] md:w-52 mx-auto md:mx-0">
          Discover a recipe
        </button>
      </Link>
    </div>
  </div>
  
  )
}

function InfoSection() {
  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text  px-5 lg:px-10 flex flex-col items-center justify-center font-medium">
      <h1 className="font-black text-4xl mb-5 text-center">
        Everything You Need to Cook Like a Pro
      </h1>
      <p className="text-center text-lg  md:w-1/2">
        Whether you're a beginner or a seasoned chef, our platform provides all
        the tools and inspiration you need to create amazing meals.
      </p>
      <div className="detailsSection  my-20  md:flex justify-center flex-wrap gap-10">
        <InfoDetailsCard
          Icon={IoBookOutline}
          heading="Endless Recipe Collection"
          description="Access thousands of carefully curated recipes from around the world, from comfort food classics to exotic international dishes."
        />
        <InfoDetailsCard
          Icon={CiForkAndKnife}
          heading="Smart Meal Planning"
          description="Plan your weekly meals effortlessly with our intelligent meal planner that considers your dietary preferences and schedule."
        />
        <InfoDetailsCard
          Icon={LuChefHat}
          heading="Step-by-Step Guidance"
          description="Never feel lost in the kitchen again with our detailed cooking instructions, videos, and tips from professional chefs."
        />
      </div>
    </div>
  );
}

function InfoDetailsCard({ Icon, heading, description }) {
  return (
    <div className="aspect-[16/11]   max-w-96 md:flex-1/2 flex-1/3 rounded-2xl shadow-[6px_6px_12px_#c5c5c5]  dark:shadow-[6px_6px_12px_#000]  flex flex-col items-center justify-center text-center space-y-4 py-3 px-5 hover:scale-105 transition duration-300 ease-linear">
      <Icon className="py-4 rounded-full bg-dark-secondary h-15 w-15  text-light-primary " />
      <p className="text-xl font-bold">{heading}</p>
      <p>{description}</p>
    </div>
  );
}

function CategorySection() {
  const { data, error, isLoading } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return (
    <div className="bg-light-background px-5 lg:px-10 dark:bg-dark-background text-light-text dark:text-dark-text py-30 flex flex-col items-center justify-center font-medium">
      <h1 className="font-black text-4xl mb-5 text-center">
        Explore Recipe Categories
      </h1>
      <p className="text-center text-xl font-normal  md:w-3/8">
        From quick weeknight dinners to special occasion treats, find exactly
        what you're craving.
      </p>
      <div className="category-cards-section my-20 flex flex-wrap justify-center gap-5 ">
        {isLoading ? 
          (<div className="min-h-[calc(100dvh-64px-64px)] font-bold text-xl flex items-center justify-center" role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>)
        : error ? 
        (  <div className="min-h-[calc(100dvh-64px-64px)] font-bold text-xl flex items-center justify-start">Error fetching data</div>)
         : 
        (  data?.categories?.map((category,index)=><Link className="custom-flexible-cards"  key={index} to={`/category/${category.strCategory}`}><RecipeCard  image={category.strCategoryThumb} title={category.strCategory} /></Link>))
        }
      </div>
    </div>
  );
}


