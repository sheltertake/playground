const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  context: resolve(__dirname, "src"),
  entry: {
    app: "./index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist")
  },
  devServer: {
    hot: true,
    inline: true,
    publicPath: "/",
    historyApiFallback: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: "index.html"
    })
  ]
};
