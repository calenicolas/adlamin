const fs = require('fs');

const args = process.argv.slice(2);

const ruleTemplate = fs.readFileSync('/usr/local/lib/knock_utils/knock_rule_template', 'utf8');
const ruleWithName = ruleTemplate.replace(/%NAME%/g, args[0]);
const ruleWithOpenSequence = ruleWithName.replace(/%OPEN_SEQUENCE%/g, args[1].replace(/ /g, ","));
const ruleWithOpenCommand = ruleWithOpenSequence.replace(/%OPEN_COMMAND%/g, args[2]);
const ruleWithCloseSequence = ruleWithOpenCommand.replace(/%CLOSE_SEQUENCE%/g, args[1].split(" ").reverse().join(","));
const rule = ruleWithCloseSequence.replace(/%CLOSE_COMMAND%/g, args[3]);

console.log(rule);
