#!/usr/bin/env node

const minimist = require("minimist");

const VERSION = "0.10.3";

const config = minimist(process.argv.slice(2));

console.log(`> Welcome to MDK v${VERSION}`);
// console.log("  DEBUG config: " + JSON.stringify(config));

// Pipe to the command
const command = config._[0];
switch (command) {
	// Show the help menu
	case "man": // Intentional fallthrough
	case "help": // Intentional fallthrough
	case undefined: {
		const help = require("./commands/help");
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
		break;
	}
}

console.log("> MDK exiting");