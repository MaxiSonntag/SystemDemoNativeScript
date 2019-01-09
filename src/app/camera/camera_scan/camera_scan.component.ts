import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';

@Component({
	moduleId: module.id,
	selector: 'CameraScan',
	templateUrl: './camera_scan.component.html',
	styleUrls: ['./camera_scan.component.css']
})

export class CameraScanComponent implements OnInit {

	output: String

	constructor(private barcodeScanner: BarcodeScanner) { }

	ngOnInit() {
		this.barcodeScanner = new BarcodeScanner()
	}

	async scan() {
		let permissionGranted = await this.barcodeScanner.hasCameraPermission()
		if (!permissionGranted) {
			this.barcodeScanner.requestCameraPermission()
		}
		else {
			let result = await this.barcodeScanner.scan({
				formats: "QR_CODE, EAN_13",
				showFlipCameraButton: true,   // default false
				showTorchButton: true,        // default false
				closeCallback: () => { console.log("Scanner closed") }, // invoked when the scanner was closed (success or abort)
				resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
				openSettingsIfPermissionWasPreviouslyDenied: true
			})
			this.output = result.text
		}
	}
}