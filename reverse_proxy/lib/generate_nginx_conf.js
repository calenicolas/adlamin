const fs = require('fs');

const args = process.argv.slice(2);

const confTemplate = fs.readFileSync('/usr/local/lib/reverse_proxy/conf_template', 'utf8');
const confWithName = confTemplate.replace(/%NAME%/g, args[0]);
const confWithServerName = confWithName.replace(/%SERVER_NAME%/g, args[1]);
const confWithLocation = confWithServerName.replace(/%LOCATION%/g, args[2]);
const conf = confWithLocation.replace(/%SERVER%/g, args[3]);

console.log(conf);
