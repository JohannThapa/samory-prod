import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

type IconState = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'white' | 'black' | 'glass';
@Component({
  selector: 'app-glassy-button',
  imports: [CommonModule, RouterLink, AngularSvgIconModule],
  templateUrl: './glassy-button.component.html',
  styleUrl: './glassy-button.component.css',
})
export class GlassyButtonComponent {
  @Input() iconPath?: string;
  @Input() iconColor?: IconState;
  @Input() borderColor?: IconState;
  @Input() customClass: string = '';
  @Input() routerLink?: string | any[];

  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    this.onClick.emit(event);
  }
}
