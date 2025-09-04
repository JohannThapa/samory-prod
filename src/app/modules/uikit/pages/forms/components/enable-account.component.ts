import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enable-account-content',
  imports: [CommonModule],
  template: `
    <div class="mt-4 flex items-center space-x-2">
      <input
        type="checkbox"
        id="email-notification"
        class="h-4 w-4 rounded border-gray-300 text-[#2D005F] focus:ring-[#2D005F]" />
      <label for="email-notification" class="text-sm font-medium text-gray-700">
        Send email notification to the user
      </label>
    </div>
  `,
})
export class EnableAccountContentComponent {
  // @Input() is not needed for this simple component but demonstrates how you can pass data.
}
