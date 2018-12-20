import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
	moduleId: module.id,
	selector: 'push_notifications',
	templateUrl: './push_notifications.component.html',
	styleUrls: ['./push_notifications.component.css']
})

export class PushNotificationsComponent implements OnInit {

	items: Array<GuideItem> = new Array()
	private _step = 0

	constructor(private page: Page) { }

	ngOnInit() {
		this._setupListItems()
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}

	private _setupListItems() {
		this._addToGuideInfo(
			"Login",
			"Open https://firebase.google.com and login to the test account.\nEmail: praxisarbeit.push@gmail.com\nPW: t54hQ4PN",
			"login"
		)

		this._addToGuideInfo(
			"Console & Project",
			"Navigate to the Firebase Console and select the Project 'Cross-Platform Demo'.",
			"project"
		)

		this._addToGuideInfo(
			"Cloud Messaging",
			"Select 'Cloud Messaging' in the Side Drawer.",
			"cloud"
		)

		this._addToGuideInfo(
			"Select Duplicate",
			"Click on 'Duplikat' on the existing notification.",
			"duplicate"
		)
		this._addToGuideInfo(
			"Send notification",
			"Click on 'Überprüfung'. In the opened window, click 'Veröffentlichen'. Your Android decive should now receive a notification.",
			"publish"
		)

		this._addToGuideInfo(
			"App in background",
			"If your app was in background, you should see a notification in the notification bar.",
			"push"
		)

		this._addToGuideInfo(
			"App in foreground",
			"If your app was in foreground and on this screen, you should see an alert dialog.",
			"alert"
		)
	}

	private _addToGuideInfo(title: string, description: string, imageName: string) {
		this._step++
		this.items.push(new GuideItem(this._step, title, description, "~/app/push_notifications/images/" + imageName + ".png"))
	}
}

export class GuideItem {
	private _step: number
	private _title: string
	private _description: string
	private _imagePath: string

	constructor(step: number, title: string, description: string, imageName: string) {
		this._step = step
		this._title = title
		this._description = description
		this._imagePath = imageName
	}

	get step(): number {
		return this._step
	}

	get title(): string {
		return this._title
	}

	get description(): string {
		return this._description
	}

	get imagePath(): string {
		return this._imagePath
	}
}