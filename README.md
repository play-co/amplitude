# Game Closure DevKit Plugin: Amplitude

This plugin supports iOS and Android tracking events through the Amplitude service.

## Usage

Install the plugin with `basil install amplitude`.

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
		"ampKey": "MUmm2eD3qdBSPlcLb3qz"
	}
~~~

To use Amplitude tracking in your game, import the plugin:

~~~
import plugins.amplitude.amplitude as amplitude;
~~~

Then send individual track events like this:

~~~
amplitude.track("myEvent", {
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

iOS similarly does not print out anything useful when it is working properly.  Just look for errors on the console by searching for "amplitude."
