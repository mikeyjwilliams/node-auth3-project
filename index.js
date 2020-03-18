/** @format */

const server = require('./sever');
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n *** http://localhost:${port} *** \n`);
});
