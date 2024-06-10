const { spawn } = require('child_process');

module.exports = function(command, parameters, done) {
    const commandResult = spawn(command, parameters);
    commandResult.on('close', () => { done() });
    commandResult.on('error', (error) => { console.log(error); done() });
}