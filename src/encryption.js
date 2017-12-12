const bcrypt = require('bcryptjs');
const add_user = require('../db/add_user');

const hashPassword = data => {
  console.log('data before hash', data);
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
    } else {
      bcrypt.hash(data.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        } else {
          data.password = hash;
          console.log('data after encryption', data);
          add_user(data);
        }
      });
    }
  });
};

module.exports = hashPassword;
