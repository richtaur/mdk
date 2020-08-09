#!/usr/local/bin/node

const minimist = require("minimist");

const config = minimist(process.argv.slice(2));

console.log("> Welcome to MDK v0.4.0");
// console.log("  DEBUG config: " + JSON.stringify(config));

// Pipe to the command
const command = config._[0];
switch (command) {
	case "man": // Intentional fallthrough
	case "help": // Intentional fallthrough
	case undefined: {
		console.log("- Commands:");
		console.log("  mdk audio compress $path");
		console.log("  mdk audio normalize $path");
		console.log("  mdk image compress $path");
		console.log("  mdk image resize $size $path");
		console.log("  mdk video compress $path");
		console.log("  mdk video gifify $path");
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
