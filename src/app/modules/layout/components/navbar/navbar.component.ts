import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '../../services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { SearchBarComponent } from 'src/app/shared/components/forms/search-bar/search-bar.component';
import { LanguageSwitchComponent } from 'src/app/modules/home/components/language-switch/language-switch.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserType } from 'src/app/core/enums/user.enum';
import { User } from 'src/app/core/models/auth.model';
import { CommonModule } from '@angular/common';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    SearchBarComponent,
    ProfileMenuComponent,
    NavbarMobileComponent,
    LanguageSwitchComponent,
    NotificationMenuComponent,
  ],
})
export class NavbarComponent implements OnInit {
  currentSearchTerm: string = '';
  user?: User | null = null;
  userType?: UserType | null = null;

  handleSearch(term: string): void {
    console.log('Search term received:', term);
    this.currentSearchTerm = term;
  }
  constructor(private menuService: MenuService, private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.user();
    this.userType = this.auth.userType();
  }

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
