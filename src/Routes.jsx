  import {createBrowserRouter, createRoutesFromElements, Route,} from 'react-router-dom'
  import App from "./App"
  import Home from "./Pages/Home"
  import Random from "./Pages/Random"
  import Favourites from "./Pages/Favourites"
  import Search from "./Pages/Search"
  import Category from "./Pages/Category"
  import SignUp from "./Components/SignUp"
  import Login from "./Components/Login"
  import RecipeDetails from "./Pages/RecipeDetails"
  import {loadCategories} from "./Pages/Category"
import NotFound from './Pages/NotFound'
  const router=createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<App/>}>
        <Route path='' element={<Home/>}/>
        <Route path='random' element={<Random/>}/>
        <Route path='category/:category' element={<Category/>} loader={loadCategories}/>
        <Route path='recipe/:id' element={<RecipeDetails/>}/>
        <Route path='favourites' element={<Favourites/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="login" element={<Login/>}/>
      </Route> 
       <Route path="/*" element={<NotFound/>}/>
    </>
    ))

    export default router;