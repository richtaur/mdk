exports.audio = function () {
	console.log("  mdk audio compress $path");
	console.log("  mdk audio normalize $path");
};

exports.image = function () {
	console.log("  mdk image compress $path");
	console.log("  mdk image convert $path");
	console.log("  mdk image resize $size $path");
};

exports.video = function () {
	console.log("  mdk video compress $path");
	console.log("  mdk video gifify $path");
};

exports.command = function (config) {
	const command = config._[1];
	switch (command) {
		case "audio":
			exports.audio();
			break;

		case "image":
			exports.image();
			break;

		case "video":
			exports.video();
			break;

		default: {
			console.log("- Commands:");
			exports.audio();
			exports.image();
			exports.video();
			break;
		}
	}
};
