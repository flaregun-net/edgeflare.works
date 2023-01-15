import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { useMemo } from "react"
import {
  bringYourOwnTemplate,
  bypassCode,
  maintenanceMode,
  neverGoDown,
} from "../../routes"
import SyntaxHighlighter from "../components/SyntaxHighlighter"

const getColors = (opacity) => [
  `rgba(26,148,208,${opacity})`,
  `rgba(83,198,56,${opacity})`,
  `rgba(252,213,0,${opacity})`,
  `rgba(239,130,40,${opacity})`,
  `rgba(222,68,57,${opacity})`,
  `rgba(126,67,177,${opacity})`,
]

const colors = getColors(".5")
const selectedColors = getColors(".2")

type LineNumber = number
type RouteName = string
type Color = string

export type RouteMetadata = [LineNumber, RouteName, Color, Color]

const routeMetadata: RouteMetadata[] = [
  [4, "maintenanceMode", colors[0], selectedColors[0]],
  [16, "neverGoDownMode", colors[1], selectedColors[1]],
  [11, "pageOptions", colors[2], selectedColors[2]],
  [8, "bypassCode", colors[3], selectedColors[3]],
]

export const scaffold = `
import edgeflare from "@flaregun-net/edgeflare-for-pages"

const config = {
 maintenanceMode: {
  enablement: {
    enabled: true,
    routes: ["edgeflare.site/blog"],
    bypassCode: "charlie"
  },
  pageOptions: {
    website: {
      url: "https://maintenance-page-bjx.pages.dev",
    },
  },
 },
 neverGoDownMode: {
  enablement: {
    enabled: true
  }
 },
}

export const onRequest: PagesFunction[] = [
  (context) => edgeflare({ config })(context)
]
`

export const useEdgeflareConfiguration = () => {
  const { siteConfig } = useDocusaurusContext()
  const routes = useMemo(() => {
    const hostname = (siteConfig.customFields.HOSTNAME ??
      "edgeflare.site") as string

    return [
      [
        {
          title: "Maintenance mode where you need it",
          url: `https://${hostname}/blog`,
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxying-services",
          description:
            "Display a maintenance page on any part your domain. When its maintenance time, decide between taking part or your whole domain into maintenance mode.",
          metadata: routeMetadata[0],
          snippet: (
            <SyntaxHighlighter
              value={`const config = ${JSON.stringify(
                maintenanceMode(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: "Never go offline again",
          url: `https://${hostname}/broken`,
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxying-websites",
          description:
            "If your servers go offline, Edgeflare keeps you up by displaying your template instead of scary-looking internal error pages.",
          metadata: routeMetadata[1],
          snippet: (
            <SyntaxHighlighter
              value={`const config = ${JSON.stringify(neverGoDown(), null, 2)}`}
            />
          ),
        },
      ],
      [
        {
          title: "Bring your own page or use one of our templates",
          url: `https://${hostname}/maintenance-with-remote-template`,
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxying-services",
          description:
            "Already have downtime pages? Plug them in! Edgeflare works with HTML templates, hosted webpages, and ships with a variety of preconfigured themes.",
          metadata: routeMetadata[2],
          snippet: (
            <SyntaxHighlighter
              value={`const config = ${JSON.stringify(
                bringYourOwnTemplate(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: "Empower your team to work effectively",
          url: `https://${hostname}/blog?EdgeflareBypassCode=${
            bypassCode().maintenanceMode.enablement.bypassCode
          }`,
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxying-websites",
          description:
            "Developers need access to a website to fix it. Configure a bypass code to disable maintenance mode with password and IP address-based allowlists to help your developers get you back online fast.",
          metadata: routeMetadata[3],
          snippet: (
            <SyntaxHighlighter
              value={`const config = ${JSON.stringify(bypassCode(), null, 2)}`}
            />
          ),
        },
      ],
    ]
  }, [])

  return {
    routes,
    scaffold,
    getRouteElement: (lineNumber: number) => {
      const metadata = routeMetadata.find((meta) => meta[0] === lineNumber)

      if (!metadata) return {}

      const element = document.getElementById(metadata[1])
      if (!element) {
        throw new Error(`id not found ${metadata[1]}`)
      }

      return { element, metadata }
    },
  }
}
