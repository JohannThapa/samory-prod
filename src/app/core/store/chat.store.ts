import { computed, Injectable, signal } from '@angular/core';
import { ChatState, Conversation, ID, Message, User } from '../models/chat.model';
import { initialState } from '../constants/mock-chat/cyber-chat';

@Injectable({ providedIn: 'root' })
export class ChatStore {
  public state = signal<ChatState>(initialState);

  // selectors
  me = computed(() => this.state().me);
  users = computed(() => this.state().users);
  conversations = computed(() => this.state().conversations);
  searchQuery = computed(() => this.state().searchQuery);
  selectedConversationId = computed(() => this.state().selectedConversationId);

  conversationList = computed(() => {
    const s = this.state();
    const q = s.searchQuery.trim().toLowerCase();
    const arr = Object.values(s.conversations);
    arr.sort((a, b) => {
      const am = a.lastMessageId ? s.messages[a.lastMessageId].createdAt : '';
      const bm = b.lastMessageId ? s.messages[b.lastMessageId].createdAt : '';
      return bm.localeCompare(am);
    });
    return q ? arr.filter((c) => c.title.toLowerCase().includes(q)) : arr;
  });

  selectedConversation = computed<Conversation | null>(() => {
    const id = this.state().selectedConversationId;
    if (!id) return null;
    return this.state().conversations[id] ?? null;
  });

  messagesForSelected = computed<Message[]>(() => {
    const s = this.state();
    const cid = s.selectedConversationId;
    if (!cid) return [];
    const ids = s.messageIdsByConversation[cid] ?? [];
    return ids.map((id) => s.messages[id]).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  });

  otherParticipants = computed<User[]>(() => {
    const s = this.state();
    const conv = this.selectedConversation();
    if (!conv) return [];
    return conv.participantIds.filter((id) => id !== s.me.id).map((id) => s.users[id]);
  });

  getOtherUser(conversation: Conversation): User | undefined {
    const s = this.state();
    const otherUserId = conversation.participantIds.find((id) => id !== s.me.id);
    return otherUserId ? s.users[otherUserId] : undefined;
  }

  // commands
  setSearch(q: string) {
    this.patch({ searchQuery: q });
  }
  selectConversation(id: ID) {
    this.patch({ selectedConversationId: id });
  }

  sendMessage(text: string, attachments: Message['attachments'] = []) {
    const s = this.state();
    const cid = s.selectedConversationId;
    if (!cid) return;
    const id = (Object.keys(s.messages).length + 1).toString();
    const msg: Message = {
      id,
      conversationId: cid,
      fromUserId: s.me.id,
      text,
      attachments,
      createdAt: new Date().toISOString(),
      status: 'sent',
    };
    this.patch({
      messages: { ...s.messages, [id]: msg },
      messageIdsByConversation: {
        ...s.messageIdsByConversation,
        [cid]: [...(s.messageIdsByConversation[cid] ?? []), id],
      },
      conversations: {
        ...s.conversations,
        [cid]: { ...s.conversations[cid], lastMessageId: id, unreadCount: 0 },
      },
    });

    // simulate delivery/read
    setTimeout(() => this.updateMessageStatus(id, 'delivered'), 700);
    setTimeout(() => this.updateMessageStatus(id, 'read'), 1400);
  }

  private updateMessageStatus(id: ID, status: Message['status']) {
    const s = this.state();
    const msg = s.messages[id];
    if (!msg) return;
    this.patch({ messages: { ...s.messages, [id]: { ...msg, status } } });
  }

  private patch(partial: Partial<ChatState>) {
    this.state.set({ ...this.state(), ...partial });
  }
}
