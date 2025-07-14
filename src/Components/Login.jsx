import { useContext, useEffect, useState } from "react";
import { currentUserContext, userContext } from "../Context/UserContext";
import {Link, useNavigate} from "react-router-dom"

export default function Login(){
    const {users,setUsers}=useContext(userContext)
    const{setCurrentUser}=useContext(currentUserContext)
    const [gmail,setGmail]=useState("")
    const [isGmailTouched,setIsGmailTouched]=useState(false)
    const [gmailError,setGmailError]=useState("")
    const [password,setPassword]=useState("")
    const [isPasswordTouched,setIsPasswordTouched]=useState(false)
    const [passwordError,setPasswordError]=useState("")
    const [isChecked,setIsChecked]=useState(true)
    const navigate =useNavigate()

    useEffect(()=>{
     if(!isGmailTouched) return;
     if(gmail.trim().length==0) setGmailError("*please enter your email")
      else if(!users.some(user=>user.email==gmail)) setGmailError("*email do not exist")
        else setGmailError("")
    },[gmail,isGmailTouched])

    useEffect(()=>{
      if(users.length>0){
        setCurrentUser(users.find(user=>user.isLoggedIn) || null)
      }
    },[users])

    useEffect(()=>{
     if(!isPasswordTouched) return;
     if(password.trim().length==0) setPasswordError("*please enter your password")
     else if(users.some(user=>user.email==gmail && (user.password !=password))) setPasswordError("password didnt matched")
        else setPasswordError("")
    },[password,isPasswordTouched])

    function handleLogin(e){
        e.preventDefault()
        if(isGmailTouched && isPasswordTouched){
            if(!gmailError && !passwordError){
                if(isChecked){
                    setUsers(prev=>prev.map(user=> user.email==gmail?{...user,isLoggedIn:true}:{...user,isLoggedIn:false}))
                }
                setGmail("")
                setPassword("")
                navigate("/")
            }
        }
    }

    return <div className="w-screen min-h-[calc(100dvh-64px-64px)]  flex-col flex items-center justify-center">
       <div className="font-poppins font-medium  text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background rounded p-5  shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000]"> 
        <h1 className="font-roboto  font-bold text-3xl text-center">
        Login Form
      </h1>
      <form action="">
      <div className="form w-92 ">
      <div className="gmail my-5 relative">
            <label htmlFor="gmail">Email</label>
            <input
              value={gmail}
              onChange={e=>{
                setGmail(e.target.value)
                setIsGmailTouched(true)
              }}
              onBlur={() => setIsGmailTouched(true)}
              id="gmail"
              type="email"
              placeholder="Enter your email"
              className="p-2   text-light-text dark:text-dark-text w-full outline-none  focus:border-2 rounded focus:border-light-primary dark:focus:border-dark-primary"  
            />
            {!!gmailError && isGmailTouched && (
              <span className="text-red-700 text-sm absolute -bottom-5 left-0">
                {gmailError}
              </span>
            )}
          </div>
          <div className="password my-5 relative ">
            <label htmlFor="password">Password</label>
            <input
              value={password}
               onChange={e=>{
                setPassword(e.target.value)
                setIsPasswordTouched(true)
               }}
              onBlur={() => setIsPasswordTouched(true)}
              type="password"
              id="password"
              placeholder="Enter password"
              className="p-2  w-full outline-none  focus:border-2 rounded focus:border-light-primary dark:focus:border-dark-primary" 
            />
            {!!passwordError && isPasswordTouched && (
              <span className="text-red-700 text-sm absolute -bottom-5 left-0">
                {passwordError}
              </span>
            )}
          </div>

          <div className="checkbox text-lg"> 
            <input type="checkbox"  id="remember-me" className="mx-2" checked={isChecked} onChange={()=>setIsChecked(prev=>!prev)} />
          <label htmlFor="remember-me">Remember me</label>
          </div>

          <button onClick={handleLogin}  className="submit text-dark-text font-roboto font-semibold custom-button w-full my-3 " >Login</button>
          <span className="inline-block w-full font-medium text-center">Don't have an account? <Link to="/signup" className="font-bold">SignUp</Link></span>
      </div>
      </form></div>
    </div>
}