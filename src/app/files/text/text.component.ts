import { Component, OnInit, Input } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { knownFolders, File, Folder } from "tns-core-modules/file-system";
import * as fs from "tns-core-modules/file-system";

@Component({
	moduleId: module.id,
	selector: 'TextTab',
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.css']
})

export class TextComponent implements OnInit {

	enteredText: string = ""
	output: string = ""

	private _folderName = "test_files"
	private _fileName = "testFile.txt"
	filePath = ""
	pathVisibility = "collapsed"

	constructor(private page: Page) { }

	ngOnInit() {
		this.loadFromFile()
	 }

	async loadFromFile(){

		if(this._isFileExisting()){
			let content = await this._getFile().readText()
			this.output = content
			this.filePath = this._getFile().path
			this._setPathVisible(true)
		}
		else{
			this.output = "File does not exist, please write to file before reading."
			this._setPathVisible(false)
		}
		
	}

	async writeToFile() {
		let file = this._getFile()
		file.writeText(this.enteredText)
	}

	async deleteFile(){
		let folder = this._getFolder()
		folder.clear()
		this._setPathVisible(false)
		this.output = "File does not exist, please write to file before reading."
		this._setPathVisible(false)
	}

	private _getFile(): File{
		let documents = knownFolders.documents();
		let folder = documents.getFolder(this._folderName);
		let file = folder.getFile(this._fileName);
		return file
	}

	private _getFolder(): Folder{
		return knownFolders.documents().getFolder(this._folderName)
	}

	private _isFileExisting(): boolean{
		return fs.File.exists(fs.path.join(this._getFolder().path, this._fileName))
	}

	private _setPathVisible(visible: boolean){
		if(visible){
			this.pathVisibility = "visible"
		}
		else{
			this.pathVisibility = "collapsed"
		}
	}
}