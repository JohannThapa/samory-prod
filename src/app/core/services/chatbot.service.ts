import { Injectable, computed, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { nanoid } from 'nanoid';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatbotApiResponse, ChatbotMessage } from '../models/chatbot.model';
import { TokenService } from './token.service';

export type ChatbotView = 'welcome' | 'chat';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private _open = signal(false);
  private _view = signal<ChatbotView>('welcome');

  readonly open = computed(() => this._open());
  readonly view = computed(() => this._view());

  private _conversation = signal<ChatbotMessage[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly conversation = computed(() => this._conversation());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  openWelcome() {
    this._view.set('welcome');
    this._open.set(true);
  }

  openChat() {
    this._view.set('chat');
    this._open.set(true);
  }

  close() {
    this._open.set(false);
  }

  toggleFromFab() {
    if (this._open()) this.close();
    else this.openWelcome();
  }

  clearError() {
    this._error.set(null);
  }

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.get();

    const bearer = userToken;

    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${bearer}`)
      .set('X-API-KEY', environment.apiKey)
      .set('Content-Type', 'application/json');

    return headers;
  }

  sendMessage(question: string) {
    if (!question.trim() || this._loading()) {
      return;
    }

    this.clearError();
    const now = Date.now();

    const userMsg: ChatbotMessage = {
      id: nanoid(),
      role: 'user',
      content: question.trim(),
      createdAt: now,
    };
    this._conversation.update((list) => [...list, userMsg]);

    const pendingId = nanoid();
    const pendingAssistant: ChatbotMessage = {
      id: pendingId,
      role: 'assistant',
      content: '',
      createdAt: now + 1,
      pending: true,
    };
    this._conversation.update((list) => [...list, pendingAssistant]);

    this._loading.set(true);

    const url = `${environment.apiUrl}/api/v1/chatbot`;
    const body = { question };
    const headers = this.getHeaders();

    this.http
      .post<ChatbotApiResponse>(url, body, { headers })
      .pipe(
        finalize(() => this._loading.set(false)),
        catchError((e: HttpErrorResponse) => {
          const msg =
            e.error?.message || e.message || 'Something went wrong while contacting the chatbot. Please try again.';
          this._error.set(msg);

          this._conversation.update((list) =>
            list.map((m) =>
              m.id === pendingId
                ? {
                    ...m,
                    content: `⚠️ ${msg}`,
                    pending: false,
                  }
                : m,
            ),
          );
          return of(null);
        }),
      )
      .subscribe((resp) => {
        if (resp && resp.data) {
          this._conversation.update((list) =>
            list.map((m) =>
              m.id === pendingId
                ? {
                    ...m,
                    content: resp.data,
                    pending: false,
                  }
                : m,
            ),
          );
        }
      });
  }
}
