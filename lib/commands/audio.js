const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

function compress (target) {
	const statsBefore = fs.statSync(target);
	const beforeK = Math.round(statsBefore.size / 1000);

	const tmp = "tmp_" + target;
	const ffmpegCommand = `ffmpeg -loglevel panic -i ${target} -ac 1 ${tmp}; mv ${tmp} ${target}`;
	childProcess.execSync(ffmpegCommand);

	const statsAfter = fs.statSync(target);
	const afterK = Math.round(statsAfter.size / 1000);
	const normal = afterK / beforeK;
	const savings = Math.round((1 - normal) * 100);

	console.log(`- Compressed ${target} (${beforeK}k => ${afterK}k) (${savings}% savings)`);
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
			break;
		}

		default: {
			console.log("- unsure how to operate on " + command);
			break;
		}
	}

	console.log("- Audio DONE");
};
