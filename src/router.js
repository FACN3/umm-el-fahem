const fs = require('fs');
const handlers = require('./handler.js')

const router = (req, res) => {
  let url = req.url;
  if(url === '/') {
    handlers.homeHandler(req, res);
  }
}



module.exports = router;
