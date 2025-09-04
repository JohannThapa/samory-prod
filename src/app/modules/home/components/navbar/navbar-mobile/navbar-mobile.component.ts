import { Component } from '@angular/core';
import { HomeMenuService } from '../../../services/home-menu.service';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-navbar-mobile',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css',
})
export class NavbarMobileComponent {
  constructor(public menuService: HomeMenuService) {}
}
