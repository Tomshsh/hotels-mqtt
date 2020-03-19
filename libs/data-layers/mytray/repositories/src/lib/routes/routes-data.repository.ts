import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { AppNavItem } from '@my-tray/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoutesDataRepository {

  constructor() { }

  async getRoutes(): Promise<AppNavItem[]> {
    const query = new Parse
      .Query(Parse.Object.extend('AppNavItem'));
    return await query.find().then((results => {
      return results.map(nav => {
        const navItem = nav.toJSON();
        if(!navItem.link) {

        }
        const appNavItem: AppNavItem = {
          title: navItem.title,
          icon: navItem.icon,
          link: navItem.link,
          children: navItem.children,
          expanded: navItem.expanded
        };
        return appNavItem;
      });
    }));
  }
}
