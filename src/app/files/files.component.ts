import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';


@Component({
	moduleId: module.id,
	selector: 'files',
	templateUrl: './files.component.html',
	styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit {

	constructor(private page: Page){}

	ngOnInit(){

	}
	
	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}
}