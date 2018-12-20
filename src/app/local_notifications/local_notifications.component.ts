import { Component, OnInit, getPlatform } from '@angular/core';
import { Page, Color } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { LocalNotifications, ScheduleOptions, ReceivedNotification, NotificationAction } from "nativescript-local-notifications";
import { isAndroid, isIOS} from "tns-core-modules/platform";

@Component({
	moduleId: module.id,
	selector: 'local_notifications',
	templateUrl: './local_notifications.component.html',
	styleUrls: ['./local_notifications.component.css']
})

export class LocalNotificationsComponent implements OnInit {

	private _timeMultiplier : number
	groupedButtonVisibility = "visible"

	constructor(private page: Page) { }

	ngOnInit() { 
		this._timeMultiplier = 1
		if(isIOS){
			this._timeMultiplier = 5
			this.groupedButtonVisibility = "collapse"
		}
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}

	sendSimpleNotification(params?: NotificationParams){
		if(params == undefined){
			params = {
				title: "Simple Notification",
				body: "Not really spectacular",
				id: 0,
				callbackTitle: "Received simple notification",
			}
		}

		
		
		const options: ScheduleOptions[] = [
			{
				title: params.title,
				body: params.body,
				icon: "res://ic_stat_name",
				silhouetteIcon: "res://ic_stat_name",
				id: params.id,
				at: new Date(new Date().getTime() + (this._timeMultiplier * 1000)),
				color: params.color,
				groupedMessages: params.groupedMessages,
				groupSummary: params.groupedSummary,
				actions: params.actions,
				image: params.image,
				thumbnail: true,
				forceShowWhenInForeground: true
			}
		]

		let callback = (data: ReceivedNotification)=>{
			alert({
				title: params.callbackTitle,
				message: "Try out the other notifications",
				okButtonText: "Okay"
			  });
		}
		if(params.callback != undefined){
			callback = params.callback
		}
		this._sendNotification(options, callback)
	}

	sendColoredNotification(){
		this.sendSimpleNotification({
			title: "Colored Notification", 
			body: "This one has some color",
			color: new Color("#6aa84f"),
			callbackTitle: "Colored Notification received"
		})
	}

	sendGroupedNotification(){
		this.sendSimpleNotification({
			title: "Grouped Notification", 
			body: "This one has additional info, swipe down!", 
			groupedMessages: ["Some more", "Even more", "Up to 5 rows"], 
			groupedSummary: "Grouped Summary", 
			callbackTitle: "Grouped Notification received",
		})
	}

	sendInputActionNotification(){
		const callback = (data: ReceivedNotification)=>{
			alert(
				{
					title: "The text you typed in:",
					message: data.response,
					okButtonText: "Okay"
				}
			)
		}
		

		this.sendSimpleNotification({
			title: "input Action Notification", 
			body: "Type in some text",
			callback: callback,
			actions: [
				{
					type: "input",
					id: "input_action",
					submitLabel: "Submit",
					placeholder: "Type in some text right here",
					editable: true,
					launch: true

				},
			]
		})
	}

	sendButtonActionNotification(){
		const callback = (data: ReceivedNotification)=>{
			alert(
				{
					title: "Button you pressed:",
					message: this._getMessage(data.response),
					okButtonText: "Okay"
				}
			)
		}

		this.sendSimpleNotification({
			title: "Button Action Notification", 
			body: "Press something",
			callback: callback,
			actions: [
				{
					type: "button",
					id: "button_action",
					title: "Press me",
					launch: true

				},
				{
					type: "button",
					id: "button_action2",
					title: "Or me",
					launch: true

				}
			]
		})
	}

	private _getMessage(item: string): string{
		switch (item) {
			case "button_action":
				return "You pressed \"Press me\""
			default:
				return "You pressed \"Or me\""
		}
	}

	sendImageNotification(){

		this.sendSimpleNotification({
			title: "Image Notification", 
			body: "This one even has an image!",
			callbackTitle: "Image Notification received",
			image: "https://picsum.photos/300/?random",
		})
	}


	private _sendNotification(options: ScheduleOptions[], callback: (data: ReceivedNotification)=>void) {
		LocalNotifications.schedule(options);
		LocalNotifications.addOnMessageReceivedCallback(callback);
	}
}

interface NotificationParams{
	title?: string,
	body?: string,
	id?: number,
	color?: Color,
	groupedMessages?: string[],
	groupedSummary?: string,
	callbackTitle? : string,
	actions?: NotificationAction[],
	callback?: (data: ReceivedNotification)=>void,
	image?: string

}