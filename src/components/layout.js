import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'styled-normalize'
// Components
import Header from './header'
import CustomCursor from './customCursor'
import Navigation from './navigation'
import Footer from "./footer"
// Context
import { useGlobalStateContext, useGlobalDispatchContext } from  '../context/globalContext'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    text-decoration: none;
    cursor: none;
  }
  html {
    box-sizing: border-box;
    --webkit-font-smooting: antialiased;
    font-size: 16px;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props =>  props.theme.background};
    color: ${props =>  props.theme.text};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [ toggleMenu, setToggleMenu ] = useState(false)
  const [hamburgerPosition, setHamburgerPosition] = useState({
    x: 0,
    y: 0,
  })
  
  const darkTheme = {
    background: '#000',
    text: '#fff',
    red: '#ea291e',
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  }
  const lightTheme = {
    background: '#fff',
    text: '#000',
    red: '#ea291e',
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  }
  
  const { currentTheme, cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext(); 

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({type: 'CURSOR_TYPE', cursorType: cursorType})
  }
  
  return (
    <ThemeProvider 
      theme={
        currentTheme === 'dark' ? darkTheme : lightTheme
      }
    >
      <GlobalStyle />
      <CustomCursor toggleMenu={toggleMenu} />
      <Header 
        onCursor={onCursor} 
        toggleMenu={toggleMenu} 
        setToggleMenu={setToggleMenu}
        hamburgerPosition={hamburgerPosition}
        setHamburgerPosition={setHamburgerPosition}
        siteTitle={data.site.siteMetadata.title}
      />
      <Navigation
        onCursor={onCursor}
        toggleMenu={toggleMenu} 
        setToggleMenu={setToggleMenu}
      />
      <main>{children}</main>
      <Footer onCursor={onCursor}/>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
