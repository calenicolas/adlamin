const fs = require('fs');
const readFile = require("./read_file");

const args = process.argv.slice(2);

const clientIp = args[0];
const clientsFile = args[2];

let clientFileContent = readFile(clientsFile, "[]");

const clients = JSON.parse(clientFileContent);

if (clients.includes(clientIp)) return;

clients.push(clientIp);

fs.writeFileSync(clientsFile, JSON.stringify(clients));