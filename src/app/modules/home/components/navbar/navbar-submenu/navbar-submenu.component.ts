import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HomeMenuItem } from 'src/app/core/models/menu.model';

@Component({
  selector: 'ul[navbar-submenu]',
  imports: [RouterLinkActive, RouterLink, AngularSvgIconModule],
  templateUrl: './navbar-submenu.component.html',
  styleUrl: './navbar-submenu.component.css',
})
export class NavbarSubmenuComponent implements OnInit {
  @Input() public submenu: HomeMenuItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
