import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ChatStore } from 'src/app/core/store/chat.store';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [CommonModule, ChatHeaderComponent, MessageBubbleComponent, ChatInputComponent],
  template: `
    <div class="flex h-full flex-col rounded-3xl bg-white">
      @if (store.selectedConversation(); as conv) {
      <app-chat-header [otherUser]="store.getOtherUser(conv)!"></app-chat-header>
      <div #messageContainer class="flex-grow overflow-y-auto p-6">
        @for (message of store.messagesForSelected(); track message.id) {
        <chat-message-bubble [message]="message" [isMine]="message.fromUserId === store.me().id"></chat-message-bubble>
        }
      </div>
      <app-chat-input></app-chat-input>
      } @else {
      <div class="flex flex-grow items-center justify-center text-gray-500">
        <p>Select a conversation to start chatting.</p>
      </div>
      }
    </div>
  `,
  styleUrl: './chat-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDetailComponent implements AfterViewInit {
  store = inject(ChatStore);
  @ViewChild('messageContainer') messageContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }
  }
}
