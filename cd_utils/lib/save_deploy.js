
const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const pendingDeploysDirectory = "/home/deploy/pending/"
const args = process.argv.slice(2);
const projectDir = args[0];

const deployJson = fs.readFileSync(projectDir + "/deploy.json");
const deployData = JSON.parse(deployJson);

saveDeploy(deployData);

function saveDeploy(jsonBody) {
    validateBody(jsonBody);
    trimAppName(jsonBody);
    writeData(jsonBody);
}

function validateBody(jsonBody) {
    const requiredKeys = [
        "image_name",
        "app_name",
        "service_port",
        "proxy_container_name",
        "server_name"
    ];
    if (requiredKeys.some((key) => { return !jsonBody.hasOwnProperty(key); })) {
        throw new Error("Invalid deploy")
    }
}
function trimAppName(jsonBody) {
    jsonBody.app_name = getFirstCharactersFrom(jsonBody.app_name, 15)
}

function writeData(body) {
    const now = Date.now();
    if (!body.operation) {
        body.operation = "add";
    }
    fs.writeFileSync(pendingDeploysDirectory + now + ".json", JSON.stringify(body));
}

function getFirstCharactersFrom(text, characters) {
    if (text.length >= characters) {
        return text.substring(0, characters);
    } else {
        return text;
    }
}
