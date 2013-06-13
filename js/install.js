GLOBAL.amplitude = {
	logEvent: function(evtName, evtParams) {
		logger.log("{amplitude} logEvent: ", evtName, evtParams);
		NATIVE && NATIVE.plugins && NATIVE.plugins.sendEvent &&
			NATIVE.plugins.sendEvent("AmplitudePlugin", "logEvent",
				JSON.stringify({ eventName: evtName, params: evtParams }));
	}
};
