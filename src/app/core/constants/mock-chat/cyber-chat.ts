import { ChatState, Conversation, ID, Message, User } from '../../models/chat.model';

const uid = (() => {
  let i = 0;
  return () => (++i).toString();
})();

export const now = (minsAgo = 0) => new Date(Date.now() - minsAgo * 60_000).toISOString();

export const me: User = {
  id: 'me',
  name: 'Fatima Hassan',
  avatarUrl: 'https://i.pravatar.cc/100?img=3',
  online: true,
};

export const u = (id: ID, name: string, img: number, online = true): User => ({
  id,
  name,
  avatarUrl: `https://i.pravatar.cc/100?img=${img}`,
  online,
});

export const users: Record<ID, User> = {
  [me.id]: me,
  wb: u('wb', 'White - Brekke', 12, true),
  okm: u('okm', "O'Kon - Murray", 14, true),
  tp: u('tp', 'Turner - Prohaska', 16, false),
  rg: u('rg', 'Rogahn and Sons', 22, true),
  sg: u('sg', 'Sporer Group', 25, true),
  si: u('si', 'Spinka Inc', 28, true),
};

function message(partial: Partial<Message>): Message {
  return {
    id: uid(),
    attachments: [],
    status: 'read',
    text: '',
    ...partial,
  } as Message;
}

const conv = (id: ID, title: string, participantIds: ID[]): Conversation => ({
  id,
  title,
  participantIds,
  lastMessageId: null,
  unreadCount: 0,
  typingUserIds: [],
});

const conversations: Record<ID, Conversation> = {
  c1: conv('c1', 'White-Brekke - Web App Audit', ['me', 'wb']),
  c2: conv('c2', "O'Kon - Murray", ['me', 'okm']),
  c3: conv('c3', 'Turner - Prohaska', ['me', 'tp']),
  c4: conv('c4', 'Rogahn and Sons', ['me', 'rg']),
  c5: conv('c5', 'Sporer Group', ['me', 'sg']),
  c6: conv('c6', 'Spinka Inc', ['me', 'si']),
};

const messages: Record<ID, Message> = {};
const messageIdsByConversation: Record<ID, ID[]> = { c1: [], c2: [], c3: [], c4: [], c5: [], c6: [] };

function add(conversationId: ID, fromUserId: ID, text: string, minsAgo: number, extra?: Partial<Message>) {
  const m = message({ conversationId, fromUserId, text, createdAt: now(minsAgo), ...extra });
  messages[m.id] = m;
  messageIdsByConversation[conversationId].push(m.id);
  conversations[conversationId].lastMessageId = m.id;
}

add(
  'c1',
  'wb',
  "We've received your diagnostic report. Could you please review the firewall configurations section?",
  65,
);
add('c1', 'wb', 'Here are some Document i took earlier today.', 60, {
  attachments: [
    {
      id: uid(),
      type: 'image',
      url: 'https://picsum.photos/seed/a/640/360',
      thumbnailUrl: 'https://picsum.photos/seed/a/160/100',
    },
    {
      id: uid(),
      type: 'image',
      url: 'https://picsum.photos/seed/b/640/360',
      thumbnailUrl: 'https://picsum.photos/seed/b/160/100',
    },
  ],
});
add('c1', 'me', 'Thanks for sharing the screenshot. 🙌📸', 58);

add('c2', 'okm', 'We will share logs…', 5, { status: 'delivered' });
add('c3', 'tp', 'Wow really Cool 🔥', 480);
add('c4', 'rg', 'Typing…', 0, { text: '', status: 'sent' });
add('c5', 'sg', 'yah, nice design', 180);
add('c6', 'si', 'Awesome 🔥', 220);

conversations['c2'].unreadCount = 2;
conversations['c5'].unreadCount = 2;
conversations['c6'].unreadCount = 1;

export const initialState: ChatState = {
  me,
  users,
  conversations,
  messages,
  messageIdsByConversation,
  selectedConversationId: 'c1',
  searchQuery: '',
};
