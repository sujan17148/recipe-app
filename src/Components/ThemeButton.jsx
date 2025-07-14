import { useContext, useEffect } from "react"
import { themeContext } from "../Context/ThemeContext"
import { LuSun } from "react-icons/lu"; 
import { IoMoonSharp } from "react-icons/io5";

export default function ThemeButton(){
    const {theme,setTheme}=useContext(themeContext)
    function handleThemeChange(){
        setTheme(prev => (prev === "light" ? "dark" : "light"));      
    }
    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
      }, [theme]);
      

return <button onClick={handleThemeChange} className="theme-button text-xl p-2 hover:bg-dark-primary rounded-full  font-medium font-roboto ">{theme=="dark"?<IoMoonSharp className="-rotate-z-90"/>:<LuSun/>}</button>

}
