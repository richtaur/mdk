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
	const ffmpegCommand = `ffmpeg -loglevel panic -i ${cleanTarget} -crf 20 ${tmp}; mv ${tmp} ${cleanTarget}`;
	childProcess.execSync(ffmpegCommand);

	const statsAfter = fs.statSync(target);
	const afterK = Math.round(statsAfter.size / 1000);
	const normal = afterK / beforeK;
	const savings = Math.round((1 - normal) * 100);
	totalAfter += statsAfter.size;

	console.log(`- Compressed ${target} (${beforeK}k => ${afterK}k) (${savings}% savings)`);
}

function convert (target, format) {
	const output = target.substr(0, target.lastIndexOf(".")) + "." + format;
	console.log(`- Converting ${target} to ${output} ...`);

	const cleanTarget = clean(target);
	const cleanOutput = clean(output);
	// const ffmpegCommand = `ffmpeg -y -loglevel panic -i ${cleanTarget} -vf "fps=${fps},scale=-1:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ${output}`;
	const ffmpegCommand = `ffmpeg -y -loglevel panic -i ${cleanTarget} ${cleanOutput}`;
	childProcess.execSync(ffmpegCommand);
	console.log("- Done");
}

function gifify (target, fps) {
	const output = target.substr(0, target.lastIndexOf(".")) + ".gif";
	console.log(`- Converting ${target} to ${output} ...`);

	const cleanTarget = clean(target);
	const ffmpegCommand = `ffmpeg -y -loglevel panic -i ${cleanTarget} -vf "fps=${fps},scale=-1:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ${output}`;
	childProcess.execSync(ffmpegCommand);
	console.log("- Done");
}

function resize (config) {
	console.log("- Executing video resizing ...");

	// First arg is the size information
	const size = config._[2];

	// If args are missing, show help examples
	if (size === undefined || config.length < 3) {
		console.log("- Arguments missing ...");
		console.log("- Video resize example:");
		console.log("  mdk video resize 640x480 *.avi *.mp4");
		return;
	}

	for (let i = 3; i < config._.length; ++i) {
		const target = config._[i];
		if (target) {
			resizeVideo(size, target);
		} else {
			console.log("- unsure how to operate on " + target);
		}
	}
}

function resizeVideo (size, target) {
	const cleanTarget = clean(target);
	const tmp = clean("tmp_" + target);
	const command = `ffmpeg -loglevel panic -i ${cleanTarget} -s ${size} -c:a copy ${tmp}; mv ${tmp} ${cleanTarget}`;
	// const mogrifyCommand = `mogrify -resize ${size} ${cleanTarget}`;
	// const ffmpegCommand = `ffmpeg -loglevel panic -i ${cleanTarget} -crf 20 ${tmp}; mv ${tmp} ${cleanTarget}`;
	// - ffmpeg -i input.avi -s 720x480 -c:a copy output.mkv
	childProcess.execSync(command);
}

module.exports = function (config) {
	const command = config._[1];
	switch (command) {
		case "compress": {
			console.log("- Executing video compression ...");
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
			console.log("- Executing video conversion ...");
			for (let i = 2; i < config._.length; ++i) {
				const target = config._[i];
				if (target) {
					const format = config.format || "mp4";
					convert(target, format);
				} else {
					console.log("- unsure how to operate on " + target);
				}
			}
			break;
		}

		case "gifify": {
			console.log("- Gififying ...");
			const fps = config.fps || 24;
			for (let i = 2; i < config._.length; ++i) {
				const target = config._[i];
				if (target) {
					gifify(target, fps);
				} else {
					console.log("- Unsure how to operate on " + target);
				}
			}
			break;
		}

		case "resize": {
			resize(config);
			break;
		}

		default: {
			help.video();
			break;
		}
	}

	console.log("- Video DONE");
};
