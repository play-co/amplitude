# Game Closure DevKit Plugin: Amplitude

This module supports iOS and Android tracking events through the Amplitude service.

## Installation
Install the module using the standard devkit install process:

~~~
devkit install https://github.com/gameclosure/amplitude#v2.0.0
~~~

## Setup

Create an app in the Amplitude dashboard and copy your API key. You may want to
create different keys for production vs staging, as well as iOS vs android.

In your `manifest.json` file add the API keys under the `ios` and `android` keys
(create them if they do not exist).

Release builds will use the API key in the `ampKey` field; debug builds will use
the key in `ampKeyStaging`.


On Android:
~~~
    "android": {
        "ampKey": "MUmm2eD3qdBSPlcLb3qz",
        "ampKeyStaging": "MUmm2eD3qdBSPlcLb3qz"
    }
~~~




To use Amplitude tracking in your game, import the plugin:

~~~
import amplitude;
~~~

Then send individual track events like this:

~~~
amplitude.track("myEvent", {
    "score": 999,
    "coins": 11,
    "isRandomParameter": true
});
~~~

You can track revenue using the `trackRevenue` function:

~~~
amplitude.trackRevenue(
  info.sku,        // item name
  item.price,      // price
  item.quantity,   // quantity

);
~~~

You can also take advantage of amplitude's verified purchase functionality
by passing the purchase validation information to the trackRevenue function.
On iOS this should be a base64 string of the
[transactionReceipt](https://developer.apple.com/library/ios/documentation/StoreKit/Reference/SKPaymentTransaction_Class/index.html#//apple_ref/occ/instp/SKPaymentTransaction/payment).
On the google play store you should pass the `INAPP_DATA_SIGNATURE` and the
`INAPP_PURCHASE_DATA` strings, in that order
([docs](http://developer.android.com/google/play/billing/billing_integrate.html#Purchase)).

~~~
    amplitude.trackRevenue(
      info.sku,
      item.price,
      item.quantity,
      info.signature,
      info.purchaseData
    );
~~~

See a working version in the [billing demo
app](https://github.com/gameclosure/demoBilling).


## Testing

To test for successful integration, build your game:

~~~
devkit debug native-android --clean --open
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

iOS similarly does not print out anything useful when it is working properly. Just look for errors on the console by searching for "amplitude."
