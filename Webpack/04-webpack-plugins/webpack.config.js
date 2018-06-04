const merge = require("webpack-merge");
const cfgCommon = require("./config/webpack.common.js");
const cfgDevelopment = require("./config/webpack.development.js");
const cfgTemplate = require("./config/webpack.htmltemplate.js");

module.exports = mode => {
  if (mode === "production") {
    return merge(cfgCommon, cfgTemplate, { mode });
  }

  return merge(
    cfgDevelopment.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: "8080" //process.env.PORT
    }),
    // cfgNpmAutoInstall,
    cfgCommon,
    cfgTemplate,
    { mode }
  );
};
