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

import { HttpClientModule } from '@angular/common/http';

// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from "nativescript-angular/forms";

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
        NativeScriptFormsModule
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
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
