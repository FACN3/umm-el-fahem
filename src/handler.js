const fs = require("fs");
const path = require("path");

const handlers = {
  homeHandler: (req, res) => {
    fs.readFile(
      path.join(__dirname, "..", "public/index.html"),
      (err, file) => {
        if (err) {
          res.writeHead(404);
          res.end("file is not found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(file);
      }
    );
  }
};

module.exports = handlers;
