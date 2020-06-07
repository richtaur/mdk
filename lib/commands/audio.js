const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

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
	const tmp = "tmp_" + cleanTarget;
	const ffmpegCommand = `ffmpeg -loglevel panic -i ${cleanTarget} -ac 1 ${tmp}; mv ${tmp} ${cleanTarget}`;
	childProcess.execSync(ffmpegCommand);

	const statsAfter = fs.statSync(target);
	const afterK = Math.round(statsAfter.size / 1000);
	const normal = afterK / beforeK;
	const savings = Math.round((1 - normal) * 100);
	totalAfter += statsAfter.size;

	console.log(`- Compressed ${target} (${beforeK}k => ${afterK}k) (${savings}% savings)`);
}

function normalize (target) {
	const cleanTarget = clean(target);
	const tmp = "tmp_" + cleanTarget;
	const ffmpegCommand = `ffmpeg -loglevel panic -i ${cleanTarget} -af loudnorm=I=-23:LRA=7:tp=-2:print_format=json -f null -\nffmpeg -loglevel panic -i ${cleanTarget} -af loudnorm=I=-23:LRA=7:tp=-2:measured_I=-30:measured_LRA=1.1:measured_tp=-11:measured_thresh=-40.21:offset=-0.47 -ar 48k -y ${tmp}; mv ${tmp} ${cleanTarget}`;
	childProcess.execSync(ffmpegCommand);
	console.log("- Normalized " + target);
}

module.exports = function (config) {
	const command = config._[1];
	switch (command) {
		case "compress": {
			console.log("- Executing audio compression ...");
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

		case "normalize": {
			console.log("- Executing audio normalization ...");
			for (let i = 2; i < config._.length; ++i) {
				const target = config._[i];
				if (target) {
					normalize(target);
				} else {
					console.log("- Unsure how to operate on " + target);
				}
			}
			break;
		}

		default: {
			console.log("- Unsure how to operate on " + command);
			break;
		}
	}

	console.log("- Audio DONE");
};