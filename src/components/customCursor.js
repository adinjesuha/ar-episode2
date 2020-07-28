import React, { useState, useEffect } from 'react'

import { Cursor } from '../styles/gobalStyles'
import { useGlobalStateContext } from '../context/globalContext'

const CustomCursor = ({toggleMenu}) => {
  // State
  const { cursorType } = useGlobalStateContext();
  const [ mousePosition, setMousePosition ] = useState({
    x: 400,
    y: 400,
  })
  // Handle Mouse event
  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({x, y});
  }
  // Add event
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <Cursor 
      className={`
        ${!!cursorType ? 'hovered' : ''} 
        ${cursorType} 
        ${toggleMenu ? 'nav-open' : ''}
      `}
      style={{
        left: `${mousePosition.x}px`,
        top:`${mousePosition.y}px`,
      }}
    />
  )
}

export default CustomCursor;