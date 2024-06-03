const fs = require('fs');

module.exports = writeFile;

function writeFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content));
}