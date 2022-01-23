export default {
  title: "project template",
  head: {
    titleTemplate: "%s [EN]",
    meta: [
      {
        name: "description",
        content: "project starter-kit.",
      },
      {
        property: "og:site_name",
        content: "project starter-kit",
      },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "project frontend starter-kit" },
      {
        property: "og:description",
        content: "All the modern best practices in one template.",
      },
      { property: "og:card", content: "summary" },
      { property: "og:site", content: "@hellenic" },
      { property: "og:creator", content: "@hellenic" },
      { property: "og:image:width", content: "200" },
      { property: "og:image:height", content: "200" },
    ],
    link: [
      { rel: "manifest", href: "/manifest.en.json" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
  },
};
