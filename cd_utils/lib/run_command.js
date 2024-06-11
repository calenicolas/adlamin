const { spawn } = require('child_process');

module.exports = function(command, parameters, done) {
    const commandResult = spawn(command, parameters);
    console.log("running ", command, parameters)
    commandResult.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      done();
    });

    commandResult.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      done();
    });

    commandResult.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      done();
    });
}


