import React, { useState, useEffect, useRef } from 'react'

import { useGlobalStateContext } from '../context/globalContext'
import { Cursor } from '../styles/gobalStyles'

const CustomCursor = ({ toggleMenu }) => {
  const { cursorType } = useGlobalStateContext()
  const cursor = useRef(null);

  const onMouseMove = event => {
    const { clientX, clientY } = event
    cursor.current.style.left = `${clientX}px`;
    cursor.current.style.top = `${clientY}px`;
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [])
  return (
    <>
      <Cursor
        className={`${!!cursorType ? "hovered" : ""} ${cursorType} ${
          toggleMenu ? "nav-open" : ""
        }`}
        ref = {cursor}
      />
    </>
  )
}

export default CustomCursor