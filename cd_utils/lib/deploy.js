'use strict'
const { exec } = require('child_process');
const readFile = require('./read_file');
const writeFile = require('./write_file');

const instancesFileName = "/root/deploy-service/deploy/instances.json";

function getParameters(jsonData) {
    const imageName = jsonData.image_name;
    const containerName = jsonData.container_name;
    const servicePort = jsonData.service_port;
    const containerNetwork = jsonData.container_network.substring(0, 15);
    const proxyContainerName = jsonData.proxy_container_name;
    const serverName = jsonData.server_name;

    return {
        imageName, containerName, servicePort, containerNetwork, proxyContainerName, serverName
    };
}

function deploy(jsonData, done = () => {}) {
    console.log("Deploying:", jsonData);

    const instancesAmount = jsonData.amount || 1;
    const operation = jsonData.operation || "add";
    const internal = jsonData.internal || false;
    const parameters = getParameters(jsonData);

    for (let i = 0; i < instancesAmount; i++) {
        runOperation(operation, internal, parameters, done)
    }
}

function runOperation(operation, internal, parameters, done) {
    if (operation == "delete")
        return killInstance(parameters, done);

    if (operation == "replace")
        return replaceInstance(parameters, internal, done);

    addInstance(parameters, internal, done);
}

function getInstances(containerName) {
    const fileContent = readFile(instancesFileName, "{}");
    const instances = JSON.parse(fileContent);

    instances[containerName] = instances[containerName] || [];

    return instances;
}

function getOlderInstance(containerName) {
    const instances = getInstances(containerName);

    return instances[containerName][0];
}

function getNewInstanceName(containerName) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    return containerName + timestamp;
}

function saveNewInstance(containerName, newInstanceName) {
    const instances = getInstances(containerName);

    instances[containerName].push(newInstanceName);

    writeFile(instancesFileName, instances);
}

function replaceInstance(parameters, internal, done) {
    addInstance(parameters, internal, () => {
        killInstance(parameters, done);
    });
}

function killInstance(parameters, done) {
    const oldestInstance = getOlderInstance(parameters.containerName);
    if (!oldestInstance) return done();

    parameters.containerName = oldestInstance;
    const stringArguments = Object.values(parameters).join(" ");
    console.log("Kill arguments:", stringArguments);

    exec("/usr/local/sbin/kill " + stringArguments, done);
}

function addInstance(parameters, internal, done) {
    const containerName = parameters.containerName;
    const newInstanceName = getNewInstanceName(parameters.containerName);
    parameters.containerName = newInstanceName;

    if (internal) {
        internalDeploy(parameters, done);
        saveNewInstance(containerName, newInstanceName);
    }

    const stringArguments = Object.values(parameters).join(" ");
    console.log("Deploy arguments:", stringArguments);

    exec("/usr/local/sbin/deploy " + stringArguments, done);
    saveNewInstance(containerName, newInstanceName);
}

function internalDeploy(parameters, done) {
    const stringArguments = Object.values(parameters).slice(0, -2).join(" ");
    console.log("Internal deploy arguments:", stringArguments);

    exec("/usr/local/sbin/internal_deploy " + stringArguments, done);
}

module.exports = deploy;