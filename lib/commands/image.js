const fs = require("fs");
const childProcess = require("child_process");

let totalBefore = 0
let totalAfter = 0;

function clean (string) {
	return `"${string}"`;
}

// resize
// mogrify -resize 50% *.jpg
// mogrify -resize 50% *.jpg; mogrify -strip -interlace Plane -gaussian-blur 0.05 -quality 85% *.jpg

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

		default: {
			console.log("- Unsure how to operate on " + command);
			break;
		}
	}

	console.log("- Image DONE");
};
