#import "AmplitudePlugin.h"
#import "Amplitude.h"
#import "platform/log.h"

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

#ifndef RELEASE
		NSString *amplitudeKey = [ios valueForKey:@"ampKeyStaging"];
#else
		NSString *amplitudeKey = [ios valueForKey:@"ampKey"];
#endif

		[Amplitude initializeApiKey:amplitudeKey];

		NSLOG(@"{amplitude} Initialized with manifest amplitudeKey: '%@'", amplitudeKey);
	}
	@catch (NSException *exception) {
		NSLOG(@"{amplitude} Failure to get ios:amplitudeKey from manifest file: %@", exception);
	}
}

- (void) setUserId:(NSDictionary *)jsonObject {
	@try {
		NSString * userId = [jsonObject valueForKey:@"userId"];
		[Amplitude setUserId:userId];
		NSLOG(@"{amplitude} set userID to '%@'", userId);
	}
	@catch (NSException * exception) {
		NSLOG(@"{amplitude} Exception while setting user id : ", exception);
	}
}

- (void) track:(NSDictionary *)jsonObject {
	@try {
		NSString *eventName = [jsonObject valueForKey:@"eventName"];

		NSDictionary *evtParams = [jsonObject objectForKey:@"params"];

		if (!evtParams || [evtParams count] <= 0) {
			// No params, just deliver event name
			[Amplitude logEvent:eventName];
			NSLOG(@"{amplitude} Delivered event '%@'", eventName);
		} else {
			// Deliver event *with* params
			[Amplitude logEvent:eventName withEventProperties:evtParams];
			NSLOG(@"{amplitude} Delivered event '%@' with %d params", eventName, (int)[evtParams count]);
		}
	}
	@catch (NSException *exception) {
		NSLOG(@"{amplitude} Exception while processing event: ", exception);
	}
}

- (void) trackRevenue:(NSDictionary *)jsonObject {
	@try {
		NSNumber * price = [jsonObject valueForKey:@"price"];
		NSInteger quantity = [[jsonObject objectForKey:@"quantity"] integerValue];
		NSString * product = [jsonObject valueForKey:@"id"];
		NSString * receiptBase64 = [jsonObject valueForKey:@"receipt"];

		if (receiptBase64 != nil) {
			NSData * receiptData = [[NSData alloc] initWithBase64Encoding:receiptBase64];
			[Amplitude logRevenue:product quantity:quantity price:price receipt:receiptData];
		} else {
			[Amplitude logRevenue:product quantity:quantity price:price];
		}
			NSLOG(@"{amplitude} logging purchase of %d '%@' at %@ / ea", quantity, product, price);
	}
	@catch (NSException * exception) {
		NSLOG(@"{amplitude} Exception while logging revenue : ", exception);
	}
}

- (void) setUserProperties:(NSDictionary *)jsonObject {
	@try {
		[Amplitude setUserProperties:jsonObject];
	}
	@catch (NSException * exception) {
		NSLOG(@"{amplitude} Exception while setting user properties : ", exception);
	}
}

@end

