import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
//import { Nfc, NfcNdefData } from "nativescript-nfc"
import { setInterval, clearInterval } from "tns-core-modules/timer";

@Component({
	moduleId: module.id,
	selector: 'NFC',
	templateUrl: './nfc.component.html',
	styleUrls: ['./nfc.component.css']
})

export class NfcComponent implements OnInit, OnDestroy {

	//For NFC Reading delete this part
	constructor(){}

	ngOnInit(){}

	ngOnDestroy(){}
	//delete till here

	// !! Uncomment everything below and add nativescript_nfc plugin !!
	// Don't forget to edit .html file too
	// And AndroidManifest.xml
	// Guide: https://github.com/EddyVerbruggen/nativescript-nfc

	/*outputText = "No values read yet"
	nfc: Nfc
	isReading: boolean = false


	constructor(private ngZone: NgZone) { }

	ngOnInit() {
		this.nfc = new Nfc()
	}

	async startReading() {

		if (!await this._checkAvailableAndEnabled()) {
			return
		}

		this.isReading = true
		this.nfc.setOnNdefDiscoveredListener((data) => {
			//console.dir(data)
			this.onReceived(data)
		})


	}

	onReceived(data: NfcNdefData) {
		var output = "NFC DATA:\nID: " + data.id + "\nCONTENT:" + data.message.pop().payloadAsString
		console.dir(output)
		this.ngZone.run(()=>{
			this.outputText = output
		})
		
	}

	stopReading() {
		this.nfc.setOnNdefDiscoveredListener(null)
		this.isReading = false
	}

	private async _checkAvailableAndEnabled(): Promise<boolean> {
		let isAvailable = await this.nfc.available()
		let isEnabled = await this.nfc.enabled()

		if (!isAvailable) {
			this.showFailureDialog("Sorry, your device does not support NFC.")
		}
		if (!isEnabled) {
			this.showFailureDialog("You have to enable NFC to use this feature.")
		}

		return isAvailable && isEnabled
	}


	showFailureDialog(message: string) {
		let options = {
			title: "Info",
			message: message,
			okButtonText: "Okay"
		};

		alert(options)
	}

	ngOnDestroy() {
		this.stopReading()
	}*/
}