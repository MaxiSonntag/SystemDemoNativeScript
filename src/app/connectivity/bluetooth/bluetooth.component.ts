import { Component, OnInit, OnDestroy } from '@angular/core';
import * as bluetooth from 'nativescript-bluetooth'

@Component({
	moduleId: module.id,
	selector: 'BluetoothComponent',
	templateUrl: './bluetooth.component.html',
	styleUrls: ['./bluetooth.component.css']
})

export class BluetoothComponent implements OnInit, OnDestroy {

	private _enabled: boolean
	isScanning: boolean = false
	foundDevices: bluetooth.Peripheral[] = new Array()
	connectedUUID: string = ""
	private _isFirstScan = true

	constructor() { }

	ngOnInit() {
		this._checkBluetoothStatus()
	}

	private async _checkBluetoothStatus(){
		bluetooth.isBluetoothEnabled().then(
			(enabled)=>{
				this._enabled = enabled
			}
		)
	}

	async startScanning(){

		await this._checkBluetoothStatus()
		if(!this._enabled){
			this.showBTDialog()
			return
		}

		if(this._isFirstScan){
			this.showInfoDialog()
			this._isFirstScan = false
		}
		
		this.isScanning = true;
		
		let tempDevices = new Array<bluetooth.Peripheral>()
		bluetooth.startScanning(
			{
				seconds: 4,
				skipPermissionCheck: false,
				onDiscovered: (device)=>{
					tempDevices.push(device)
					//console.dir("NAME: "+device.name)
				}
			}
		).then(
			()=>{
				this.isScanning = false
				this.foundDevices = tempDevices
			}
		)
	}

	showInfoDialog(){
		let options = {
			title: "Info",
			message: "This plugin only supports Bluetooth LE. If there is no BT LE device near you, you will possibly see several unnamed networks, like Wifi or Bluetooth Classic devices. If connection succeeds, you may see the devices name the next time you scan.",
			okButtonText: "Okay"
		};
		
		alert(options)
	}

	showBTDialog(){
		let options = {
			title: "Enable Bluetooth",
			message: "Please enable Bluetooth to check out this feature.",
			okButtonText: "Okay"
		};
		
		alert(options)
	}

	stopScanning(){
		this.isScanning = false
		bluetooth.stopScanning().then(
			()=>{
				console.dir("Scanning stopped")
			}
		)
	}


	connect(index: number){
		let device = this.foundDevices[index]
		bluetooth.connect({
			UUID: device.UUID,
			onConnected: (dev)=>this.showConnectedDialog(true, dev),
			onDisconnected: (dev)=>this.showConnectedDialog(false, dev)
		})
		console.dir("Tapped: "+this.foundDevices[index].UUID)
	}

	showConnectedDialog(connected: boolean, device: bluetooth.Peripheral){
		let devName = device.name != undefined ? device.name : device.UUID
		const successMessage = "Successully connected to "+devName
		const failureMessage = "Connection with " + devName + " stopped"
		let options = {
			title: "Connection",
			message: connected ? successMessage : failureMessage,
			okButtonText: "Okay"
		};
		
		alert(options)
	}

	ngOnDestroy(){
		this.stopScanning()
	}

}