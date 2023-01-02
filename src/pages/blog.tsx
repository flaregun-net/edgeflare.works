import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import React from "react"

export default function Blog() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <h2 style={{ textAlign: "center" }}>⚡ Blog</h2>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
