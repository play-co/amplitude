import device;

var hasNativeEvents = GLOBAL.NATIVE && NATIVE.plugins && NATIVE.plugins.sendEvent;
var isBrowser = !hasNativeEvents && !device.isMobileNative && GLOBAL.document;

var Amplitude = Class(function () {

	this.init = function () {

		this._config = CONFIG.addons.amplitude || {};

		if (isBrowser && CONFIG.version != 'debug') {

			// --- begin embed code
			//
			// https://github.com/amplitude/Amplitude-Javascript

			(function(e,t){var r=e.amplitude||{};var a=t.createElement("script");a.type="text/javascript";
			a.async=true;a.src="https://d24n15hnbwhuhn.cloudfront.net/libs/amplitude-1.0-min.js";
			var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);
			r._q=[];function i(e){r[e]=function(){r._q.push([e].concat(Array.prototype.slice.call(arguments,0)))}}
			var s=["init","logEvent","setUserId","setGlobalUserProperties","setVersionName"];
			for(var c=0;c<s.length;c++){i(s[c])}e.amplitude=r})(window,document);

			// --- end embed code

			this._amplitude = amplitude;

			var apiKey = this._config.apiKey;
			if (apiKey) {
				this._amplitude.init(apiKey);
				this._amplitude.setVersionName(CONFIG.version);
			}
		}
	}

	this.setUserId = function (userId) {
		if (this._amplitude) {
			this._amplitude.setUserId(userId);
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
		} else if (this._amplitude) {
			this._amplitude.logEvent(name, data);
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
