import React, { useRef, useEffect } from 'react'
// Styles
import { Banner, Video, Canvas, BannerTitle, Headline } from '../../styles/homeStyles'
// Custom Hook
import useWindowSize from '../../hooks/useWindowSize'
// Context
import { useGlobalStateContext } from '../../context/globalContext'

const HomeBanner = ({onCursor}) => {
  const size = useWindowSize()
  const { currentTheme } = useGlobalStateContext()
  let canvas = useRef(null)

  useEffect(() => {
    let renderingElement = canvas.current
    // create an offscreen canvas only for the drawings
    let drawingElement = renderingElement.cloneNode()
    let drawingCtx = drawingElement.getContext("2d")
    let renderingCtx = renderingElement.getContext("2d")
    let lastX
    let lastY
    let moving = false

    renderingCtx.globalCompositeOperation = "source-over"
    renderingCtx.fillStyle = currentTheme === "dark" ? "#000000" : "#ffffff"
    renderingCtx.fillRect(0, 0, size.width, size.height)

    renderingElement.addEventListener("mouseover", ev => {
      moving = true
      lastX = ev.pageX - renderingElement.offsetLeft
      lastY = ev.pageY - renderingElement.offsetTop
    })

    renderingElement.addEventListener("click", ev => {
      moving = true
      lastX = ev.pageX - renderingElement.offsetLeft
      lastY = ev.pageY - renderingElement.offsetTop
    })

    renderingElement.addEventListener("mouseup", ev => {
      moving = false
      lastX = ev.pageX - renderingElement.offsetLeft
      lastY = ev.pageY - renderingElement.offsetTop
    })

    renderingElement.addEventListener("mousemove", ev => {
      if (moving) {
        drawingCtx.globalCompositeOperation = "source-over"
        renderingCtx.globalCompositeOperation = "destination-out"
        let currentX = ev.pageX - renderingElement.offsetLeft
        let currentY = ev.pageY - renderingElement.offsetTop
        drawingCtx.lineJoin = "round"
        drawingCtx.moveTo(lastX, lastY)
        drawingCtx.lineTo(currentX, currentY)
        drawingCtx.closePath()
        drawingCtx.lineWidth = 120
        drawingCtx.stroke()
        lastX = currentX
        lastY = currentY
        renderingCtx.drawImage(drawingElement, 0, 0)
      }
    })
  }, [currentTheme])

  const parent = {
    initial: {y: 800},
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.2,
      }
    }
  }

  const child = {
    initial: {y: 800},
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [.6, .05, -.01, .9]
      }
    }
  }

  return (
    <Banner>
      <Video>
        <video 
          src={require('../../assets/video/video.mp4')}
          height="100%"
          width="100%"
          loop
          autoPlay
        ></video>
      </Video>
      <Canvas 
        ref={canvas}
        height={size.height}
        width={size.width}
        onMouseEnter={() => onCursor("hovered")}
        onMouseLeave={onCursor}
      />
      <BannerTitle variants={parent} initial='initial' animate='animate'>
        <Headline variants={child}>DIG</Headline>
        <Headline variants={child}>DEEP</Headline>  
      </BannerTitle>
    </Banner>
  )
}

export default HomeBanner;