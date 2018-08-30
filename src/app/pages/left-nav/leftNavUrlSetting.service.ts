import { Injectable } from '@angular/core';
import { LibraryClient } from './nav.library';
import { publisherNav } from './nav.publisher';
import { mitNav } from './nav.mit';
import { phpNav } from './nav.php';
import { ucpNav } from './nav.ucp';
import { npgNav } from './nav.npg';
import { palNav } from './nav.pal';
import { ProjectUtils } from '../shared';

import { MyClientServices } from '../../core';

export interface RoleAccess {
      userRole: string
      access: [{
            title: string;
            fafa: string;
            id: string;
            childId: string;
            children: [{
                  title: string;
                  fafa: string;
                  routerLink: string;
                  href: string;
            }]
      }
      ]
}

@Injectable()
export class LeftNavUrlSettingService {
      userRole: Array<string> = ['abc'];

      mit;
      php;
      ucp;
      Publisher;
      LibraryClients;
      npg;
      pal;
      myAccess: any;

      insightMenu: any;
      tempInsightMenu

      isVisible(menu: any) {
            const obj = this.insightMenu.find((item) => {
                  return item['menu_name'] === menu['title'].toLowerCase();
            });

            if (obj) {
                  if (obj['permission'] === '0') {
                  }
                  menu['visible'] = Boolean(parseInt(obj['permission'], 10));
            }
      }


      createAccessForInsight() {

            this.tempInsightMenu = ProjectUtils.cloneObject(publisherNav);

            if (this.myClientServices.clientDetails.project === 'insight') {
                  this.insightMenu = ProjectUtils.getInsightMenuItems();

                  this.tempInsightMenu.forEach((item: any) => {
                        this.isVisible(item);
                        if (Array.isArray(item.children)) {
                              item.children.forEach((childItem) => {
                                    this.isVisible(childItem);
                              });
                        }
                  });
                  return this.tempInsightMenu;

            }

      }

      constructor(
            private myClientServices: MyClientServices
      ) {
            this.mit = mitNav;
            this.php = phpNav;
            this.ucp = ucpNav;
            this.Publisher = publisherNav;
            this.LibraryClients = LibraryClient;
            this.npg = npgNav;
            this.pal = palNav;


            this.myAccess = {
                  mit: this.mit,
                  php: this.php,
                  ucp: this.ucp,
                  insight: publisherNav
            }
      }



}
