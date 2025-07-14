import { useCallback, useEffect, useState } from "react"

export default function useFetch(url){
    const[data,setData]=useState({})
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(true)

    const fetchdata=useCallback(async()=>{
          try{
            const response=await fetch(url)
            if(!response.ok) throw new Error("Error Fetching data")
            setData(await response.json())
          }catch(error){
           setError(error)
          }finally{
            setIsLoading(false)
          }
    },[url])
    useEffect(()=>{
         fetchdata()
    },[fetchdata])

    return {data,error,isLoading}
}