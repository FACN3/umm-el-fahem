const cookie_signature = require("cookie-signature");
require('env2')('config.env');

const qs = require('querystring');

const v_cookie = (cookie, cb) => {
  // console.log('cookie in cookie validation:', qs.parse(cookie));
  var hash = cookie.split('=')[1];
  console.log( 'toHASH: -> ',hash);
  var result=cookie_signature.unsign(hash, process.env.SECRET);
    // console.log(result);
    if (result == false) {
      cb(true);
    } else {
      cb(null, result);
    }

};

module.exports = v_cookie;
