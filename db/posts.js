const pl = require('./db_connection');

const posts = (cb)=>{
  pl.query('SELECT * FROM posts', (err, post) => {
    if(err) {
      cb(err);
    }
    else {
      console.log('post.rows:', post.rows);
      cb(null, post.rows);
    }
  });
}

module.exports = posts;
