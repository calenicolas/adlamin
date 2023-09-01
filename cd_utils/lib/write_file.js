const fs = require('fs');

module.exports = readFile;

function readFile(fileName, content) {
    fs.writeFileSync(fileName, content);
}