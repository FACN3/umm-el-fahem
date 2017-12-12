const fs = require("fs");
const path = require("path");

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
}

const handlers = {
  homeHandler: (req, res) => {

    let url = req.url;
    if (url == '/signup') {
      url = '/public/signup.html';
    }
    const filePath = url === '/' ?
      path.join(__dirname, "..", "public/index.html") :
      path.join(__dirname, "..", url);

    // console.log('filePath', filePath);
    fs.readFile(filePath,
      (err, file) => {
        if (err) {
          res.writeHead(404);
          res.end("file is not found");
        } else {
          // console.log('path parse:', path.parse(url));
          let extension = url === '/' ? 'html' : path.parse(url)['ext'];

          // if (url === '/') {let extension = 'html'}
          // else {let extension = path.parse(url)['ext'] }

          res.writeHead(200, headers[extension]);
          res.end(file);
        }
      }
    );
  },
  notFoundHandler: (req, res) => {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end('<h1>NOT FOUND</h1>');
  },

  handlerLogin: (req, res) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => {
      console.log(data);
    });
    //to stay on the homepage after pressing login
    //use status code 302 and header Location
    res.writeHead(302, {
      Location: '/'
    });
    res.end()
  }
};

module.exports = handlers;
