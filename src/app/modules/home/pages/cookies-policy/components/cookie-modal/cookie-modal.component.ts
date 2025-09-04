import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cookie-modal',
  imports: [CommonModule],
  templateUrl: './cookie-modal.component.html',
  styleUrl: './cookie-modal.component.css',
})
export class CookieModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  acceptCookies() {
    this.accept.emit();
  }
}
