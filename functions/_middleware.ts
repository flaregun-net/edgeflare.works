import edgeflare from "@flaregun-net/edgeflare-for-pages"

// This function runs on every request to edgeflare.site and edgeflare.xyz
// If we're on edgeflare.site, the edgeflare-for-pages plugin is injected
// If we're on edgeflare.xyz, we do nothing because edgeflare is mounted via the edgeflare-dev worker
export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  (context) =>
    context.env.HOSTNAME === "edgeflare.site"
      ? edgeflare({
          config: {
            global: { debug: true },
            maintenanceMode: {
              enablement: {
                enabled: true,
                routes: [`${context.env.HOSTNAME}/some-page`],
                bypassCode: "charlie",
              },
              pageOptions: {
                website: {
                  url: "https://maintenance-page-bjx.pages.dev",
                  mode: "spa" as const,
                  resources: [
                    `${context.env.HOSTNAME}/assets/*`,
                    `${context.env.HOSTNAME}/img/*`,
                    `${context.env.HOSTNAME}/manifest.json`,
                  ],
                },
              },
            },
            neverGoDownMode: {
              enablement: {
                enabled: true,
              },
            },
          },
        })(context)
      : context.next(),
  ,
]
