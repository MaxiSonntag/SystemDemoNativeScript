import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { NetworkComponent } from "./network/network.component";
import { LocalNotificationsComponent } from "./local_notifications/local_notifications.component";
import { PushNotificationsComponent } from "./push_notifications/push_notifications.component";
import { FilesComponent } from "./files/files.component";
import { CloudSyncComponent } from "./cloud_sync/cloud_sync.component";


const routes: Routes = [
    { path: "", redirectTo: "/network", pathMatch: "full" },
    { path: "network", component: NetworkComponent },
    { path: "localNotification", component: LocalNotificationsComponent },
    { path: "pushNotification", component: PushNotificationsComponent },
    { path: "files", component: FilesComponent },
    { path: "cloud", component: CloudSyncComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }