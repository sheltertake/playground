npm install connect serve-static --save-dev
npm install browserify --save-dev
{
"name": "browserify-test",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"serve": "node server.js",
"build": "browserify client/app.js -o client/dist/amdmodule.js"
},
"author": "",
"license": "ISC",
"dependencies": {},
"devDependencies": {
"browserify": "^16.1.1",
"connect": "^3.6.6",
"serve-static": "^1.13.2"
}
}
