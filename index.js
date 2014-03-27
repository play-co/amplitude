exports.init = function (common) {
	var logger = new common.Formatter('amplitude');

	logger.log("Pulling in the Amplitude SDK");

	common.child("git", ["submodule", "update", "--init", "--recursive"], {cwd: __dirname}, function() {
		logger.log("Done updating the Amplitude SDK");
	});
};

exports.load = function (common) {
};

exports.testapp = function (common, opts, next) {
};
