const fs = require('fs');
const handlers = require('./handler.js');

homepages = ['/', '/public/style.css', '/public/index.js', '/signup'];

const router = (req, res) => {
  console.log(req.url);
  let url = req.url;
  if (homepages.includes(url)) {
    handlers.homeHandler(req, res);
  } else if (url === '/login') {
    handlers.handlerLogin(req, res);
  } else if (url === '/add_user') {
    handlers.handlerAddUser(req, res);
  } else if (url === '/add_article') {
    handlers.handlerAddArticle(req,res);
  } else if(url === '/posts'){
    handlers.handlerPosts(req, res);
  }
  else{
    handlers.notFoundHandler(req, res);
  }
};

module.exports = router;
