import {  useEffect, useState } from "react";


export default function useLocalStorage(key,initialValue){
    const [storedValue,setStoredValue]=useState(()=>{
        const data=localStorage.getItem(key)
        return  data? JSON.parse(data) :initialValue
    });
    useEffect(()=>{
      localStorage.setItem(key,JSON.stringify(storedValue))
    },[key,storedValue])

    return [storedValue,setStoredValue]
}