'use strict';
const fs = require('fs');
const deploy = require("./deploy");

const pendingDeploysDirectory = "/root/deploy-service/deploy/pending/";
const doneDeploysDirectory = "/root/deploy-service/deploy/done/";

function run(deploys) {
    if (!deploys.length) return;

    const pendingDeploy = deploys.pop()
    const deployData = JSON.parse(pendingDeploy.content);
    deploy(deployData, (error) => {
        if (error) return console.error(error);
        fs.renameSync(
            pendingDeploysDirectory + pendingDeploy.fileName,
            doneDeploysDirectory + pendingDeploy.fileName
        );
        run(deploys)
    });
}

function runPendingDeploys() {
    const deploys = fs.readdirSync(pendingDeploysDirectory)
        .map((fileName) => {
            return {
                content: fs.readFileSync(pendingDeploysDirectory + fileName, { encoding: 'utf8' }),
                fileName: fileName
            }
        });
    run(deploys)
}

runPendingDeploys();