http = require('http');
router = require('./router.js')

const port = 3000;
const server = http.createServer(router);

server.listen(port, () => {
  console.log(`server is listening http://localhost:${port}`);
})
