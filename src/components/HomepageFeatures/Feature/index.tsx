import { RouteMetadata } from "@site/src/hooks/useEdgeflareConfiguration"
import React, { FC } from "react"
import { ExpandableCode } from "../ExpandableCode"

export const Feature: FC<{
  url: string
  title: string
  docsUrl: string
  selected: boolean
  description: string
  snippet: JSX.Element
  metadata: RouteMetadata
}> = ({
  title,
  url,
  docsUrl,
  snippet,
  description,
  selected,
  metadata,
  ...styles
}) => {
  const [, routeName, color, selectedColor] = metadata

  return (
    <div
      id={routeName}
      className="container"
      style={{
        borderRadius: 8,
        padding: "1rem",
        border: `1px solid ${selected ? color : "#4a4658"}`,
        backgroundColor: selected ? selectedColor : "rgba(20,28,34,.5)",
        ...styles,
      }}
    >
      <div className="row margin-bottom--md">
        <div className="col col--12">
          <h3 style={{ marginBottom: 8 }}>{title}</h3>
        </div>
      </div>

      <ExpandableCode snippet={snippet} />

      <div className="row">
        <div className="col col--12">
          <p style={{ maxWidth: 700 }}>{description}</p>
        </div>
      </div>

      <div className="row">
        <div className="col col--12">
          <a href={url} className="margin-right--sm">
            <button className="button button--primary">Try it</button>
          </a>
          <a href={docsUrl}>
            <button className="button button--outline button--primary">
              Read the docs
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
