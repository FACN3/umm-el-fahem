const { sign, verify } = require("jsonwebtoken");
const secret = "ummelfahem";
const qs = require('querystring');

const v_cookie = (cookie, cb) => {
  console.log('cookie in cookie validation:', qs.parse(cookie));
  var hash = qs.parse(cookie).user;
  verify(hash, secret, (err, unhashed_cookie) => {
    if (err) {
      cb(err);
    } else {
      cb(null, unhashed_cookie);
    }
  });
};

module.exports = v_cookie;
