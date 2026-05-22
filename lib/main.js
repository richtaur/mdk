#!/usr/bin/env node

const { version } = require("../package.json");
const help = require("./commands/help");
const minimist = require("minimist");
const config = minimist(process.argv.slice(2));

// Welcome message
console.log(`> Welcome to MDK v${version}`);
// console.log("  DEBUG config: " + JSON.stringify(config));

// Pipe to the command
const command = config._[0];
switch (command) {
	// Show the help menu
	case "man": // Intentional fallthrough
	case "help": // Intentional fallthrough
	case "version": // Intentional fallthrough
	case undefined: {
		help.command(config);
		break;
	}

	// Audio
	case "audio": {
		const audio = require("./commands/audio");
		audio(config);
		break;
	}

	// Images
	case "image": {
		const image = require("./commands/image");
		image(config);
		break;
	}

	// Video
	case "video": {
		const video = require("./commands/video");
		video(config);
		break;
	}

	default: {
		console.log(`- Invalid command: "${command}"`);
		help.command(config);
		break;
	}
}

// Wrap up
console.log("> MDK exiting");