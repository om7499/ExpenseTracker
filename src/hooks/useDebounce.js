import React from 'react'
import { useState,useRef,useEffect } from 'react'

const useDebounce = (value,delay=300) => {
    const [debounce,setDebounce]=useState(value)
    const timer = useRef(null);

    useEffect(()=>{
        clearTimeout(timer.current)

        timer.current = setTimeout(()=>{
            setDebounce(value)
        },delay)
       
        return()=>clearTimeout(timer.current)
    },[value,delay])

    
  return debounce
}

export default useDebounce
