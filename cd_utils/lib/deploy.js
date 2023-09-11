'use strict'
const { exec } = require('child_process');
const readFile = require('./read_file');
const writeFile = require('./write_file');

const instancesFileName = "/root/deploy-service/deploy/instances.json";

function deploy(jsonData, done = () => {}) {
    console.log("Deploying:", jsonData);

    const parameters = getParameters(jsonData);

    const newInstances = [];
    asyncRepeat((iterationDone) => {
        runOperation(parameters, newInstances, iterationDone)
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
    const internal = jsonData.internal || false;

    return {
        imageName,
        appName,
        servicePort,
        containerNetwork,
        proxyContainerName,
        serverName,
        operation,
        internal,
        amount
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

function runOperation(parameters, newInstances, done) {
    const operation = parameters.operation;
    const internal = parameters.internal;

    if (operation == "delete")
        return killInstance(parameters, done);

    if (operation == "replace")
        return replaceInstance(parameters, newInstances, done);

    addInstance(parameters, internal, () => done());
}

function killInstance(parameters, done, newInstances = []) {
    const oldestInstance = getOldestInstance(parameters.appName);
    if (!oldestInstance) return done();
    if (newInstances.includes(oldestInstance)) return done();

    const stringArguments = [
        parameters.imageName,
        oldestInstance,
        parameters.servicePort,
        parameters.containerNetwork,
        parameters.proxyContainerName,
        parameters.serverName
    ].join(" ");
    console.log("Kill arguments:", stringArguments);

    exec("/usr/local/sbin/kill " + stringArguments, done);
    saveDeletedInstance(parameters.appName, oldestInstance);
}

function addInstance(parameters, done) {
    const newInstanceName = getNewInstanceName(parameters.appName);

    if (parameters.internal) {
        internalDeploy(parameters, newInstanceName, () => done(newInstanceName));
        return saveNewInstance(parameters.appName, newInstanceName);
    }

    const stringArguments = [
        parameters.imageName,
        newInstanceName,
        parameters.servicePort,
        parameters.containerNetwork,
        parameters.proxyContainerName,
        parameters.serverName
    ].join(" ");
    console.log("Deploy arguments:", stringArguments);

    exec("/usr/local/sbin/deploy " + stringArguments, () => done(newInstanceName));
    saveNewInstance(parameters.appName, newInstanceName);
}

function internalDeploy(parameters, newInstanceName, done) {
    const stringArguments = [
        parameters.imageName,
        newInstanceName,
        parameters.servicePort,
        parameters.containerNetwork
    ].join(" ");
    console.log("Internal deploy arguments:", stringArguments);

    exec("/usr/local/sbin/internal_deploy " + stringArguments, done);
}


function replaceInstance(parameters, newInstances, done) {
    addInstance(parameters, (newInstance) => {
        newInstances.push(newInstance);
        killInstance(parameters, done, newInstances);
    });
}

function getOldestInstance(appName) {
    const instances = getInstances(appName);
    return instances[0] || null;
}

function getInstances(appName) {
    const fileContent = readFile(instancesFileName, "{}");
    const instances = JSON.parse(fileContent);

    return instances[appName] || [];
}

function getAllInstances() {
    const fileContent = readFile(instancesFileName, "{}");
    return JSON.parse(fileContent);
}

function getNewInstanceName(appName) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    return appName + timestamp;
}

function saveNewInstance(appName, newInstanceName) {
    const instances = getAllInstances();
    instances[appName] == instances[appName] || [];
    instances[appName].push(newInstanceName);

    writeFile(instancesFileName, instances);
}

function saveDeletedInstance(appName, deletedInstanceName) {
    const instances = getAllInstances();
    instances[appName] == instances[appName] || [];
    const updatedInstances = instances[appName].filter((instance) => instance != deletedInstanceName);
    writeFile(instancesFileName, updatedInstances);
}

module.exports = deploy;