const net = require('net');
const fs = require('fs');
const runCommand = require('./run_command');
const path = "/tmp/adlamin.sock";

fs.unlinkSync(path);

const server = net.createServer((client) => {
  client.on('data', (message) => {
    const { action, data } = JSON.parse(message);
    runCommand("/usr/local/sbin/adlamin", ["--action=" + action, "--data=" + data], () => {})
  });
});

server.listen(path);

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});