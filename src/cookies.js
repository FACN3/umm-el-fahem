const cookie_signature = require("cookie-signature");
const jwt=require('jsonwebtoken');
require('env2')('config.env');


const create_cookie = user => {
  let hashedId =  jwt.sign(user.user_id , process.env.SECRET);
  let cookie = {
    id: hashedId,
    name: user.user_name,
    rights: user.rights
  };
  return cookie_signature.sign(JSON.stringify(cookie), process.env.SECRET);

};

module.exports = create_cookie;
