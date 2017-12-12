const pl = require('./db_connection');
const hashPassword = require('../src/encryption');

const add_user = data_input => {
  let { user_name, password, email, date_of_birth } = data_input;
  pl.query(
    'INSERT INTO users(user_name, password, email, dob) VALUES ($1, $2, $3, $4);',
    [user_name, password, email, date_of_birth],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  );
};

module.exports = add_user;
