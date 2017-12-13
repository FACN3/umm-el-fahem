const pl = require("./db_connection");

const add_article = (data_input, cb) => {
  pl.query(
    "INSERT INTO posts(user_id, title, content) VALUES ($1, $2, $3)",
    data_input,
    (err, res) => {
      if (err) {
        console.log(err);
      }
      cb();
    }
  );
};

module.exports = add_article;
