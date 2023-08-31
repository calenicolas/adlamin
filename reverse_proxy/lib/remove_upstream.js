const fs = require('fs');
const readFile = require("./read_file");

const args = process.argv.slice(2);

const containerIp = args[0];
const servicePort = args[1];
const upstreamsFile = args[2];

let upstreamFileContent = readFile(upstreamsFile, "[]");

const upstreams = JSON.parse(upstreamFileContent);

const upstreamToDelete = containerIp + ":" + servicePort;

const updatedUpstreams = upstreams.filter(upstream => upstream != upstreamToDelete);

fs.writeFileSync(upstreamsFile, JSON.stringify(updatedUpstreams));