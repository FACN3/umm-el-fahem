const fs = require('fs');
const handlers = require('./handler.js')

homepages = ["/", "/public/style.css", "/public/index.js"];

const router = (req, res) => {
  console.log(req.url);
  let url = req.url;
  if (homepages.includes(url)) {
    handlers.homeHandler(req, res);
  }else{
    handlers.notFoundHandler(req,res);
  }

}



module.exports = router;
