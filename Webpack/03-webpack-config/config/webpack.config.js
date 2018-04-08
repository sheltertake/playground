const webpack = require("webpack");
const merge = require("webpack-merge");

const configDevServer = require("./webpack.devserver");
const configHtml = require("./webpack.html");
const configCommon = require("./webpack.common");

const developmentConfig = merge([
  configDevServer.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  })
]);

const productionConfig = merge([]);

module.exports = mode => {
  if (mode === "production") {
    return merge(productionConfig, configHtml, configCommon, { mode });
  }

  return merge(developmentConfig, configHtml, configCommon, { mode });
};
