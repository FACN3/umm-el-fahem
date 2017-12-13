const pl = require('./db_connection');
const bcrypt = require('bcryptjs');


const user_validation = (username, password) => {
  pl.query('SELECT * FROM users WHERE user_name = $1', [username], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      if (res.rows.length === 0) {
        console.log('there is no user with this name');
      }
      console.log(res.rows[0].password);
      bcrypt.compare(password, res.rows[0].password, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
    }
  });
}
module.exports = user_validation;
