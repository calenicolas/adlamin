const fs = require('fs');
const readFile = require('./read_file');

const args = process.argv.slice(2);

const name = args[0];
const serverName = args[1];
const location = args[2];
const upstreamsFile = args[3];
const templatePath = args[4];

const upstreamsFileContent = readFile(upstreamsFile, "[]");
const upstreams = JSON.parse(upstreamsFileContent);
const servers = upstreams.map((upstream) => "server " + upstream + ";").join("\n    ");

const confTemplate = fs.readFileSync(templatePath, 'utf8');
const confWithName = confTemplate.replace(/%NAME%/g, name);
const confWithServerName = confWithName.replace(/%SERVER_NAME%/g, serverName);
const confWithLocation = confWithServerName.replace(/%LOCATION%/g, location);
const conf = confWithLocation.replace(/%SERVERS%/g, servers);

console.log(conf);
