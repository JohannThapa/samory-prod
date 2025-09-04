import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from 'src/app/core/models/chat.model';

@Component({
  selector: 'chat-message-bubble',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="mb-3 flex" [class.justify-end]="isMine" [class.justify-start]="!isMine">
      <div
        class="max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow"
        [ngClass]="{
          'rounded-br-none bg-[#00A062] text-white': isMine,
          'rounded-bl-none bg-[#F8F4FE] text-[#230448CC]': !isMine
        }">
        <p class="whitespace-pre-line break-words font-medium">
          {{ message.text }}
        </p>

        <div *ngIf="message.attachments?.length" class="mt-2 grid grid-cols-2 gap-2">
          @for (att of message.attachments; track att.id) {
          <img [src]="att.url" [alt]="att.type" class="h-32 w-full rounded-lg border object-cover" />
          }
        </div>

        <div class="mt-1 flex items-center justify-end gap-1 text-xs opacity-70">
          <span class="text-gray-200" [ngClass]="{ 'text-gray-500': !isMine }">{{
            message.createdAt | date : 'shortTime'
          }}</span>
          @if (isMine) {
          <svg
            class="h-4 w-4"
            [ngClass]="{
              'text-gray-400': message.status !== 'read',
              'text-blue-400': message.status === 'read'
            }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBubbleComponent {
  @Input({ required: true }) message!: Message;
  @Input({ required: true }) isMine = false;
}
