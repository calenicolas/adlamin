const fs = require('fs');

module.exports = readFile;

function readFile(fileName, defaultValue) {
    try {
        return fs.readFileSync(fileName, 'utf8');
    } catch(error) {
        return defaultValue;
    }
}