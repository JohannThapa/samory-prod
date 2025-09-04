import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatStore } from 'src/app/core/store/chat.store';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="border-t border-gray-200 bg-white p-4">
      <div class="flex items-end space-x-4">
        <input
          #messageInput
          type="text"
          class="flex-grow rounded-full border-none bg-gray-100 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Add a comment…"
          (keydown.enter)="sendMessage()" />
        <button
          (click)="sendMessage()"
          class="flex-shrink-0 transform rounded-full bg-indigo-600 p-4 text-white transition-transform hover:scale-110">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  private store = inject(ChatStore);
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

  sendMessage() {
    const text = this.messageInput.nativeElement.value.trim();
    if (text) {
      this.store.sendMessage(text);
      this.messageInput.nativeElement.value = '';
    }
  }
}
