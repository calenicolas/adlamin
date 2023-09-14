const fs = require('fs');
const readFile = require('./read_file');

const args = process.argv.slice(2);

const name = args[0];
const serverName = args[1];
const location = args[2];
const upstreamsFile = args[3];
const templatePath = args[4];
const clientsFile = args[5] || "non-existent";

const upstreamsFileContent = readFile(upstreamsFile, "[]");
const clientsFileContent = readFile(clientsFile, '["all"]');
const upstreams = JSON.parse(upstreamsFileContent);
const allowedClients = JSON.parse(clientsFileContent);

const servers = upstreams.map((upstream) => "server " + upstream + ";").join("\n    ");
const mappedClients = allowedClients.map((client) => "allow " + client + ";");
if (allowedClients != ["all"]) {
    mappedClients.push("deny all;");
}
const clients = mappedClients.join("\n    ");

const confTemplate = fs.readFileSync(templatePath, 'utf8');
const confWithName = confTemplate.replace(/%NAME%/g, name);
const confWithServerName = confWithName.replace(/%SERVER_NAME%/g, serverName);
const confWithLocation = confWithServerName.replace(/%LOCATION%/g, location);
const confWithClients = confWithLocation.replace(/%CLIENTS%/g, clients);
const conf = confWithClients.replace(/%SERVERS%/g, servers);

console.log(conf);
