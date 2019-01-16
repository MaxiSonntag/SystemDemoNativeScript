import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
	moduleId: module.id,
	selector: 'connectivity',
	templateUrl: './connectivity.component.html',
	styleUrls: ['./connectivity.component.css']
})

export class ConnectivityComponent implements OnInit {

	constructor(private page: Page) { }

	ngOnInit() { }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}
}