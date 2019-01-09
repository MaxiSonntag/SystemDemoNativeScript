import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as camera from 'nativescript-camera'

@Component({
	moduleId: module.id,
	selector: 'camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit {


	constructor(private page: Page) { }

	ngOnInit() { 
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}
}