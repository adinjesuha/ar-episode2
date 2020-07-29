import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
// Context
import { useGlobalStateContext, useGlobalDispatchContext } from  '../context/globalContext'
// Home Content
import HomeBanner from "../components/homePage/homeBanner"
import HomeContent from "../components/homePage/homeContent"
import HomeFeatured from "../components/homePage/homeFeatured"

const IndexPage = () => {
  const { cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext(); 

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({type: 'CURSOR_TYPE', cursorType: cursorType})
  }

  return (
    <Layout>
      <SEO title="Home" />
      <HomeBanner onCursor={onCursor}/>
      <HomeContent />
      <HomeFeatured onCursor={onCursor}/>
    </Layout>
  )
}


export default IndexPage
