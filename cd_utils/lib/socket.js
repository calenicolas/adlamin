const net = require('net');
const fs = require('fs');
const runCommand = require('./run_command');
const path = "/tmp/adlamin.sock";

function deleteSocket(path) {
    try {
        fs.unlinkSync(path);
    } catch (error) { }
}

deleteSocket(path);

const server = net.createServer((client) => {
  client.on('data', (message) => {
    const { action, data } = JSON.parse(message.toString());
    console.log("adlamin", action, data);
    runCommand("/usr/local/sbin/adlamin", ["--action=" + action, "--data=" + data], () => {})
  });
});

server.listen(path, () => {
  fs.chmodSync(path, 0o777);
});

process.on('SIGINT', () => {
  server.close(() => {
    deleteSocket(path);
    process.exit(0);
  });
});