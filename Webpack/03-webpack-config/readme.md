https://survivejs.com/webpack/developing/composing-configuration/

npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin

npm install -D webpack-merge

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"webpack-dev-server --env development --config .\\config\\webpack.config.js",
    "build": "webpack --env development --config .\\config\\webpack.config.js",
    "watch":"webpack --env development --watch --config .\\config\\webpack.config.js"
},
```

npm run watch
npm start
