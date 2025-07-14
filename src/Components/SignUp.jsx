import { useState, useContext, useEffect } from "react";
import { userContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [gmailError, setGmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isGmailTouched, setIsGmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  let navigate = useNavigate();

  const [newUser, setNewUser] = useState({});

  const { users, setUsers } = useContext(userContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (isUsernameTouched && isGmailTouched && isPasswordTouched) {
      if (!userNameError && !gmailError && !passwordError) {
        setUsers((prev) => [...prev, newUser]);
        setUsername("");
        setGmail("");
        setPassword("");
        setUserNameError("");
        setGmailError("");
        setPasswordError("");
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    setNewUser({
      username: username,
      email: gmail,
      password: password,
      isLoggedIn: false,
      favourites: [],
    });
  }, [username, gmail, password]);

  useEffect(() => {
    if (!isUsernameTouched) return;
    if (username?.length == 0) {
      setUserNameError("*Please enter a username");
    } else if (username?.length > 15) {
      setUserNameError("*username too long");
    } else setUserNameError("");
  }, [username, isUsernameTouched]);
  useEffect(() => {
    if (!isGmailTouched) return;
    if (gmail.length == 0) setGmailError("*please enter your email");
    else if (!gmail.endsWith("@gmail.com"))
      setGmailError("*Incorrect email format");
    else if (users.some((user) => user.email == gmail))
      setGmailError("*email already exists");
    else setGmailError("");
  }, [gmail, isGmailTouched]);

  useEffect(() => {
    if (!isPasswordTouched) return;
    if (password.length < 8) setPasswordError("*pasword too small");
    else if (!/[A-Z]/.test(password))
      setPasswordError("*must contain an uppercase letter");
    else if (!/[a-z]/.test(password))
      setPasswordError("*must contain an lowercase letter");
    else if (!/[0-9]/.test(password)) setPasswordError("*must contain a digit");
    else setPasswordError("");
  }, [password, isPasswordTouched]);

  return (
    <div className="w-screen min-h-[calc(100dvh-64px-64px)]  dark:bg-dark-background flex-col flex items-center justify-center">
      <div className="font-poppins font-medium  text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background rounded p-5  shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000]">
        <h1 className="font-roboto font-bold text-3xl text-center">
          SignUp Form
        </h1>
        <form action="">
          <div className="form w-92">
            <div className=" username mb-5 relative">
              <label htmlFor="signup-username">Username</label>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsUsernameTouched(true);
                }}
                onBlur={() => setIsUsernameTouched(true)}
                id="signup-username"
                type="text"
                placeholder="Enter your name"
                className="p-2  w-full outline-none  focus:border-2 rounded focus:border-light-primary dark:focus:border-dark-primary"
              />
              {!!userNameError && isUsernameTouched && (
                <span className="text-red-700 text-sm absolute -bottom-5 left-0">
                  {userNameError}
                </span>
              )}
            </div>

            <div className="gmail my-5 relative">
              <label htmlFor="signup-gmail">Email</label>
              <input
                value={gmail}
                onChange={(e) => {
                  setGmail(e.target.value);
                  setIsGmailTouched(true);
                }}
                onBlur={() => setIsGmailTouched(true)}
                id="signup-gmail"
                type="email"
                placeholder="Enter your email"
                className="p-2  w-full outline-none  focus:border-2 rounded focus:border-light-primary dark:focus:border-dark-primary"
              />
              {!!gmailError && isGmailTouched && (
                <span className="text-red-700 text-sm absolute -bottom-5 left-0">
                  {gmailError}
                </span>
              )}
            </div>

            <div className="password my-5 relative ">
              <label htmlFor="signup-password">Password</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordTouched(true);
                }}
                onBlur={() => setIsPasswordTouched(true)}
                type="password"
                id="signup-password"
                placeholder="Enter password"
                className="p-2  w-full outline-none  focus:border-2 rounded focus:border-light-primary dark:focus:border-dark-primary"
              />
              {!!passwordError && isPasswordTouched && (
                <span className="text-red-700 text-sm absolute -bottom-5 left-0">
                  {passwordError}
                </span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="submit font-medium font-roboto custom-button w-full my-3  text-dark-text"
            >
              Sign Up
            </button>
            <span className="inline-block w-full font-medium text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-bold">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
