'use strict'
const { exec } = require('child_process');

function deploy(jsonData, done = () => {}) {
    console.log("Deploying:", jsonData);

    const imageName = jsonData.image_name;
    const containerName = jsonData.container_name;
    const servicePort = jsonData.service_port;
    const containerNetwork = jsonData.container_network.substring(0, 15);
    const proxyContainerName = jsonData.proxy_container_name;
    const serverName = jsonData.server_name;
    const internal = jsonData.internal || false;
    const operation = jsonData.operation || "add";

    const parameters = [
        imageName, containerName, servicePort, containerNetwork, proxyContainerName, serverName
    ];

    if (operation == "delete")
        killInstance(parameters, done);
    else
        addInstance(parameters, internal, done);
}

function killInstance(parameters, done) {
    const stringArguments = parameters.join(" ");
    console.log("Kill arguments:", stringArguments);

    exec("/usr/local/sbin/kill " + stringArguments, done);
}

function addInstance(parameters, internal, done) {
    if (internal) return internalDeploy(parameters, done);

    const stringArguments = parameters.join(" ");
    console.log("Deploy arguments:", stringArguments);

    exec("/usr/local/sbin/deploy " + stringArguments, done);
}

function internalDeploy(parameters, done) {
    const stringArguments = parameters.slice(0, -2).join(" ");
    console.log("Internal deploy arguments:", stringArguments);

    exec("/usr/local/sbin/internal_deploy " + stringArguments, done);
}

module.exports = deploy;