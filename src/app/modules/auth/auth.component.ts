import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [AngularSvgIconModule, RouterOutlet, AuthNavComponent],
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
