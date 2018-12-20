import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getJSON, request } from 'tns-core-modules/http';
import { stringify } from '@angular/core/src/util';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import * as connectivity from "tns-core-modules/connectivity";

@Component({
	moduleId: module.id,
	selector: 'network',
	templateUrl: './network.component.html',
	styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, OnDestroy {

	private _counter = 0;
	private _serverUrl = "https://jsonplaceholder.typicode.com/posts/"

	response: any
	responseObj: Post
	postResponse: any

	outputString: Map<OutputTypes, string> = new Map()

	parseButtonEnabled = false
	postButtonEnabled = false
	downloadButtonEnabled = true

	constructor(private page: Page, private http: HttpClient) { }

	ngOnInit() {
		this.outputString.set(OutputTypes.Placeholder, "Press download button")
		
		connectivity.startMonitoring((newConnection: number) => {
			const connectionAvailable = this._checkConnectivity(newConnection)
			if (connectionAvailable) {
				this.downloadButtonEnabled = true
				this.postButtonEnabled = this.response != null
			}
			else {
				this.downloadButtonEnabled = false
				this.postButtonEnabled = false
				this._showConnectivityErrorDialog()
			}
		})
	}

	private _checkConnectivity(connection: number): boolean {
		return connection != connectivity.connectionType.none
	}

	private _showConnectivityErrorDialog() {
		let options = {
			title: "No network avaliable",
			message: "Please connect to a network to use this",
			okButtonText: "Okay"
		}
		alert(options)
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>this.page.parent.parent;
		sideDrawer.showDrawer();
	}

	async downloadJson() {
		this._counter++;
		//Response as JSON Object (any)
		/*getJSON(this._serverUrl+this._counter%100).then((r) => {
			this.response = r
			this._replaceOutputStr(OutputTypes.RawJson, JSON.stringify(this.response))
			this.parseButtonEnabled = true
			this.postButtonEnabled = true
		}, (e) => {
			console.dir("E: "+e)
		})*/

		//Request with timeout
		/*request({
			url: this._serverUrl+this._counter%100,
			method: "GET",
			timeout: 3000,
		}).then((r) => {
			this.response = r.content.toJSON()
			this._replaceOutputStr(OutputTypes.RawJson, JSON.stringify(this.response))
			this.parseButtonEnabled = true
			this.postButtonEnabled = true
		}, (e) => {
			this._replaceOutputStr(OutputTypes.Error, e)
			this.parseButtonEnabled = false
			this.postButtonEnabled = false
		})*/


		/*fetch(this._serverUrl + this._counter % 100)
			.then((response) => response.json())
			.then((r) => {
				this.response = r
				this._replaceOutputStr(OutputTypes.RawJson, JSON.stringify(this.response))
				this.parseButtonEnabled = true
				this.postButtonEnabled = true
			}).catch((err) => {
			});*/

		//Request with HTTP-Client
		const res = this.http.get(this._serverUrl + this._counter, {
		})
		res.subscribe((r) => {
			this.response = r
			this._replaceOutputStr(OutputTypes.RawJson, JSON.stringify(this.response))
			this.parseButtonEnabled = true
			this.postButtonEnabled = true
		})
	}

	parseJson() {
		this.responseObj = Post.Factory(this.response)
		this._replaceOutputStr(OutputTypes.ParsedJson, this.responseObj.toString())
		this.parseButtonEnabled = false
	}

	postData() {
		request({
			url: "https://httpbin.org/post",
			method: "POST",
			content: this.response
		}).then((response) => {
			this._replaceOutputStr(OutputTypes.PostResponse, JSON.stringify(response))
			this.parseButtonEnabled = false
		}, (e) => {
		});
	}

	private _replaceOutputStr(type: OutputTypes, value: string) {
		this.outputString.clear()
		this.outputString.set(type, value)
	}

	getCurrentString(): string {
		return this.outputString.values().next().value
	}

	ngOnDestroy() {
		connectivity.stopMonitoring()
	}
}

export class Post {
	private _id: number
	private _userId: number
	private _title: string
	private _body: string

	constructor(id: number, userId: number, title: string, body: string) {
		this._id = id
		this._userId = userId
		this._title = title
		this._body = body
	}

	static Factory(json: any): Post {
		return new Post(json["id"], json["userId"], json["title"], json["body"])
	}

	static Empty(): Post {
		return new Post(null, null, null, null)
	}


	get id(): number {
		return this._id
	}
	get userId(): number {
		return this._userId
	}
	get title(): string {
		return this._title
	}
	get body(): string {
		return this._body
	}

	public toString(): string {
		return "ID: " + this.id + "\nUserID: " + this.userId + "\nTitle: " + this.title + "\nBody: " + this.body
	}

}

enum OutputTypes {
	Placeholder,
	RawJson,
	ParsedJson,
	PostResponse,
	Error
}