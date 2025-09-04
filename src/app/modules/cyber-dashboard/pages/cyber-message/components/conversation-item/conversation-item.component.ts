import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input } from '@angular/core';
import { Conversation, Message, User } from 'src/app/core/models/chat.model';

@Component({
  selector: 'app-conversation-item',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div
      class="flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-100"
      [ngClass]="{
        'bg-indigo-100/50': active
      }">
      <div class="relative flex-shrink-0">
        <img
          [src]="otherUser?.avatarUrl || 'https://i.pravatar.cc/100?img=1'"
          class="h-12 w-12 rounded-full object-cover" />
        @if (otherUser?.online) {
        <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
        }
      </div>
      <div class="min-w-0 flex-grow">
        <div class="flex items-center justify-between">
          <h3 class="text-primary mb-2 truncate text-sm font-bold">{{ conversation.title }}</h3>
          @if (lastMessage) {
          <span class="whitespace-nowrap text-xs text-gray-500">{{ lastMessage.createdAt | date : 'shortTime' }}</span>
          }
        </div>
        <div class="flex items-center justify-between">
          <p
            class="truncate text-sm font-[400] text-[#23044899]"
            [ngClass]="{ 'font-semibold': conversation.unreadCount > 0 }">
            {{ lastText() }}
          </p>
          @if (conversation.unreadCount > 0) {
          <span
            class="ml-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white">
            {{ conversation.unreadCount }}
          </span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationItemComponent {
  @Input({ required: true }) conversation!: Conversation;
  @Input({ required: true }) lastMessage: Message | null = null;
  @Input() otherUser!: User | undefined;
  @Input() active = false;

  lastText = computed(() => this.lastMessage?.text ?? (this.lastMessage?.attachments?.length ? 'Attachment' : ''));
}
