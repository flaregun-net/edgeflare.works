import { demoConfig } from "@flaregun-net/edgeflare-core/build/devConfig"
import edgeflare from "@flaregun-net/edgeflare-for-pages"

// This function runs on every request to edgeflare.site and edgeflare.xyz
// If we're on edgeflare.site, the edgeflare-for-pages plugin is injected
// If we're on edgeflare.xyz, we do nothing because edgeflare is mounted via the edgeflare-dev worker
export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  (context) =>
    context.env.HOSTNAME === "edgeflare.site"
      ? edgeflare({ config: demoConfig(context.env.HOSTNAME) })(context)
      : context.next(),
  ,
]
