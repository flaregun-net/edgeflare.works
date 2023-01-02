import {
  RouteMetadata,
  useEdgeflareConfiguration,
} from "@site/src/hooks/useEdgeflareConfiguration"
import React, { FC } from "react"
import { Feature } from "./Feature"

export const HomepageFeatures: FC<{
  selectedLineNumber?: RouteMetadata[0]
}> = ({ selectedLineNumber }) => {
  const { routes } = useEdgeflareConfiguration()

  return (
    <section style={{ display: "flex", alignItems: "center" }}>
      <div className="container">
        {routes.map((featureListRow, i) => (
          <div key={i} className="row">
            {featureListRow.map((featureProps, idx) => (
              <div key={idx} className="col col--6 padding-vert--md">
                <Feature
                  {...featureProps}
                  selected={selectedLineNumber === featureProps.metadata[0]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
