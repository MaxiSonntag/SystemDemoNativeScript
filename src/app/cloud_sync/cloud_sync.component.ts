import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { firestore } from 'nativescript-plugin-firebase';
import { isAndroid } from 'platform'

@Component({
	moduleId: module.id,
	selector: 'cloud_sync',
	templateUrl: './cloud_sync.component.html',
	styleUrls: ['./cloud_sync.component.css']
})

export class CloudSyncComponent implements OnInit, OnDestroy {

	_collectionName = "example"
	_documentName = "example_doc"
	_fieldName = "example_field"
	_timestampFieldName = "timestamp"
	_collection : firestore.CollectionReference
	_listener: ()=>void
	_localTimestamp: number


	@ViewChild("inputField") inputText: ElementRef
	@ViewChild("uploadButton") uploadButton: ElementRef
	@ViewChild("outputLabel") outputText: ElementRef

	constructor(private page: Page) { }

	ngOnInit() {
		if(isAndroid){
			this._collection = firestore.collection(this._collectionName)
			this._listener = this._collection.onSnapshot((snapshot)=>{
				snapshot.forEach(doc=>{
					if(doc.exists){
						const data = doc.data()
						console.dir("DATA: "+JSON.stringify(data))
						const timestamp : Date = data[this._timestampFieldName]
						if(this._localTimestamp == undefined || timestamp.valueOf() >= this._localTimestamp.valueOf()){
							this.outputText.nativeElement.text = data[this._fieldName]
							this._localTimestamp = timestamp.valueOf()
						}
						
					}
					
				})
			})
		}
		else{
			this.uploadButton.nativeElement.isEnabled = false
			this.inputText.nativeElement.isEnabled = false
			let options = {
				title: "Unavailable on iOS",
				message: "Sorry, this feature is only available on Android",
				okButtonText: "Okay"
			};
			alert(options)
		}
		
		
	 }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}

	async uploadData(){

		this._localTimestamp = new Date().valueOf()
		const val = {
			example_field : this.inputText.nativeElement.text,
			timestamp: this._localTimestamp
		}

		const doc = await this._collection.doc(this._documentName).get()
		try{
			if(doc.exists){
				await this._collection.doc(this._documentName).update(val)
			}
			else{
				await this._collection.doc(this._documentName).set(val)
			}
		}
		catch(e){
			console.dir("Upload: Permission denied because local data is older than server data")
		}
		
		
	}

	ngOnDestroy(){
		if(isAndroid){
			this._listener()
		}
		
	}
}