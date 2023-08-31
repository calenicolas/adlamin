'use strict';

const net = require('net');
const fs = require('fs');
const { exec } = require('child_process');

const pendingDeploysDirectory = "/root/deploy-service/deploy/pending/";
const doneDeploysDirectory = "/root/deploy-service/deploy/done/";

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
        addInstance(parameters, done);
}

function killInstance(parameters, done) {
    const stringArguments = parameters.join(" ");
    console.log("Kill arguments:", stringArguments);

    exec("/usr/local/sbin/kill " + stringArguments, done);
}

function addInstance(parameters, done) {
    const stringArguments = parameters.join(" ");
    console.log("Deploy arguments:", stringArguments);

    if (internal) {
        internalDeploy(parameters, done);
        return;
    }

    exec("/usr/local/sbin/deploy " + stringArguments, done);
}

function internalDeploy(parameters, done) {
    const stringArguments = parameters.slice(0, -2).join(" ");
    exec("/usr/local/sbin/internal_deploy " + stringArguments, done);
}

function runPendingDeploys() {
    fs.readdirSync(pendingDeploysDirectory)
        .map((fileName) => {
            return {
                content: fs.readFileSync(pendingDeploysDirectory + fileName, { encoding: 'utf8' }),
                fileName: fileName
            }
        })
        .forEach((pendingDeploy) => {
            const deployData = JSON.parse(pendingDeploy.content);
            deploy(deployData, (error) => {
                if (error) return console.error(error);
                fs.renameSync(
                    pendingDeploysDirectory + pendingDeploy.fileName,
                    doneDeploysDirectory + pendingDeploy.fileName
                );
            });
        });
}

runPendingDeploys();