https://survivejs.com/webpack/developing/webpack-dev-server/

npm install webpackwebpack-cli html-webpack-plugin --save-dev

webpack-cli init

package.json
"build": "webpack --mode development",
"watch": "webpack --mode development --watch"

npm run build
npm run watch (lancia la build ad ogni change)

cd dist && serve (richiede refresh)

npm install webpack-dev-server --save-dev
"start": "webpack-dev-server --mode development",

npm install webpack-dev-server --save-dev

npm start
