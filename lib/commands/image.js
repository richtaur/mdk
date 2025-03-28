const fs = require("fs");
const childProcess = require("child_process");
const help = require("./help");

let totalBefore = 0
let totalAfter = 0;

function clean (string) {
	return `"${string}"`;
}

function compress (target) {
	const statsBefore = fs.statSync(target);
	const beforeK = Math.round(statsBefore.size / 1000);
	totalBefore += statsBefore.size;

	const cleanTarget = clean(target);
	const tmp = clean("tmp_" + target);
	// mogrify -strip -interlace Plane -gaussian-blur 0.05 -quality 85% *.jpg
	const ffmpegCommand = `ffmpeg -loglevel panic -i ${cleanTarget} -crf 20 ${tmp}; mv ${tmp} ${cleanTarget}`;
	childProcess.execSync(ffmpegCommand);

	const statsAfter = fs.statSync(target);
	const afterK = Math.round(statsAfter.size / 1000);
	const normal = afterK / beforeK;
	const savings = Math.round((1 - normal) * 100);
	totalAfter += statsAfter.size;

	console.log(`- Compressed ${target} (${beforeK}k => ${afterK}k) (${savings}% savings)`);
}

function convertImages (config) {
	console.log("- Executing image conversion ...");

	// First arg is the format information
	const format = config._[2];

	// If args are missing, show help examples
	if (format === undefined || config.length < 3) {
		help.imageConvert();
		return;
	}

	for (let i = 3; i < config._.length; ++i) {
		const target = config._[i];
		if (target) {
			convertImage(format, target);
		} else {
			console.log("- unsure how to operate on " + target);
		}
	}
}

function convertImage (format, target) {
	const cleanTarget = clean(target);
	const mogrifyCommand = `mogrify -format ${format} ${cleanTarget}`;
	childProcess.execSync(mogrifyCommand);
}

function resizeImage (size, target) {
	const cleanTarget = clean(target);
	const mogrifyCommand = `mogrify -resize ${size} ${cleanTarget}`;
	// const mogrifyCommand = `mogrify -filter point -resize ${size} ${cleanTarget}`;
	childProcess.execSync(mogrifyCommand);
}

function resizeImages (config) {
	console.log("- Executing image resizing ...");

	// First arg is the size information
	const size = config._[2];

	// If args are missing, show help examples
	if (size === undefined || config.length < 3) {
		console.log("- Arguments missing ...");
		console.log("- Image resize examples:");
		console.log("  mdk image resize 50% *.jpg");
		console.log("  mdk image resize 256x144 *.png *.gif");
		return;
	}

	for (let i = 3; i < config._.length; ++i) {
		const target = config._[i];
		if (target) {
			resizeImage(size, target);
		} else {
			console.log("- unsure how to operate on " + target);
		}
	}
}

module.exports = function (config) {
	const command = config._[1];
	switch (command) {
		case "compress": {
			console.log("- Executing image compression ...");
			for (let i = 2; i < config._.length; ++i) {
				const target = config._[i];
				if (target) {
					compress(target);
				} else {
					console.log("- unsure how to operate on " + target);
				}
			}

			// Finish up
			const beforeK = Math.round(totalBefore / 1000);
			const afterK = Math.round(totalAfter / 1000);
			const normal = afterK / beforeK;
			const savings = Math.round((1 - normal) * 100);
			console.log(`- Before: ${beforeK}k, After: ${afterK}k (${savings}% savings)`);
			break;
		}

		case "convert": {
			convertImages(config);
			break;
		}

		case "resize": {
			resizeImages(config);
			break;
		}

		default: {
			help.image();
			break;
		}
	}

	console.log("- Image DONE");
};