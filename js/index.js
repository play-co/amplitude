import device;

var hasNativeEvents = GLOBAL.NATIVE &&
	NATIVE.plugins &&
	NATIVE.plugins.sendEvent;

var isBrowser = !hasNativeEvents &&
	!device.isMobileNative &&
	GLOBAL.document &&
	GLOBAL.amplitude;

var Amplitude = Class(function () {

	this.init = function () {

		this._config = (CONFIG.modules && CONFIG.modules.amplitude) || {};

		if (isBrowser) {

			var apiKey = this._config.apiKey;
			if (apiKey) {
				amplitude.init(apiKey);
				amplitude.setVersionName(CONFIG.version);
			}
		}
	};

	this.setUserId = function (userId) {
		logger.log('setUserId', userId);
		if (isBrowser) {
			amplitude.setUserId(userId);
		} else if (device && device.isIOS) {
      var data = JSON.stringify({userId: userId});
      NATIVE.plugins.sendEvent('AmplitudePlugin', 'setUserId', data);
    }
	};

	this.trackEvent =
	this.track = function (name, data) {
		if (DEBUG) {
			logger.log('track: ', name, JSON.stringify(data));
		}

		if (hasNativeEvents) {
			NATIVE.plugins.sendEvent('AmplitudePlugin', 'track', JSON.stringify({
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

			logger.log('tracking', name);
			amplitude.logEvent(name, data);
		}
	};

	this.trackRevenue = function (product, price, quantity) {
		if (DEBUG) {
			logger.log('trackRevenue', product, quantity, price);
		}

		if (hasNativeEvents) {
			var data = JSON.stringify({
				id: product,
				price: price,
				quantity: quantity
			});

			NATIVE.plugins.sendEvent('AmplitudePlugin', 'trackRevenue', data);
		}
	};

	this.setGlobalProperty = function (name, value) {
		if (hasNativeEvents) {
			NATIVE.plugins.sendEvent('AmplitudePlugin', 'setGlobalProperty',
				JSON.stringify({ name: name, value: value }));
		}
	};

	this.setUserProperties = function (props) {
		if (hasNativeEvents) {
			var opts = JSON.stringify(props);
			NATIVE.plugins.sendEvent('AmplitudePlugin', 'setUserProperties', opts);
		}
	};
});

exports = new Amplitude();
