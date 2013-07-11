var Amplitude = Class(function () {
	this.track = function (name, data) {
		logger.log("{amplitude} logEvent: ", name, data);
		NATIVE && NATIVE.plugins && NATIVE.plugins.sendEvent &&
			NATIVE.plugins.sendEvent("AmplitudePlugin", "logEvent",
				JSON.stringify({ eventName: name, params: data }));
	};
});

exports = new Amplitude();