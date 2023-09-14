const fs = require('fs');
const ini = require('ini');

const args = process.argv.slice(2);

const appName = args[0];
const openSequence = args[1].replace(/ /g, ",");
const openCommand = args[2];
const closeSequence = args[1].split(" ").reverse().join(",");
const closeCommand = args[3];
const knockdConfFile = args[4];

const knockdIniConfiguration = fs.readFileSync(knockdConfFile, 'utf8');
const configuration = ini.parse(knockdIniConfiguration);

configuration["open" + appName] = {
    "sequence": openSequence,
    "seq_timeout": 5,
    "command": openCommand,
    "tcpflags": "syn"
}

configuration["close" + appName] = {
    "sequence": closeSequence,
    "seq_timeout": 5,
    "command": closeCommand,
    "tcpflags": "syn"
}

console.log(configuration);

fs.writeFileSync(knockdConfFile, ini.stringify(configuration));
