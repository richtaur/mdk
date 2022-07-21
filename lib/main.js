#!/opt/homebrew/bin/node

const minimist = require("minimist");

const VERSION = "0.9.0";

const config = minimist(process.argv.slice(2));

console.log(`> Welcome to MDK v${VERSION}`);
// console.log("  DEBUG config: " + JSON.stringify(config));

// Pipe to the command
const command = config._[0];
switch (command) {
	case "man": // Intentional fallthrough
	case "help": // Intentional fallthrough
	case undefined: {
		const help = require("./commands/help");
		help.command(config);
		break;
	}

	case "audio": {
		const audio = require("./commands/audio");
		audio(config);
		break;
	}

	case "image": {
		const image = require("./commands/image");
		image(config);
		break;
	}

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
