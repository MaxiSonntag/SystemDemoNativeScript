import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as permissions from 'nativescript-permissions';
import * as contacts from 'nativescript-contacts'
import { Page, isAndroid } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Contact } from 'nativescript-contacts';
import { ListView } from 'ui/list-view'
import { ActivityIndicator } from 'ui/activity-indicator'
import * as phone from 'nativescript-phone'
import { prompt, PromptResult, inputType, PromptOptions } from "tns-core-modules/ui/dialogs";
import { registerElement } from 'nativescript-angular/element-registry';
import { RouterExtensions } from 'nativescript-angular/router';
registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab);
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

declare var android: any

@Component({
	moduleId: module.id,
	selector: 'contacts_sms',
	templateUrl: './contacts_sms.component.html',
	styleUrls: ['./contacts_sms.component.css']
})

export class ContactsSmsComponent implements OnInit {

	contacts: Array<Contact> = new Array()
	indicatorVisibility: string = "visible"


	constructor(private page: Page, private routerExtensions: RouterExtensions) { }

	ngOnInit() {
		this.loadAllContacts()
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}

	private async loadAllContacts() {

		if (isAndroid) {
			permissions.requestPermissions([android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.GET_ACCOUNTS], "We need permissions to show you this feature.").then(
				() => {
					console.dir("Contact permissions granted")
					let fields = ["name", "phoneNumbers"]
					contacts.getAllContacts(fields).then(
						(args) => {
							this.parseContacts(JSON.stringify(args.data))
							this.indicatorVisibility = "collapse"
						},
						(err) => {
							console.dir("Error fetching contacts:\n" + err)
						}
					)
				},
				() => {
					console.dir("Contact permissions denied")
				}
			)
		}
		else {
			contacts.getContact().then(
				(c) => {
					this.parseContacts(JSON.stringify(c.data))
					this.indicatorVisibility = "collapse"
				}
			)
		}

	}

	private parseContacts(full: string) {
		const parsed = JSON.parse(full)
		let temp = new Array<Contact>()
		if (isAndroid) {
			parsed.forEach(contact => {
				let c = new Contact()
				c.id = contact["id"]
				c.name.displayname = contact["name"]["displayname"]
				if (contact["phoneNumbers"][0] == undefined) {
					return
				}
				c.phoneNumbers[0] = { label: contact["phoneNumbers"][0]["label"], value: contact["phoneNumbers"][0]["value"] }
				temp.push(c)
			});
		}
		else {
			let c = new Contact()
			c.name.displayname = parsed["name"]["given"] + " " + parsed["name"]["family"]
			if (parsed["phoneNumbers"][0] == undefined) {
				return
			}
			c.phoneNumbers[0] = { label: parsed["phoneNumbers"][0]["label"], value: parsed["phoneNumbers"][0]["value"] }
			temp.push(c)
		}

		temp = this.sortList(temp)

		this.contacts = temp
	}

	private sortList(array: Contact[]): Contact[] {
		return array.sort((a: Contact, b: Contact) => {
			if (a.name.displayname < b.name.displayname) {
				return -1
			}
			if (b.name.displayname < a.name.displayname) {
				return 1
			}
			return 0
		})
	}

	refreshList(args) {
		let pullRefresh = args.object
		this.loadAllContacts().then(
			() => {
				pullRefresh.refreshing = false;
			}
		)
	}

	contactTapped(args) {
		console.log("Tapped: " + this.contacts[args.index].name.displayname)
		let number = this.contacts[args.index].phoneNumbers[0].value
		let options: PromptOptions = {
			title: "Send SMS",
			defaultText: "",
			message: "Enter a message you want to send to " + this.contacts[args.index].name.displayname,
			inputType: inputType.text,
			okButtonText: "Send",
			neutralButtonText: "Cancel",
			cancelButtonText: "Call",
			cancelable: true
		};

		prompt(options).then((result: PromptResult) => {
			//Result is true if "Send" was tapped
			if (result.result === true) {
				this.sendSms(number, result.text)
			}
			else if (result.result === false) {
				this.call(number)
			}
		});

	}

	private sendSms(number: string, message: string) {
		phone.sms([number], message).then(
			(succ) => {
				console.dir("SMS sent successfully")
			},
			(err) => {
				console.dir("SMS sending failed: " + err)
			}
		)
	}

	private call(number: string) {
		if (isAndroid) {
			permissions.requestPermission(android.Manifest.permission.CALL_PHONE, "If you want to call directly from the app, you have to grant permission.").then(
				() => {
					//Second Parameter: True -> confirmation | False -> instantly
					let success = phone.dial(number, true)
					console.dir("Call successfull: " + success)
				},
				() => {
					console.dir("Phone permission denied")
				}
			)
		}
		else {
			let success = phone.dial(number, true)
		}
	}

	addContact() {
		this.routerExtensions.navigateByUrl("add")
	}
}
