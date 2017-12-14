const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const add_article = require("../db/add_article");
const hashPassword = require("./encryption");
const userValidation = require("../db/login");
const cookie_validation = require("./jwt_validation");
const posts = require("../db/posts");
const jwt = require('jsonwebtoken');
const secret = "ummelfahem";

const headers = {
  html: {
    "Content-Type": "text/html"
  },
  js: {
    "Content-Type": "application/javascript"
  },
  css: {
    "Content-Type": "text/css"
  }
};

const handlers = {
  homeHandler: (req, res) => {
    let url = req.url;
    if (url == "/signup") {
      url = "/public/signup.html";
    }
    const filePath =
      url === "/"
        ? path.join(__dirname, "..", "public/index.html")
        : path.join(__dirname, "..", url);

    // console.log('filePath', filePath);
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(404);
        res.end("file is not found");
      } else {
        // console.log('path parse:', path.parse(url));
        let extension = url === "/" ? "html" : path.parse(url)["ext"];

        // if (url === '/') {let extension = 'html'}
        // else {let extension = path.parse(url)['ext'] }

        res.writeHead(200, headers[extension]);
        res.end(file);
      }
    });
  },
  notFoundHandler: (req, res) => {
    res.writeHead(404, {
      "Content-Type": "text/html"
    });
    res.end("<h1>NOT FOUND</h1>");
  },

  handlerLogin: (req, res) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => {
      let user = qs.parse(data);
      userValidation(user.user_name, user.password, (err, jwt) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("database error");
        } else if (jwt === 0) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("user does not exist");
        } else {
          console.log("THIS IS THE COOKiE: ", jwt);
          res.writeHead(302, {
            "Set-Cookie": `user=${jwt}; Max-Age=9000`,
            Location: "/"
          });
          res.end();
        }
      });
    });
  },
  handlerAddUser: (req, res) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => {
      let data_input = qs.parse(data);
      hashPassword(data_input);
    });
    res.writeHead(302, {
      Location: "/"
    });
    res.end();
  },
  handlerAddArticle: (req, res) => {
    cookie_validation(req.headers.cookie, (err, unhashed_cookie) => {
      console.log("req method:", req.method);
      if (err) {
        console.log("unhashing error", err);
        res.writeHead(401, { "Content-Type": "text/html" });
        res.end("<h1>You need to log in</h1>");
      } else if (req.method === "POST") {
        let data = "";
        req.on("data", chunk => {
          data += chunk;
        });
        req.on("end", () => {
          let data_obj = qs.parse(data);
          let userId = jwt.verify(JSON.parse(unhashed_cookie).id,secret);
          let article_data = [
            userId,
            data_obj.title,
            data_obj.content
          ];
          add_article(article_data, () => {
            res.writeHead(302, { Location: "/" });
            res.end();
          });
        });
      } else {
        res.writeHead(302, { Location: "/" });
        res.end();
      }
    });
  },
  handlerPosts: (req, res) => {
    posts((err, post) => {
      if (err) {
        console.log(err);
        res.end();
      }
      else {
      res.writeHead(200, { 'Content-Type': "application/json" });
      res.end(JSON.stringify(post));
    }
    });
  }
};

module.exports = handlers;
