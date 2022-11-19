const http = require('http');
const fs = require('fs').promises;
const bf = require('buffer');
http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./server002.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	console.log(bf.toString(data));
	res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });

    res.end(err.message);
  }
})
  .listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });