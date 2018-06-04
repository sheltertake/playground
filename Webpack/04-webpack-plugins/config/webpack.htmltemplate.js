const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo",
      // Required
      inject: false,
      template: require("html-webpack-template"),

      // Optional
      appMountId: "app",
      appMountHtmlSnippet:
        '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i></div>',
      headHtmlSnippet:
        "<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style >",
      bodyHtmlSnippet: "<custom-element></custom-element>",
      //   baseHref: "http://example.com/awesome",
      //   devServer: "http://localhost:3001",
      //   googleAnalytics: {
      //     trackingId: "UA-XXXX-XX",
      //     pageViewOnLoad: true
      //   },
      meta: [
        {
          name: "description",
          content: "A better default template for html-webpack-plugin."
        }
      ],
      mobile: true,
      lang: "en-US",
      links: [
        "https://fonts.googleapis.com/css?family=Roboto",
        {
          href: "/apple-touch-icon.png",
          rel: "apple-touch-icon",
          sizes: "180x180"
        },
        {
          href: "/favicon-32x32.png",
          rel: "icon",
          sizes: "32x32",
          type: "image/png"
        }
      ],
      inlineManifestWebpackName: "webpackManifest",
      scripts: [
        "http://example.com/somescript.js",
        {
          src: "/myModule.js",
          type: "module"
        }
      ],
      title: "My App",
      window: {
        env: {
          apiHost: "http://myapi.com/api/v1"
        }
      }
    })
  ]
};
