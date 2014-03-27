#import "AmplitudePlugin.h"
#import "Amplitude.h"

@implementation AmplitudePlugin

// The plugin must call super dealloc.
- (void) dealloc {
	[super dealloc];
}

// The plugin must call super init.
- (id) init {
	self = [super init];
	if (!self) {
		return nil;
	}

	return self;
}

- (void) initializeWithManifest:(NSDictionary *)manifest appDelegate:(TeaLeafAppDelegate *)appDelegate {
	@try {
		NSDictionary *ios = [manifest valueForKey:@"ios"];

		NSString *amplitudeKey;
		if (appDelegate.debugModeBuild) {
			amplitudeKey = [ios valueForKey:@"ampKeyStaging"];
		} else {
			amplitudeKey = [ios valueForKey:@"ampKey"];
		}

		[Amplitude initializeApiKey:amplitudeKey];

		NSLog(@"{amplitude} Initialized with manifest amplitudeKey: '%@'", amplitudeKey);
	}
	@catch (NSException *exception) {
		NSLog(@"{amplitude} Failure to get ios:amplitudeKey from manifest file: %@", exception);
	}
}

- (void) setUser:(NSDictionary *)jsonObject {
	@try {
		NSString *userId = [jsonObject valueForKey:@"user"];

		[Amplitude setUserId:userId];

		NSLOG(@"{amplitude} Set user id: %@", userId);
	}
	@catch (NSException *exception) {
		NSLOG(@"{amplitude} Exception while processing setUser:", exception);
	}
}

- (void) setGlobalProperty:(NSDictionary *)jsonObject {
	@try {
		NSString *key = [jsonObject valueForKey:@"name"];
		NSString *value = [jsonObject valueForKey:@"value"];

		NSMutableDictionary *eventProperties = [NSMutableDictionary dictionary];
		[eventProperties setValue:value forKey:key];

		[Amplitude setUserProperties:eventProperties];

		NSLOG(@"{amplitude} Setting property '%@' to value '%@'", key, value);
	}
	@catch (NSException *exception) {
		NSLOG(@"{amplitude} Exception while processing setGlobalProperty:", exception);
	}
}

- (void) track:(NSDictionary *)jsonObject {
	@try {
		NSString *eventName = [jsonObject valueForKey:@"eventName"];
		
		NSDictionary *evtParams = [jsonObject objectForKey:@"params"];
		if (!evtParams || [evtParams count] <= 0) {
			[Amplitude logEvent:eventName];

			NSLOG(@"{amplitude} Delivered event '%@'", eventName);
		} else {
			[Amplitude logEvent:eventName withEventProperties:evtParams];

			NSLOG(@"{amplitude} Delivered event '%@' with %d params", eventName, (int)[evtParams count]);
		}
	}
	@catch (NSException *exception) {
		NSLOG(@"{amplitude} Exception while processing track:", exception);
	}
}

@end
