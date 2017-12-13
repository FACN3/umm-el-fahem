const { sign, verify } = require("jsonwebtoken");

const secret = "ummelfahem";

const create_cookie = user => {
  let cookie = {
    id: user.user_id,
    rights: user.rights
  };
  return sign(cookie, secret);

};

module.exports = create_cookie;
