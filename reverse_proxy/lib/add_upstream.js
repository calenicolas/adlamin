const fs = require('fs');
const readFile = require("./read_file");

const args = process.argv.slice(2);

const containerIp = args[0];
const servicePort = args[1];
const upstreamsFile = args[2];

let upstreamFileContent = readFile(upstreamsFile, "[]");

const upstreams = JSON.parse(upstreamFileContent);

const upstream = containerIp + ":" + servicePort;

if (upstreams.includes(upstream)) return;

upstreams.push(upstream);

fs.writeFileSync(upstreamsFile, JSON.stringify(upstreams));