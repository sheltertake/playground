const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const SystemBellPlugin = require("system-bell-webpack-plugin");
// const NpmInstallPlugin = require("npm-install-webpack-plugin");

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,

      // Poll using interval (in ms, accepts boolean too)
      poll: 1000
    }
  },
  plugins: [
    new SystemBellPlugin(),
    new CaseSensitivePathsPlugin(),
    // Ignore node_modules so CPU usage with poll
    // watching drops significantly.
    new webpack.WatchIgnorePlugin([path.join(__dirname, "../node_modules")])
    // new NpmInstallPlugin({
    //   // Use --save or --save-dev
    //   // dev: false,
    //   // // Install missing peerDependencies
    //   // peerDependencies: true,
    //   // // Reduce amount of console logging
    //   // quiet: false,
    //   // // npm command used inside company, yarn is not supported yet
    //   // npm: "tnpm"
    // })
  ]
});
