export type ID = string;

export interface User {
  id: ID;
  name: string;
  avatarUrl: string;
  online: boolean;
}

export type Attachment = {
  id: ID;
  type: 'image' | 'file' | 'link';
  url: string;
  name?: string;
  thumbnailUrl?: string;
};

export interface Message {
  id: ID;
  conversationId: ID;
  fromUserId: ID;
  text?: string;
  attachments?: Attachment[];
  createdAt: string; // ISO
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: ID;
  title: string; // e.g. org/team name
  participantIds: ID[]; // includes current user id
  lastMessageId: ID | null;
  unreadCount: number;
  typingUserIds: ID[]; // users currently typing
}

export interface ChatState {
  me: User;
  users: Record<ID, User>;
  conversations: Record<ID, Conversation>;
  messages: Record<ID, Message>;
  messageIdsByConversation: Record<ID, ID[]>; // ordered (oldest→newest)
  selectedConversationId: ID | null;
  searchQuery: string;
}
