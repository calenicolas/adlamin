const YAML = require("yaml");
const fs = require('fs');

function addPrometheusTarget(serviceIp, serviceName, prometheusConfigFile) {
    const file = fs.readFileSync(prometheusConfigFile, 'utf8')
    const actualConfig = YAML.parse(file);
    const newServiceConfig = {
        job_name: serviceName,
        static_configs: [{
            targets: []
        }]
    }
    actualConfig["scrape_configs"] = actualConfig["scrape_configs"] || [newServiceConfig];

    let updated = false;

    actualConfig["scrape_configs"] = actualConfig["scrape_configs"].map((config) => {
        if (config.job_name != serviceName) return config;

        updated = true;
        config.static_configs[0].targets.push(serviceIp + ":9001");

        return config
    });

    if (!updated) {
        newServiceConfig.static_configs[0].targets.push(serviceIp + ":9001");
        actualConfig["scrape_configs"][0].push(newServiceConfig);
    }

    fs.writeFileSync(prometheusConfigFile, YAML.stringify(actualConfig));
}

const args = process.argv.slice(2);
addPrometheusTarget(args[0], args[1], args[2]);