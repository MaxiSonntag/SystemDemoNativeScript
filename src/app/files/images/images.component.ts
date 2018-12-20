import { Component, OnInit } from '@angular/core';
import * as imagepicker from "nativescript-imagepicker";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { knownFolders, File, Folder } from 'tns-core-modules/file-system/file-system';
import { Image } from 'tns-core-modules/ui/image/image';
import { ImageSource, fromFile, fromAsset } from 'tns-core-modules/image-source/image-source';
import * as fs from "tns-core-modules/file-system";

@Component({
	moduleId: module.id,
	selector: 'ImageTab',
	templateUrl: './images.component.html',
	styleUrls: ['./images.component.css']
})

export class ImagesComponent implements OnInit {

	private _folderName = "test_files"
	private _fileName = "testImage.png"

	savedImage: any
	pickedImage: any

	private source = new ImageSource()

	constructor() { }

	ngOnInit() {
		this.loadFromFile(true)
	}

	async pickImage() {
		const context = imagepicker.create({
			mode: "single"
		})

		context.authorize().then(() => {
			return context.present()
		}).then((selection: ImageAsset[]) => {
			this.pickedImage = selection[0]
			this.writeToFile(selection[0])
		})
	}

	writeToFile(image: ImageAsset) {
		this.source.fromAsset(image).then((imageSource: ImageSource) => {
			const folderPath = this._getFolder().path
			const filePath = fs.path.join(folderPath, this._fileName)
			const saved: boolean = imageSource.saveToFile(filePath, "png")
			console.log("Saved image to file successfully")
		})
	}

	async loadFromFile(firstTime: boolean) {
		if (this._isFileExisting()) {
			const folder: Folder = this._getFolder();
			const folderPath: string = fs.path.join(folder.path, this._fileName);
			const imageFromLocalFile: ImageSource = <ImageSource>fromFile(folderPath);
			this.savedImage = imageFromLocalFile
		}
		else {
			if (!firstTime) {
				let options = {
					title: "File does not exist",
					message: "Please pick an image first, it will be saved automatically.",
					okButtonText: "Okay"
				}
				alert(options)
			}

		}

	}

	deleteFile() {
		let folder = this._getFolder()
		folder.clear()
		this.savedImage = undefined
		this.pickedImage = undefined
	}

	private _getFile(): File {
		let documents = knownFolders.documents();
		let folder = documents.getFolder(this._folderName);
		let file = folder.getFile(this._fileName);
		return file
	}

	private _getFolder(): Folder {
		return knownFolders.documents().getFolder(this._folderName)
	}

	private _isFileExisting(): boolean {
		return fs.File.exists(fs.path.join(this._getFolder().path, this._fileName))
	}
}