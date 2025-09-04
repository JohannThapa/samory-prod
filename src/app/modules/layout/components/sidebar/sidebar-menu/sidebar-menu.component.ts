import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuGroup, MenuItem, SubMenuItem } from 'src/app/core/models/menu.model'; // Assuming MenuItem is now Menu
import { MenuService } from '../../../services/menu.service';
import { SidebarSubmenuComponent } from '../sidebar-submenu/sidebar-submenu.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserType } from 'src/app/core/enums/user.enum';
import { AuthService } from 'src/app/core/services/auth.service';
import { Menu } from 'src/app/core/constants/menu';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgClass,
    AngularSvgIconModule,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    SidebarSubmenuComponent,
    TranslateModule,
  ],
})
export class SidebarMenuComponent implements OnInit {
  public displayedMenus: MenuItem[] = []; // New property for filtered menus
  userType?: UserType | null = null;

  constructor(public menuService: MenuService, private auth: AuthService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {
    this.userType = this.auth.userType();
    this.filterMenusByUserType();
  }

  private filterMenusByUserType(): void {
    if (!this.userType) {
      this.displayedMenus = [];
      return;
    }

    const pagesMenu = this.menuService.pagesMenu; // Assuming `pages` is accessible via `menuService`

    this.displayedMenus = pagesMenu.filter((menu) => {
      const groupName = menu.group.toUpperCase().replace(/\s/g, '_');

      // Admins and Super Admins can see the 'Dashboard' group
      if ((this.userType === UserType.ADMIN || this.userType === UserType.SUPER_ADMIN) && groupName === 'DASHBOARD') {
        return true;
      }

      // All other users see the group that matches their UserType
      return groupName === this.userType;
    });
  }
}
