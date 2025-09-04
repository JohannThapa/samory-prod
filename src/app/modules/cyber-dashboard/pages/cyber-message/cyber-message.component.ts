import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cyber-message',
  imports: [CommonModule, ConversationListComponent, ChatDetailComponent],
  templateUrl: './cyber-message.component.html',
  styleUrl: './cyber-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CyberMessageComponent {}
