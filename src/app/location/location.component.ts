import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as geolocation from 'nativescript-geolocation'
import { isIOS } from 'tns-core-modules/platform'

@Component({
	moduleId: module.id,
	selector: 'location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit, OnDestroy {

	isAvailable = true
	currentLocation: geolocation.Location
	outputText: string = ""
	isTracking = false
	watchId: number

	constructor(private page: Page) { }

	ngOnInit() {
		if(isIOS){
			setTimeout(()=>{
				this.doLocationRequest()
			}, 500)
		}
	 }

	doLocationRequest(): Promise<void>{
		return geolocation.enableLocationRequest()
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}

	startTracking(){
		this.doLocationRequest().then(
			()=>{
				console.dir("Location service available, continuing!")
			},
			()=>{
				console.dir("Location servie unavailable, canceling!")
				this.showFailureDialog(DialogType.Service)
				return
			}
		)
		if(this.isAvailable){
			this.isTracking = true
			this.watchId = geolocation.watchLocation(
				(loc)=>{
					this.setCurrentLocation(loc)
					console.dir("LAT: "+loc.latitude+" LNG: "+loc.longitude)
				},
				(err)=>{
					console.dir("! Location could not be determined !\nError is: "+err)
					this.showFailureDialog(DialogType.Service)
					this.isTracking = false
				},
				{timeout: 2000}
			)
		}
	}

	stopTracking(){
		if(this.watchId != undefined){
			geolocation.clearWatch(this.watchId)
		}
		this.isTracking = false
	}

	setCurrentLocation(location: geolocation.Location){
		this.currentLocation = location
		let latitude = "Latitude: "+location.latitude+"\n"
		let longitude = "Longitude: "+location.longitude +"\n"
		let speed = "Speed: "+location.speed + "\n"
		let altitude = "Altitude: "+location.altitude +"\n"
		let output = ""
		this.outputText = output.concat(latitude, longitude, speed, altitude)
	}

	getCurrentLocation(){
		geolocation.getCurrentLocation({}).then(
			(loc)=>{
				console.dir("CURRENT: "+loc.latitude+" : "+loc.longitude)
			},
			(err)=>{
				this.showFailureDialog(DialogType.Service)
				console.dir("! Location could not be determined !\nError is: "+err)
			}
		)
	}

	showFailureDialog(type: DialogType){
		let title: string
		let message: string

		switch (type) {
			case DialogType.Permission:
				title = "Permission denied"
				message = "Please grant location permission for this app in settings"
				break;
			case DialogType.Service:
				title = "Location unavailable"
				message = "Please enable location services and grant permission to use this feature"
				break;

			case DialogType.Platform:
				title = "Android not supported"
				message = "Location services are not available on Android due to an issue. Please use an iOS device to test this feature."
				break;

			default:
				break;
		}

		let options = {
			title: title,
			message: message,
			okButtonText: "Okay"
		};
		
		alert(options)
	}

	ngOnDestroy(){
		if(this.watchId != undefined){
			geolocation.clearWatch(this.watchId)
		}
	}
}

export enum DialogType{
	Permission,
	Service,
	Platform
}