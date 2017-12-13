const cookie_signature = require("cookie-signature");
const jwt=require('jsonwebtoken');

const secret = "ummelfahem";

const create_cookie = user => {
  let hashedId =  jwt.sign(user.user_id , secret);
  let cookie = {
    id: hashedId,
    name: user.user_name,
    rights: user.rights
  };
  return cookie_signature.sign(JSON.stringify(cookie), secret);

};

module.exports = create_cookie;
