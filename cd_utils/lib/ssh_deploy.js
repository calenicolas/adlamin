const fs = require("fs");
const { dockerCommand } = require('docker-cli-js');
const saveDeploy = require("./save_deploy");

const args = process.argv.slice(2);
const projectDir = fs.realpathSync(args[0]);

const deployJson = fs.readFileSync(projectDir + "/deploy.json");
const deployData = JSON.parse(deployJson);
const buildArguments = deployData.buildArguments || [];
const dockerBuildArguments = buildArguments.map((argument) => "--build-arg " + argument).concat(" ");

dockerCommand("build -t " + deployData.image_name + " " + dockerBuildArguments + " " + projectDir)
    .then(() => { saveDeploy(deployData) })
    .catch(console.error)