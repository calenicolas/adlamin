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
register.registerMetric(containersCpuUsage);
register.registerMetric(containersMemoryUsage);
register.registerMetric(hostCpuUsage);
register.registerMetric(hostMemoryUsage);

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
        stats = JSON.parse(statsFile);
        registerOsStats(stats.os);
        registerContainersStats(stats.containers);
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

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
