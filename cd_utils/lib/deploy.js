'use strict'
const readFile = require('./read_file');
const writeFile = require('./write_file');
const runCommand = require('./run_command');
const adlaminCli = "/usr/local/bin/adlamin-cli"

function deploy(jsonData, done = () => {}) {
    const parameters = getParameters(jsonData);

    asyncRepeat((iterationDone) => {
        runOperation(parameters, iterationDone)
    }, parameters.amount, done);
}

function cutString(string, limit) {
  if (string.length > limit) {
    return string.substring(0, limit);
  }
  return string;
}

function getParameters(jsonData) {
    jsonData.applicationName = cutString(jsonData.applicationName, 15);
    return jsonData;
}

function asyncRepeat(operation, iterationAmount, done, actualIteration = 0) {
    operation(() => {
        const iteration = actualIteration + 1;
        if (iteration < iterationAmount) {
            asyncRepeat(operation, iterationAmount, done, iteration)
        } else {
            done();
        }
    });
}

function runOperation(parameters, done) {
    const operation = parameters.operation;
    addInstance(parameters, () => done());
}

function addInstance(parameters, done) {
    console.log("Deploy arguments:", parameters);
    runCommand(adlaminCli, ["deploy", JSON.stringify(parameters)], () => done());
}

module.exports = deploy;