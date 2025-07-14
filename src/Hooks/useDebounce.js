import { useState,useEffect } from "react";

export default function useDebounce(value){
const[debouncedvalue,setDebouncedValue]=useState(value)
useEffect(()=>{
   const timeoutId=setTimeout(() => {
     setDebouncedValue(value)
   }, 300);
   return ()=>clearTimeout(timeoutId)
},[value])
return [debouncedvalue]
}