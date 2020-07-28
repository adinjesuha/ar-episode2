import { useState, useEffect } from 'react'

export default function useWindowSize(){
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
   // State
   const [ windowSize, setWindowSize ] = useState(getSize);
   // Handle resize
   useEffect(() => {
     function handleResize() {
       setWindowSize(getSize())
     }
     
     window.addEventListener('resize', handleResize)
 
     return() => window.removeEventListener('resize', handleResize)
   }, [])
   return windowSize
}

