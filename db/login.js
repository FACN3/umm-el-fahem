const pl = require("./db_connection");
const bcrypt = require("bcryptjs");
const create_cookie = require("../src/cookies");

const user_validation = (username, password, cb) => {
  pl.query(
    "SELECT * FROM users WHERE user_name = $1", [username],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        if (res.rows.length === 0) {
          console.log("there is no user with this name");
        } else {
          bcrypt.compare(password, res.rows[0].password, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result) {
                //console.log('create cookie', create_cookie(res.rows[0]));
                cb(null, create_cookie(res.rows[0]));
              } else {
                cb(null, 0);
              }
            }
          });
        }

      }
    }
  );
};
module.exports = user_validation;
