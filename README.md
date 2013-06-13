# Game Closure DevKit Plugin: Amplitude

## Usage

Include it in the `manifest.json` file under the "addons" section for your game:

~~~
"addons": [
	"amplitude"
],
~~~

Under the Android section, you can configure the Amplitude plugin:

~~~
	"android": {
		"versionCode": 1,
		"icons": {
			"36": "resources/icons/android36.png",
			"48": "resources/icons/android48.png",
			"72": "resources/icons/android72.png",
			"96": "resources/icons/android96.png"
		},
		"amplitudeKey": "MUmm2eD3qdBSPlcLb3qz"
	}
~~~

To use Amplitude logging in your game, install the plugin at the top of Application.js, like so:

~~~
import plugins.amplitude.install;
~~~

Then send individual logs like this:

~~~
amplitude.logEvent("myEvent", {
	"score": 999,
	"coins": 11,
	"isRandomParameter": true
});
~~~

## Testing

To test for successful integration, build your game:

~~~
basil debug native-android --clean --open
~~~

Then watch logcat:

~~~
adb logcat | grep amplitude
~~~

If Amplitude is hooked up properly, you'll see something like this:

~~~
D/JS      ( 4673): LOG plugins.amplitude.install {amplitude} logEvent:  AppStart [object Object]
D/JS      ( 4673): LOG plugins.amplitude.install {amplitude} logEvent:  UpgradePriceGroup [object Object]
E/JS      ( 4673): {amplitude} {android} logEvent - success: AppStart 
E/JS      ( 4673): {amplitude} {android} logEvent - success: UpgradePriceGroup
~~~

(You'll see your own logs instead of AppStart and UpgradePriceGroup)

You can conclusively confirm events are going through on the Amplitude website.

## Platform-specific notes

### Browsers

Nothing actually gets sent to Amplitude in browsers, but you'll still see logs that look like this:

~~~
D/JS      ( 4673): LOG plugins.amplitude.install {amplitude} logEvent:  AppStart [object Object]
~~~

You can use these logs to implement tracking in your game.

### iOS

No iOS implementation at this time.

### Android

To use this plugin with Android, you'll need to set up an Amplitude account and add your Amplitude key to the manifest (see Usage section, above).