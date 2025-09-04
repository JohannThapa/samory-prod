import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/chat.model';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between rounded-3xl border-b border-gray-200 bg-white p-4">
      <div class="flex items-center space-x-4">
        <img [src]="otherUser.avatarUrl" class="w-15 h-15 rounded-full object-cover" />
        <div>
          <h2 class="text-primary text-2xl font-medium">{{ otherUser.name }}</h2>
          <span class="text-sm text-gray-500" [ngClass]="{ 'text-success': otherUser.online }">{{
            otherUser.online ? 'Online' : 'Offline'
          }}</span>
        </div>
      </div>
      <div class="flex items-center space-x-2 text-gray-400">
        <svg
          class="h-6 w-6 cursor-pointer transition-colors hover:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </div>
  `,
  styleUrl: './chat-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeaderComponent {
  @Input({ required: true }) otherUser!: User;
}
