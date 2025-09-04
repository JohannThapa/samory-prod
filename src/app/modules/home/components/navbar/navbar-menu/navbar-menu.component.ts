import { Component, Input } from '@angular/core';
import { HomeMenuService } from '../../../services/home-menu.service';
import { HomeMenuItem } from 'src/app/core/models/menu.model';
import { NavbarSubmenuComponent } from '../navbar-submenu/navbar-submenu.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-home-navbar-menu',
  imports: [CommonModule, NavbarSubmenuComponent, RouterLink, RouterLinkActive, AngularSvgIconModule],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.css',
})
export class NavbarMenuComponent {
  @Input() isScrolled?: boolean;
  @Input() isHomePage?: boolean;

  constructor(public menuService: HomeMenuService) {}

  public toggleMenu(menu: HomeMenuItem): void {
    menu.expanded = !menu.expanded;
  }
}
