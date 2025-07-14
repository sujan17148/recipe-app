import { userContext, currentUserContext } from "./Context/UserContext";
import { themeContext } from "./Context/ThemeContext.js";
import useLocalStorage from "./Hooks/useLocalStorage";
import Header from "./Components/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
function App() {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <userContext.Provider value={{ users, setUsers }}>
        <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Header/>
          <Outlet/>
          <Footer/>
        </currentUserContext.Provider>
      </userContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
