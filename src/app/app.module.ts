import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular"

import { NetworkComponent } from "./network/network.component"
import { LocalNotificationsComponent } from './local_notifications/local_notifications.component'
import { PushNotificationsComponent } from './push_notifications/push_notifications.component'
import { FilesComponent } from './files/files.component'
import { TextComponent } from './files/text/text.component'
import { ImagesComponent } from './files/images/images.component'
import { CloudSyncComponent } from './cloud_sync/cloud_sync.component'
import { CameraComponent } from './camera/camera.component'
import { SimpleCameraComponent } from './camera/simple_camera/simple_camera.component'
import { CameraScanComponent } from './camera/camera_scan/camera_scan.component'
import { ContactsSmsComponent } from './contacts_sms/contacts_sms.component'
import { AddContactComponent } from './contacts_sms/add_contact/add_contact.component'
import { ConnectivityComponent } from './connectivity/connectivity.component'
import { BluetoothComponent } from './connectivity/bluetooth/bluetooth.component'

import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from 'nativescript-barcodescanner';

// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from "nativescript-angular/forms";
 import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular"

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        HttpClientModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        AppComponent,
        NetworkComponent,
        LocalNotificationsComponent,
        PushNotificationsComponent,
        FilesComponent,
        TextComponent,
        ImagesComponent,
        CloudSyncComponent,
        CameraComponent,
        SimpleCameraComponent,
        CameraScanComponent,
        ContactsSmsComponent,
        AddContactComponent,
        ConnectivityComponent,
        BluetoothComponent,
    ],
    providers: [
        BarcodeScanner
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
