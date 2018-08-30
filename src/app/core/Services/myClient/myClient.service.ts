import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MYCLIENTS, MYCLIENTSi, } from './myClient.data';
import { SessionObject } from '../../../pages/shared';
import { Router } from '@angular/router';
import { ProjectUtils } from 'app/pages/shared/project-utils';

@Injectable()

export class MyClientServices {

      private myClients = MYCLIENTS;
      private currentClient: string;
      private firstPage: string;
      loginUrl: string;
      private navigateTo: string;
      private mayBeClient: Array<string>;
      // private MYCLIENTFirstRoute: MYCLIENTSi[] = MYCLIENTFirstRoute
      private isNewLogin: boolean;

      clientDetails: MYCLIENTSi;

      constructor(
            private router: Router
      ) {
            this.mayBeClient = window.location.href.split('/');
      }


      setProjectDetails() {
            if (this.clientDetails) {
                  localStorage.setItem(btoa('projectDetails'), btoa(JSON.stringify(this.clientDetails)));
            }

      }

      getProjectDetails(): MYCLIENTSi | any {
            try {
                  return JSON.parse(atob(localStorage.getItem(btoa('projectDetails') || `{}`)));
            } catch (e) { console.log(e) }
            return '{}';

      }

      sendMyClient(mayBeClient: Array<string> | string = this.mayBeClient): void {
            const sessionObject: SessionObject = SessionObject.getSessionObject();
            if (sessionObject == null) {
                  if (typeof mayBeClient === 'string') {
                        mayBeClient = mayBeClient.split('/');
                  }
                  let client: MYCLIENTSi = null;
                  this.myClients
                        .forEach((item, index, array) => {
                              for (let i = 0; i < mayBeClient.length; i++) {
                                    item.url.forEach((item2, index2) => {
                                          if (item2 === mayBeClient[i]) {
                                                this.loginUrl = mayBeClient[i];
                                                client = item;
                                          }
                                    })
                              }

                        });



                  if (ProjectUtils.isEmpty(client)) {

                        this.clientDetails = this.getProjectDetails() || this.myClients[0];
                        this.setProjectDetails();
                  } else {
                        this.clientDetails = client;
                        this.setProjectDetails();
                  }

                  this.currentClient = (client && client.clientID) || this.myClients[0].clientID;
                  this.firstPage = (client && client.firstPage) || this.myClients[0].firstPage;
            } else {
                  this.clientDetails = this.getProjectDetails() || this.myClients[0];
                  this.currentClient = sessionObject.clientID;
                  this.firstPage = sessionObject.currentClientDashBoard;
                  this.loginUrl = sessionObject.currentClientLoginUrl;
                  //  this.router.navigate(['/']);
            }
            //   this.setFirstPage();
            console.log('this.currentClient', this.currentClient);
            console.log('this.firstPage', this.firstPage || 'No');
      }

      getMyClient(): string {
            return this.currentClient;
      }

      setFirstPage(): void {
      }

      getFirstPage(): string {
            return this.firstPage || 'dashboard';
      }

      myDynamicCss(myClient: string) {
            const cssId = 'myClientCss';
            if (!document.getElementById(cssId)) {
                  const head = document.getElementsByTagName('head')[0];
                  const link = document.createElement('link');
                  link.id = cssId;
                  link.rel = 'stylesheet';
                  link.type = 'text/css';
                  link.href = `assets/${this.loginUrl || this.myClients[0].clientID}/css/${this.loginUrl || this.myClients[0].clientID}.css`;
                  link.media = 'all';
                  head.appendChild(link);
                  console.log('myDynamicCss Path', link.href);
            }
      }
}


