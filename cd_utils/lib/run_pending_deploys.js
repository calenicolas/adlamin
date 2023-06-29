'use strict';

const net = require('net');
const fs = require('fs');
const { exec } = require('child_process');

const pendingDeploysDirectory = "/root/deploy-service/deploy/pending/"
const doneDeploysDirectory = "/root/deploy-service/deploy/done/"

function deploy(jsonData, done = () => {}) {
    console.log("Deploying:", jsonData);

    const imageName = jsonData.image_name;
    const containerName = jsonData.container_name;
    const servicePort = jsonData.service_port;
    const containerNetwork = jsonData.container_network.substring(0, 15);
    const proxyContainerName = jsonData.proxy_container_name;
    const serverName = jsonData.server_name;
    const internal = jsonData.internal || false;

    const parameters = [
        imageName, containerName, servicePort, containerNetwork, proxyContainerName, serverName
    ];

    const stringArguments = parameters.join(" ");

    console.log("Deploy arguments:", stringArguments);
    if (internal)
        exec("/usr/local/sbin/internal_deploy " + stringArguments, done);
    else
        exec("/usr/local/sbin/deploy " + stringArguments, done);
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
            deploy(JSON.parse(pendingDeploy.content), (error) => {
                if (error) return console.error(error);
                fs.renameSync(
                    pendingDeploysDirectory + pendingDeploy.fileName,
                    doneDeploysDirectory + pendingDeploy.fileName
                );
            });
        });
}

runPendingDeploys()