import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { knownFolders } from 'tns-core-modules/file-system/file-system';
import { RadDataForm } from 'nativescript-ui-dataform';
import * as contacts from 'nativescript-contacts'
import * as permissions from 'nativescript-permissions';
import { isAndroid } from 'tns-core-modules/ui/page/page';

declare var android: any

@Component({
	moduleId: module.id,
	selector: 'add_contact',
	templateUrl: './add_contact.component.html',
	styleUrls: ['./add_contact.component.css']
})

export class AddContactComponent implements OnInit {

	contact: MyContact
	metadata: any
	@ViewChild("dataForm") dataForm: ElementRef

	constructor(private routerExtensions: RouterExtensions) { }

	ngOnInit() { 
		this.metadata = this._readSettingsFromJson()
		this.contact = new MyContact("", "", "");
	}

	async _readSettingsFromJson(){
		const appFolder = knownFolders.currentApp()
		const dataFolder = appFolder.getFolder("sample_data")
		const jsonFile = dataFolder.getFile("dataform_settings.json")
		console.log("JSON FILE: "+jsonFile.size)
		const json = jsonFile.readText().then(
			(res)=>{this.metadata = JSON.parse(res)}
		)
		
	}

	back(){
		this.routerExtensions.backToPreviousPage()
	}

	resetForm(){
		this.contact = new MyContact("","","")
		let form = this.dataForm.nativeElement as RadDataForm
		form.commitAll()
	}

	save(){
		let realContact = new contacts.Contact()
		realContact.name = {given: this.contact.firstName, family: this.contact.lastName}
		
		realContact.phoneNumbers = [{label: "Mobile", value: this.contact.number}]
		
		if(isAndroid && !permissions.hasPermission(android.Manifest.permission.WRITE_CONTACTS)){
			permissions.requestPermission(android.Manifest.permission.WRITE_CONTACTS).then(
				()=>{
					realContact.save()
				},
				()=>{
					this._showPermissionAlert()
				}
			)
		}
		else{
			realContact.save()
		}
		
	}

	private _showPermissionAlert(){
		let options = {
			title: "Permission required",
			message: "You need to grant permission to use this feature",
			okButtonText: "Okay"
		};
		
		alert(options)
	}
}

export class MyContact{
	public firstName: string
	public lastName: string
	public number: string

	constructor(firstName: string, lastName: string, number: string){
		this.firstName = firstName
		this.lastName = lastName
		this.number = number
	}
}