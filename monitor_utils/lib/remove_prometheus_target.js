const YAML = require("yaml");
const fs = require('fs');

function removePrometheusTarget(serviceIp, serviceName, prometheusConfigFile) {
    const file = fs.readFileSync(prometheusConfigFile, 'utf8')
    const actualConfig = YAML.parse(file);
    const newServiceConfig = {
        job_name: serviceName,
        static_configs: [{
            targets: []
        }]
    }
    actualConfig["scrape_configs"] = actualConfig["scrape_configs"] || [newServiceConfig];

    actualConfig["scrape_configs"] = actualConfig["scrape_configs"].map((config) => {
        if (config.job_name != serviceName) return config;

        config.static_configs[0].targets = config.static_configs[0].targets.filter((target) => target != serviceIp + ":9001");

        return config
    });

    fs.writeFileSync(prometheusConfigFile, YAML.stringify(actualConfig));
}

const args = process.argv.slice(2);
removePrometheusTarget(args[0], args[1], args[2]);