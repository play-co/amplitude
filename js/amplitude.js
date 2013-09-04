var hasNativeEvents = NATIVE && NATIVE.plugins && NATIVE.plugins.sendEvent;

var Amplitude = Class(function () {
	this.track = function (name, data) {
		if (DEBUG) {
			logger.log("track: ", name, JSON.stringify(data));
		}

		if (hasNativeEvents) {
			NATIVE.plugins.sendEvent("AmplitudePlugin", "track", JSON.stringify({
					eventName: name,
					params: data
				}));
		}
	};

	this.setGlobalProperty = function (name, value) {
		if (hasNativeEvents) {
			NATIVE.plugins.sendEvent("AmplitudePlugin", "setGlobalProperty",
				JSON.stringify({ name: name, value: value }));
		}
	}
});

exports = new Amplitude();
