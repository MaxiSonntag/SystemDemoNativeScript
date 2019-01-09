import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Message } from "nativescript-plugin-firebase"

const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    _activatedUrl: string


    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    ngOnInit() {
        this._activatedUrl = "/network";

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        firebase.init({
            onMessageReceivedCallback: (message: Message) => {
                console.log(`Title: ${message.title}`);
                console.log(`Body: ${message.body}`);
                console.log(message.data)

                let options = {
                    title: "Push notification received!",
                    message: message.title + "\n" + message.body,
                    okButtonText: "Cool!"
                };
                alert(options)
            }
        }).then(
            instance => {
                console.log("Firebase init done")
                
                firebase.getCurrentPushToken().then(function (token) {
                    // may be null if not known yet
                    console.log("Current push token: " + token)
                })
            },
            error => {
                console.log("Firebase init failed")
            }
        );


    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            clearHistory: true
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
