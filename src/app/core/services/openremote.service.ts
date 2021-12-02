import { Injectable } from '@angular/core';
import openremote, {Auth} from "@openremote/core/dist";
import {HttpClient} from "@angular/common/http";
import {OrUserresponse} from "../models/or-userresponse";

@Injectable({
  providedIn: 'root'
})
export class OpenremoteService {

  constructor(private httpClient: HttpClient) {

    openremote.init({
      managerUrl: "http://martinaeytesting.nl:8080",
      keycloakUrl: "http://martinaeytesting.nl:8080/auth",
      auth: Auth.KEYCLOAK,
      autoLogin: true,
      credentials: {
        username: "admin",
        password: "secret",
      },
      loadDescriptors: false,
      realm: "master",
      loadIcons: false,
      configureTranslationsOptions: (options) => {
        options.lng = "nl"; // Change initial language to dutch rather than english
      }
    }).then((success) => {
      if (success) {
        console.log("Connection to OpenRemote server was a success!");

        // Getting the currently logged on User:
        httpClient.get('/api/master/user/user').subscribe(result => {
          console.log("Logged into OpenRemote Servers with the following user:");
          console.log(result);
          const userResponse = result as OrUserresponse;

          // Getting a list of assets depending on the query filter.
          openremote.rest.api.AssetResource.queryAssets({}).then(result => {
            console.log("OpenRemote REST API queryAssets() returned the following:");
            console.log(result);
          }).catch(error => {
            console.log("OpenRemote REST API request returned an error!");
            console.error(error.message);
          });

          // Subscribing to AssetEvents, so when an asset gets added or updated on the OpenRemote platform, we show a quick console log
          // This is just an example, probably not used in our end product.
          /*openremote.getEventProvider()?.subscribeAssetEvents(null, true, (assetEvent) => {
            console.log("Got a WS message from OpenRemote AssetEvents:");
            console.log(assetEvent);
          })*/
        })

      } else {
        console.log("Connection to OpenRemote server failed..");
        // Something has gone wrong
      }
    });
  }
}
