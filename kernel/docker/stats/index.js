const http = require('http');
const fs = require('fs');
const client = require('prom-client');

const register = new client.Registry();
const containersCpuUsage = new client.Gauge({
    name: 'docker_container_cpu_usage',
    help: 'CPU usage of the container',
    labelNames: ['container_name'],
});
const containersMemoryUsage = new client.Gauge({
    name: 'docker_container_memory_usage',
    help: 'Memory usage of the container',
    labelNames: ['container_name'],
});
const hostCpuUsage = new client.Gauge({
    name: 'host_cpu_usage',
    help: 'CPU usage of the host'
});
const hostMemoryUsage = new client.Gauge({
    name: 'host_memory_usage',
    help: 'Memory usage of the host'
});
const actionsLogs = new client.Gauge({
    name: 'actions_logs',
    help: 'Results of adlamin actions',
    labelNames: ['action', 'status', 'parameters', 'time']
});
register.registerMetric(containersCpuUsage);
register.registerMetric(containersMemoryUsage);
register.registerMetric(hostCpuUsage);
register.registerMetric(hostMemoryUsage);
register.registerMetric(actionsLogs);

const server = http.createServer((req, res) => {
    getMetrics()
        .then((metrics) => {
            res.writeHead(200, { 'Content-Type': register.contentType });
            res.end(metrics);
        })
        .catch((error) => {
            console.error(error);
            res.writeHead(500, { 'Content-Type': "text/plain" });
            res.end(error.message);
        });
});

function getMetrics() {
    let stats;
    try {
        const statsFile = fs.readFileSync("./stats.json");
        const actionsLogsFile = fs.readFileSync("./actions_logs.json");
        stats = JSON.parse(statsFile);
        const logs = JSON.parse(actionsLogsFile);
        registerOsStats(stats.os);
        registerContainersStats(stats.containers);
        registerActionsLogs(logs);
        return register.metrics();
    } catch (error) {
        return Promise.reject(error);
    }
}

function registerOsStats(os) {
    const memoryPercentage = (os.memory.used * 100) / os.memory.total;
    hostCpuUsage.set(memoryPercentage);
    hostMemoryUsage.set(os.cpu.percentage);
}

function registerContainersStats(containers) {
    containers.forEach((container) => {
        const memoryPercentage = parseFloat(container.memory);
        const cpuPercentage = parseFloat(container.cpu);
        containersCpuUsage.labels(container.name).set(cpuPercentage);
        containersMemoryUsage.labels(container.name).set(memoryPercentage);
    });
}

function registerActionsLogs(logs) {
    logs.forEach(({ action, status, parameters, time }) => {
        actionsLogs.labels(action, status, parameters, time).set(1);
    });
}

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
