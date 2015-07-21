export class BeaconEnvironment {
	
	constructor(name, proximityUUID, macAddress, major, minor, measuredPower, rssi, accuracy, proximity) {
		this.name = name;
		this.proximityUUID = proximityUUID;
		this.macAddress = macAddress;
		this.major = major;
		this.minor = minor;
		this.measuredPower = measuredPower;
		this.rssi = rssi;
		this.accuracy = accuracy;
		this.proximity = proximity;
	}
	
}
