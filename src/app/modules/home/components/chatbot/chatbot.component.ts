import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChatbotService } from 'src/app/core/services/chatbot.service';
import { ChatbotMessage } from 'src/app/core/models/chatbot.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, RouterLink],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
  animations: [
    trigger('overlayFade', [
      transition(':enter', [style({ opacity: 0 }), animate('120ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('120ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('cardSlide', [
      transition(':enter', [
        style({ transform: 'translateY(12px) scale(0.98)', opacity: 0 }),
        animate('160ms cubic-bezier(0.2,0.8,0.2,1)', style({ transform: 'none', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('130ms ease-in', style({ transform: 'translateY(12px) scale(0.98)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ChatbotComponent {
  private readonly chatbot = inject(ChatbotService);
  private readonly i18n = inject(TranslateService);

  query = '';
  message = '';

  open = this.chatbot.open;
  view = this.chatbot.view;

  conversation = this.chatbot.conversation;
  loading = this.chatbot.loading;
  error = this.chatbot.error;

  // Suggested template questions (translation keys)
  templates = ['CHATBOT.FAQ1', 'CHATBOT.FAQ2', 'CHATBOT.FAQ3', 'CHATBOT.FAQ4'];
  automated = ['CHATBOT.TEMP1'];

  close() {
    this.chatbot.close();
  }
  startChat() {
    this.chatbot.openChat();
  }
  backToWelcome() {
    this.chatbot.openWelcome();
  }

  sendMessage(text?: string) {
    const finalText = (text ?? this.message).trim();
    if (!finalText) return;
    this.message = '';
    this.chatbot.sendMessage(finalText);
  }

  sendTemplate(templateKey: string) {
    // Translate template text before sending
    const translated = this.i18n.instant(templateKey);
    this.sendMessage(translated);
  }

  changeLang(lang: 'en' | 'fr') {
    this.i18n.use(lang);
  }

  trackById(index: number, msg: ChatbotMessage): string {
    return msg.id;
  }
}
