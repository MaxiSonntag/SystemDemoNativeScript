import { Component, OnInit, Input } from '@angular/core';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import * as camera from 'nativescript-camera'
import * as platform from 'platform'

@Component({
	moduleId: module.id,
	selector: 'SimpleCamera',
	templateUrl: './simple_camera.component.html',
	styleUrls: ['./simple_camera.component.css']
})

export class SimpleCameraComponent implements OnInit {

	image: ImageAsset
	screenWidth: number = platform.screen.mainScreen.widthDIPs * 0.8
	screenHeight: number = platform.screen.mainScreen.heightDIPs * 0.8

	constructor() { }

	ngOnInit() { }

	takePicture() {
		camera.requestPermissions().then(
			()=>{
				console.dir("Camera Permissions GRANTED!")
				camera.takePicture({ width: this.screenWidth, height: this.screenHeight, saveToGallery: false }).then((imageAsset: any) => {
					this.image = imageAsset
				})
			},
			()=>{
				console.dir("Camera Permissions DENIED!")
				let options = {
					title: "Camera permission denied",
					message: "You need to grant the permission to use this feature",
					okButtonText: "Okay",
				};
				
				alert(options)
			}


			
		)

	}
}