import React, { useRef, useEffect } from 'react'
// Styles
import { Banner, Video, Canvas, BannerTitle, Headline } from '../../styles/homeStyles'
// Custom Hook
import useWindowSize from '../hooks/useWindowSize'
// Context
import { useGlobalStateContext } from '../../context/globalContext'

const HomeBanner = () => {
  let canvas = useRef(null)
  const size = useWindowSize()
  const { currentTheme } = useGlobalStateContext()
  useEffect(() => {
    let renderingElement = canvas.current
    let drawingElement = renderingElement.cloneNode()

    let renderingCtx = renderingElement.getContext('2d')
    let drawingCtx = drawingElement.getContext('2d')

    let lastX
    let lastY

    let moving = false

    renderingCtx.globalCompositeOperation = 'source-over'
    renderingCtx.fillStyle = currentTheme === 'dark' ? '#000000' : '#fff'
    renderingCtx.fillRect(0, 0, size.width, size.height)

  }, [currentTheme])
  return (
    <Banner>
      <Video>
        <video 
          src={require('../../assets/video/video.mp4')}
          height={size.height}
          width={size.width}
          loop
          autoPlay
        ></video>
      </Video>
      <Canvas ref={canvas}/>
      <BannerTitle>
        <Headline>DIG</Headline>
        <Headline>DEEP</Headline> 
      </BannerTitle>
    </Banner>
  )
}

export default HomeBanner;