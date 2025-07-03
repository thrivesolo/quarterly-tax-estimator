const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body>
        <h1>Test Server Working</h1>
        <p>This is a simple test server running on Node.js</p>
        <p>Time: ${new Date().toISOString()}</p>
      </body>
    </html>
  `);
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});