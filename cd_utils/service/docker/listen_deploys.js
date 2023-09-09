'use strict';

const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const pendingDeploysDirectory = "/etc/pending-deploys/"

const server = http.createServer((request, response) => {
    if (request.method !== 'POST') {
        response.writeHead(400);
        return response.end();
    }

    handlePostRequest(request, response);
});

function handlePostRequest(request, response) {
    let body = '';
    request.on('data', function (data) {
        body += data;

        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        try {
            const jsonBody = JSON.parse(body);
            validateBody(jsonBody);
            writeData(jsonBody);
            response.writeHead(200);
            response.end();
        } catch(error) {
            console.error(error);
            response.writeHead(400);
            response.end();
        }
    });
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

function writeData(body) {
    const now = Date.now();
    if (!body.operation) {
        body.operation = "add";
    }
    fs.writeFileSync(pendingDeploysDirectory + now + ".json", JSON.stringify(body));
}

server.listen(8080);
console.log('Server is now listening');
