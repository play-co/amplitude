import device;

var hasNativeEvents = GLOBAL.NATIVE && NATIVE.plugins && NATIVE.plugins.sendEvent;
var isBrowser = !hasNativeEvents && !device.isMobileNative && GLOBAL.document && GLOBAL.amplitude;

var Amplitude = Class(function () {

	this.init = function () {

		this._config = CONFIG.addons.amplitude || {};

		if (isBrowser) {

			var apiKey = this._config.apiKey;
			if (apiKey) {
				amplitude.init(apiKey);
				amplitude.setVersionName(CONFIG.version);
			}
		}
	}

	this.setUserId = function (userId) {
		if (isBrowser) {
			amplitude.setUserId(userId);
		}
	}

	this.trackEvent =
	this.track = function (name, data) {
		if (DEBUG) {
			logger.log("track: ", name, JSON.stringify(data));
		}

		if (hasNativeEvents) {
			NATIVE.plugins.sendEvent("AmplitudePlugin", "track", JSON.stringify({
					eventName: name,
					params: data
				}));
		} else if (isBrowser) {
			if (GLOBAL.__amplitude && __amplitude.timer) {
				clearInterval(__amplitude.timer);
				__amplitude.timer = null;

				amplitude.logEvent('PAGE_LOADED', {
						totalTime: ((Date.now() - __amplitude.start) / 1000).toFixed(1)
					});
			}

			logger.log("tracking", name);
			amplitude.logEvent(name, data);
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
