"use strict";
const express = require("express"),
      bodyParser = require("body-parser"),
      routes = require("./app/routes/api"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      session = require("express-session"),
      cors = require("cors"),
      proxy = require("http-proxy-middleware"),
      path = require("path"),
      app = express();

const webpackDevServer = require("./node_modules/webpack-dev-server/lib/Server"),
      webpackConfig = require("./webpack.config"),
      webpack = require("webpack"),
      compiler = webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
});

const wpServer = new webpackDevServer(compiler, devServerOptions);

require("dotenv").config();
require("./app/config/passport")(passport);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

app.use(
  "/api",
  proxy({
    target: "localhost",
    port: 3000
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "lockerOfRecipes",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    }
  })
);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

const client = process.env.PORT,
  server = 8080;

app.listen(client, function() {
  console.log("Node.js listening on port " + client + "...");
});

wpServer.listen(server, "127.0.0.1", () => {
  console.log("Webpack Dev Server listening on " + server + "...");
});
