import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import HomeBanner from "../components/homePage/homeBanner"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <HomeBanner />
  </Layout>
)

export default IndexPage
