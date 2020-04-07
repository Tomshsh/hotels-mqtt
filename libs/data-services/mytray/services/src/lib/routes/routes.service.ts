import { Injectable } from '@angular/core';
import { RoutesDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Observable } from 'rxjs';
import { AppNavItem } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private readonly routesDataRepository: RoutesDataRepository) {
  }

  getRoutesForLayout(): Observable<AppNavItem[]> {
    return fromPromise(this.routesDataRepository.getRoutes().then((routes: any[]) => {
      return this.sortBy(routes).map((navItem) => {
        navItem = navItem.toJSON();
        let appNavItem: AppNavItem;
        if (!navItem.link && (navItem.children && navItem.children.length > 0)) {
          appNavItem = {
            title: navItem.title,
            icon: navItem.icon,
            link: navItem.link,
            expanded: navItem.expanded,
            children: this.sortBy(this.traverseNavTree(navItem))
          };
        }
        if(navItem.link && navItem.order <= 1000) {
          appNavItem = {
            title: navItem.title,
            icon: navItem.icon,
            link: navItem.link,
          };
        }
        return appNavItem;
      });
    }));
  }

  private traverseNavTree(treeNode: any): AppNavItem[] {
    const nodeTree: AppNavItem[] = [];
    if (treeNode.children) {
      const nodes = treeNode.children;
      for (const node of nodes) {
        if (node.title) {
          nodeTree.push(node);
        }
        this.traverseNavTree(node);
      }
    } else {
      nodeTree.push(treeNode);
    }
    return nodeTree;
  }

  private sortBy<T extends AppNavItem>(elements: T[]): T[] {
    return elements.sort((a, b) => a.order - b.order)
  }
}
