const { exec } = require('child_process');

module.exports = function(command, done) {
    const commandResult = exec(command, done);

    commandResult.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    commandResult.stderr.on('data', (data) => {
        console.log(`${data}`);
    });
}