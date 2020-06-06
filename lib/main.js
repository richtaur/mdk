#!/usr/local/bin/node

const minimist = require("minimist");

const config = minimist(process.argv.slice(2));

console.log("> Welcome to MDK v0.0.1");
// console.log("CONFIG:" + JSON.stringify(config));

// Pipe to the command
const command = config._[0];
switch (command) {
	case "audio": {
		const audio = require("./commands/audio");
		audio(config);
		break;
	}

	default: {
		console.log("- No idea what to do with " + command);
		break;
	}
}

console.log("> MDK exiting");
