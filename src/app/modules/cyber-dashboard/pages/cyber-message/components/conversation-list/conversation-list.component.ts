import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChatStore } from 'src/app/core/store/chat.store';
import { ConversationItemComponent } from '../conversation-item/conversation-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ConversationItemComponent],
  template: `
    <div class="shadow-xs flex h-full flex-col rounded-3xl bg-white">
      <div class="mb-2 mt-4 ml-4 flex justify-between">
        <div class="inline-block">
          <h3 class="text-primary text-xl font-bold">Messages</h3>
        </div>
        <div class="inline-block space-x-4"></div>
      </div>
      <div class="px-4 pt-4 pb-2">
        <label class="relative block">
          <input
            class="w-full rounded-full border border-transparent bg-gray-100 py-2.5 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            type="search"
            placeholder="Search…"
            [value]="store.searchQuery()"
            (input)="onSearch($event)" />
          <svg
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </label>
      </div>

      <div class="space-y-1 overflow-y-auto px-2 pb-3">
        @for (c of store.conversationList(); track c.id) {
        <app-conversation-item
          [conversation]="c"
          [lastMessage]="c.lastMessageId ? store.state().messages[c.lastMessageId] : null"
          [otherUser]="store.getOtherUser(c)"
          [active]="store.selectedConversationId() === c.id"
          (click)="store.selectConversation(c.id)" />
        }
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationListComponent {
  constructor(public store: ChatStore) {}

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.store.setSearch(inputElement.value);
  }
}
