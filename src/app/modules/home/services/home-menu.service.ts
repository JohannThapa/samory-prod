import { Injectable, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeMenu } from 'src/app/core/constants/menu';
import { HomeMenuItem } from 'src/app/core/models/menu.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class HomeMenuService implements OnDestroy {
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<HomeMenuItem[]>([]);
  private _subscription = new Subscription();

  constructor(private router: Router, private translateService: TranslateService) {
    this.translateMenu();

    // Re-translate the menu when the language changes
    this._subscription.add(
      this.translateService.onLangChange.subscribe(() => {
        this.translateMenu();
      }),
    );

    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._pagesMenu().forEach((menu) => {
          const active = this.isActive(menu.route);
          menu.active = active;
          if (menu.children) {
            this.expand(menu.children);
          }
        });
      }
    });
    this._subscription.add(sub);
  }

  get showMobileMenu() {
    return this._showMobileMenu();
  }

  get pagesMenu() {
    return this._pagesMenu();
  }

  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  private translateMenu(): void {
    const translatedMenu = HomeMenu.pages.map((menuItem) => {
      const translatedItem = {
        ...menuItem,
        label: this.translateService.instant(menuItem.label ? menuItem.label : ''),
      };

      if (menuItem.children) {
        translatedItem.children = menuItem.children.map((child) => ({
          ...child,
          label: this.translateService.instant(child.label ? child.label : ''),
        }));
      }

      return translatedItem;
    });
    this._pagesMenu.set(translatedMenu);
  }

  public toggleMenu(menu: HomeMenuItem) {
    /** Collapse all menus except the selected one. */
    const updatedMenu = this._pagesMenu().map((item) => {
      return {
        ...item,
        expanded: item === menu ? !item.expanded : false,
      };
    });
    this._pagesMenu.set(updatedMenu);
  }

  public toggleSubMenu(submenu: HomeMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);
      if (item.children) this.expand(item.children);
    });
  }

  public isActive(instruction: any): boolean {
    if (!instruction) return false;
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
