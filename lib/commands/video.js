const childProcess = require("child_process");

function gifify (target, fps) {
	const output = target.substr(0, target.lastIndexOf(".")) + ".gif";
	console.log(`- Converting ${target} to ${output} ...`);

	const ffmpegCommand = `ffmpeg -y -loglevel panic -i ${target} -vf "fps=${fps},scale=-1:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ${output}`;
	childProcess.execSync(ffmpegCommand);
	console.log("- Done");
}

module.exports = function (config) {
	const command = config._[1];
	switch (command) {
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

		default: {
			console.log("- Unsure how to operate on " + command);
			break;
		}
	}

	console.log("- Video DONE");
};
