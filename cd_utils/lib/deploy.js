'use strict'
const readFile = require('./read_file');
const writeFile = require('./write_file');
const runCommand = require('./run_command');

const instancesFileName = "/root/deploy-service/deploy/instances.json";

function deploy(jsonData, done = () => {}) {
    console.log("Deploying:", jsonData);

    const parameters = getParameters(jsonData);

    asyncRepeat((iterationDone) => {
        runOperation(parameters, iterationDone)
    }, parameters.amount, done);
}

function getParameters(jsonData) {
    const imageName = jsonData.image_name;
    const appName = jsonData.app_name;
    const servicePort = jsonData.service_port;
    const containerNetwork = appName.substring(0, 15);
    const proxyContainerName = jsonData.proxy_container_name;
    const serverName = jsonData.server_name;
    const amount = jsonData.amount || 1;
    const operation = jsonData.operation || "add";
    const type = jsonData.type || "public";
    const memory = jsonData.memory || "100m";
    const cpu = jsonData.cpu || ".1";
    const sequence = jsonData.sequence || "";

    return {
        imageName,
        appName,
        servicePort,
        containerNetwork,
        proxyContainerName,
        serverName,
        operation,
        type,
        amount,
        memory,
        cpu,
        sequence
    };
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

    if (operation == "delete")
        return killInstance(parameters, done);

    if (operation == "replace")
        return replaceInstance(parameters, done);

    addInstance(parameters, () => done());
}

function killInstance(parameters, done) {
    const jsonArguments = {
        appName: parameters.appName,
        proxyContainerName: parameters.proxyContainerName,
        serverName: parameters.serverName
    };
    console.log("Kill arguments:", jsonArguments);

    runCommand("/usr/local/sbin/adlamin --action=kill --data='" + JSON.stringify(jsonArguments) + "'", () => done());
}

function addInstance(parameters, done) {
    const jsonArguments = {
        imageName: parameters.imageName,
        servicePort: parameters.servicePort,
        appName: parameters.appName,
        containerNetwork: parameters.containerNetwork,
        proxyContainerName: parameters.proxyContainerName,
        serverName: parameters.serverName,
        memory: parameters.memory,
        type: parameters.type,
        cpu: parameters.cpu,
        sequence: parameters.sequence
    };
    console.log("Deploy arguments:", jsonArguments);

    runCommand("/usr/local/sbin/adlamin --action=deploy --data='" + JSON.stringify(jsonArguments) + "'", () => done());
}

function replaceInstance(parameters, done) {
    addInstance(parameters, () => {
        killInstance(parameters, done);
    });
}

module.exports = deploy;