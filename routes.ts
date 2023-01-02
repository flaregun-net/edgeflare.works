export const maintenanceMode = (host: string) => ({
  maintenanceMode: {
    enablement: {
      enabled: true,
      routes: [`${host}/blog`],
    },
    pageOptions: {
      template: {
        name: "surreal",
        options: {
          heading:
            "Our blog is down until an update is finished installing. Hang tight!",
        },
      },
    },
  },
})

export const neverGoDown = () => ({
  neverGoDownMode: {
    enablement: { enabled: true },
    pageOptions: {
      template: {
        name: "modern",
      },
    },
  },
})

export const bringYourOwnTemplate = (host: string) => ({
  maintenanceMode: {
    enablement: { enabled: true },
    pageOptions: {
      // here, we can provide a built-in theme, html markup or a remote webpage
      // template: { ... },
      // html: "<p>I'll be back</p>",
      website: {
        url: "https://maintenance-page-bjx.pages.dev/",
        resources: [`${host}/assets/*`, `${host}/img/*`],
      },
    },
  },
})

export const bypassCode = () => ({
  maintenanceMode: {
    enablement: {
      enabled: true,
      bypassCode: "charlie",
    },
  },
})
