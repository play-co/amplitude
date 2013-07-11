var Amplitude = Class(function () {
	this.track = function (name, data) {
		logger.log("{amplitude} track: ", name, data);

		NATIVE && NATIVE.plugins && NATIVE.plugins.track &&
			NATIVE.plugins.sendEvent("AmplitudePlugin", "track",
				JSON.stringify({ eventName: name, params: data }));
	};
});

exports = new Amplitude();
