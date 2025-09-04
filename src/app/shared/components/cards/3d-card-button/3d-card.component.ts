import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-shadow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="card-container relative mx-auto max-w-lg transform rounded-3xl p-4 transition-transform duration-300 hover:scale-105"
      [ngClass]="getVariantClass()">
      <ng-content></ng-content>
    </section>
  `,
  styles: `
    .card-container {
      position: relative;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2), 9px 6px 6px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease-in-out;
      transform-style: preserve-3d;
    }
    .card-container::before, .card-container::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 24px;
      transition: all 0.3s ease-in-out;
      transform: translateZ(-1px);
      box-sizing: border-box;
      z-index: -1;
    }
    .card-container::before {
      transform: translateZ(-10px);
    }
    .card-container::after {
      transform: translateZ(-20px);
    }

    .bg-gradient-success {
      background: linear-gradient(135deg, #16a085, #27ae60);
    }
    .bg-gradient-primary {
      background: linear-gradient(135deg, #2980b9, #3498db);
    }
    .bg-gradient-danger {
      background: linear-gradient(135deg, #c0392b, #e74c3c);
    }

    .card-container:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.2);
    }
    .card-container::before {
		box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.3), 0 5px 3 .4px rgba(0, 0, 0, 0.5), 0 10 8px 3px rgba(0, 0, 0, 0.2);
    }
    .card-container::after {
		box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.7), 0 3px 9px 0 rgba(0, 0, 0, 0.2);
    }
  `,
})
export class CardShadowComponent {
  @Input() variant: 'primary' | 'success' | 'danger' = 'success';

  getVariantClass(): string {
    switch (this.variant) {
      case 'success':
        return 'bg-gradient-success';
      case 'primary':
        return 'bg-gradient-primary';
      case 'danger':
        return 'bg-gradient-danger';
      default:
        return 'bg-gradient-success';
    }
  }
}
