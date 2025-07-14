import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import SearchBar from "./SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { userContext,currentUserContext } from "../../Context/UserContext";
export default function Navbar() {
  return (
    <div className=" bg-dark-primary dark:bg-dark-background dark:text-dark-text text-light-text h-16 flex items-center justify-between  px-5 lg:px-10 ">
      <div className="topleft flex  items-center gap-10">
        <span className="logo text-2xl font-black">
          Flavor<span className="dark:text-light-primary">Craft</span>
        </span>
        <ul className="links  font-medium text-lg hidden lg:flex items-center gap-2.5">
          <li>
            <NavLink to="/" className={({isActive})=>`hover:dark:text-dark-primary hover:text-white ${isActive?"dark:text-dark-primary text-white":""}`}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/random" className={({isActive})=>`hover:dark:text-dark-primary hover:text-white ${isActive?"dark:text-dark-primary text-white":""}`}>Random</NavLink>
          </li>
          <li>
            <NavLink to="/favourites" className={({isActive})=>`hover:dark:text-dark-primary hover:text-white ${isActive?"dark:text-dark-primary text-white":""}`}>Favourites</NavLink>
          </li>
        </ul>
      </div>
      <div className="top-right-desktop  hidden lg:flex items-center gap-2">
        <SearchBar className="hidden md:inline-block" />
        <ThemeButton />
        <UserProfile/>
      </div>
      <MobileMenu />
    </div>
  );
}

function MobileMenu() {
  const location=useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  useEffect(()=>{
    setIsSearchBarVisible(false)
      },[location.key])
  return (
    <div className="top-right-mobile flex items-center gap-2.5 lg:hidden relative z-10 ">
      <FaSearch
        className="text-xl font-extrabold rounded-full hover:bg-dark-secondary"
        onClick={() => setIsSearchBarVisible((prev) => !prev)}
      />
      <RxHamburgerMenu
        className="text-2xl font-extrabold"
        onClick={() => setIsMenuOpen(true)}
      />
      <div
        className={`mobile-searchbar flex   items-center absolute -bottom-11 -right-5 ${
          isSearchBarVisible ? "" : "hidden"
        }`}
      >
        <SearchBar/>
        <RxCross2 className="h-10 w-10 p-2 hover:bg-dark-primary" onClick={()=>setIsSearchBarVisible(false)}/>
      </div>

      <div
        className={`mobile-links  absolute -top-5 -right-5 bg-light-background dark:bg-dark-primary min-h-dvh w-screen max-w-[500px] ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ImCross
          className="text-2xl font-normal text-dark absolute top-3 left-3"
          onClick={() => setIsMenuOpen(false)}
        />
          <div className="absolute top-0 right-0"><UserProfile/></div>

        <div className="mobile-menu-content  px-3 pt-15">
          <span className="logo text-2xl font-black dark:text-dark-text text-light-text">
            FlavorCraft
          </span>
          <ul className="links  font-medium text-xl space-y-3 my-3">
            <li>
              <NavLink to="/" className={({isActive})=>`hover:text-dark-primary ${isActive?"text-dark-primary":""}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/random" className={({isActive})=>`hover:text-dark-primary ${isActive?"text-dark-primary":""}`}>Random</NavLink>
            </li>
            <li>
              <NavLink to="/favourites" className={({isActive})=>`hover:text-dark-primary ${isActive?"text-dark-primary":""}`}>Favourites</NavLink>
            </li>
          </ul>
          <ThemeButton />
        </div>
      </div>
    </div>
  );
}


function UserProfile(){
  const { setUsers }=useContext(userContext)
  const { currentUser,setCurrentUser } = useContext(currentUserContext);
   const[isLogoutHidden,setIsLogoutHidden]=useState(true)
   function handleLogout(){
      setUsers(prev=>(prev.map(user=>user.email==currentUser.email?{...user,isLoggedIn:false}:user)))
      setCurrentUser(null)
   }
  return <>
  {currentUser ? (
          <button onClick={()=>setIsLogoutHidden(prev=>!prev)} className="text-xl h-8 w-8  relative m-3 xl:m-0 text-center inline-block font-medium rounded-full bg-dark-secondary xl:dark:bg-dark-primary">
            {currentUser.username.slice(0, 1)}

            <span onClick={handleLogout} className={`absolute text-base top-10 -left-10 whitespace-nowrap rounded bg-light-primary py-1 px-2 ${isLogoutHidden && "hidden"}`} >Log Out</span>
          </button>
        ) : (
          <Link to="/login"><FaRegUserCircle className="text-2xl m-3 " /></Link>
        )}
  </>
}
