exports.init = function (common) {
	common.child("git", "submodule update --init --recursive");
};

exports.load = function (common) {
};

exports.testapp = function (common, opts, next) {
};
