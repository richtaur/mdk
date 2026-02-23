exports.audio = function () {
	console.log("  mdk audio compress $path");
	console.log("  mdk audio convert $format $path");
	console.log("  mdk audio normalize $path");
	console.log("  mdk audio reverse $path");
	console.log("  mdk audio volume $volume $path");
};

exports.audioCompress = function () {
	console.log("- audio compress example:");
	console.log("  mdk audio compress *.mp3");
};

exports.audioConvert = function () {
	console.log("- audio convert example:");
	console.log("  mdk audio convert m4a *.wav");
};

exports.audioNormalize = function () {
	console.log("- audio normalize example:");
	console.log("  mdk audio normalize *.ogg");
};

exports.audioReverse = function () {
	console.log("- audio reverse example:");
	console.log("  mdk audio reverse example.mp3");
};

exports.audioVolume = function () {
	console.log("- audio volume examples:");
	console.log("  mdk audio volume 0.5 *.wav");
	console.log("  mdk audio volume 4dB *.mp3");
};

exports.image = function () {
	console.log("  mdk image compress $path");
	console.log("  mdk image convert $format $path");
	console.log("  mdk image resize $size $path");
};

exports.imageCompress = function () {
	console.log("- Image compress example:");
	console.log("  mdk image compress *.png");
};

exports.imageConvert = function () {
	console.log("- Image convert example:");
	console.log("  mdk image convert png *.jpg");
};

exports.video = function () {
	console.log("  mdk video compress $path");
	exports.videoConvert();
	console.log("  mdk video gifify $path");
	console.log("  mdk video resize $size $path");
};

exports.videoConvert = function () {
	console.log("  mdk video convert $path $type");
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